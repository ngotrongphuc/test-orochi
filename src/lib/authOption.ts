import {
  mutateLinkSocialAccount,
  mutateLoginViaSocialAccount,
  mutateLoginViaWallet,
  mutateLogout,
  mutateRefreshToken,
} from '@/lib/graphql/mutations'
import { TSocialProvider } from '@/lib/graphql/type'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// import Credentials from 'next-auth/providers/credentials'
import { logger } from '@/utils/logger'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import { isTokenExpired } from '@/app/contribute-to-earn/lib/utils'

const SCOPES = ['identify', 'email']
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      authorization: { params: { scope: SCOPES.join(' ') } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
        },
      },
    }),
    Credentials({
      credentials: {
        address: { type: 'text' },
        loginMethod: { type: 'text' },
        nonceSessionUuid: { type: 'text' },
        signature: { type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null
          }
          const response = await mutateLoginViaWallet({
            nonceSessionUuid: credentials.nonceSessionUuid,
            signature: credentials.signature,
            address: credentials.address,
            walletProvider: credentials.loginMethod,
          })
          if (!response) {
            throw new Error(`Fail connect to walletConnect`)
          }
          return {
            // NOTE: for now the BE dont have id for user, will update later
            id: credentials.address,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            uuid: response.uuid,
            // this image is HARDCODE, we will talk about this later
            image:
              'https://s3-alpha-sig.figma.com/img/9d12/55d8/34b9d4ae3a39991a5530a60f5606f2c9?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fQC-OvQsR1FtR7QzecqtsrL258avQIIPcQPGW8GmKtKwfyg8eeJWNxBsx8F63c4rTGaJk1zMfiptXv7Xl6Y2W3IdoJehPNtm5lXA1-hsjXp0vvvv7cOeXU1zIJc9WYSGhaq0NKKhCsAqK15LgZqlE6hcepbrXGC-aP-sQz4FhowcpOojsgeyBdVtHHYNgIUTk-aO-lTUEPD1BmRSFNW8Xxc4KRxZcpMqjUUJqSGyO2rKMxjj-l3SO5wF96YZu6z1Pg7KWd1sAOvEpT5ZBbgnPfAzO3P4xBJG5-CwDYsIntmJFhQutATc~cr8evak1nZbTC8axxcwGclrLdjCl1jkFg__',
            // NOTE: for now the BE dont have username for user, will update later
            name: credentials.address,
            // NOTE: this code will be a problem when user already login with another method
            // should be response.data.email
          } satisfies User
        } catch (error) {
          logger.error(`error from wallet authorize `, error)
          if (error instanceof Error) {
            throw error
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        if (!account) {
          return false
        }
        // login with wallet case, receive user from authorize function
        if (account.provider !== 'credentials') {
          if (!profile?.email) {
            return false
          }
          // get server session
          const session = await getServerSession()
          // check Did users logged in before with social oauth provider
          if (session) {
            try {
              // link social account if logged
              const response = await mutateLinkSocialAccount({
                data: {
                  socialProvider: account.provider as TSocialProvider,
                  externalId: account.providerAccountId,
                  email: profile.email,
                },
              })
            } catch (error) {
              // append meaningful error message from api to url query params so we can get it from client
              let errorMessage =
                error instanceof Error
                  ? error.message
                  : 'link social account error'
              logger.error('link social account error', error)
              const params = new URLSearchParams()
              params.set(`${account.provider}LoginError`, errorMessage)
              return `/contribute-to-earn?${params.toString()}`
            }
          }
          // always perform login to get necessary data
          const response = await mutateLoginViaSocialAccount({
            data: {
              socialProvider: account.provider as TSocialProvider,
              externalId: account.providerAccountId,
              email: profile.email,
            },
          })
          if (!response) {
            throw new Error('Error while login via social account')
          }
          user.accessToken = response.accessToken
          user.refreshToken = response.refreshToken
          user.uuid = response.uuid
        }
        return true
      } catch (error) {
        logger.error(error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      if (
        token.refreshToken &&
        token.accessToken &&
        isTokenExpired(token.accessToken)
      ) {
        try {
          const { accessToken } = await mutateRefreshToken({
            refreshToken: token.refreshToken,
          })
          token.accessToken = accessToken
        } catch (error) {
          logger.error('Error when mutate refresh token')
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  events: {
    async signOut({ session, token }) {
      try {
        await mutateLogout({
          logoutEverywhere: false,
          refreshToken: token.refreshToken,
        })
      } catch (error) {
        logger.error('Error while logout user')
      }
    },
  },
  pages: {
    // redirect to error page if hit error when signin
    error: '/api/auth/error',
  },
}
