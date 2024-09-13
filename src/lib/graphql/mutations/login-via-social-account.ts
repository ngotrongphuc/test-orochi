'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { ISocialAccountLinking, type UserAuth } from '../type'

export type LoginViaSocialAccountArgs = {
  data: ISocialAccountLinking
}

export type LoginViaSocialAccountResponse = {
  loginViaSocialAccount: UserAuth
}

const MUTATION_LOGIN_VIA_SOCIAL_ACCOUNT = gql`
  mutation Mutation($data: ISocialAccountLinking!) {
    loginViaSocialAccount(data: $data) {
      uuid
      accessToken
      refreshToken
      isActive
      isVerified
      avatarUrl
    }
  }
`

export const mutateLoginViaSocialAccount = async ({
  data: payloadData,
}: LoginViaSocialAccountArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<LoginViaSocialAccountResponse>({
      mutation: MUTATION_LOGIN_VIA_SOCIAL_ACCOUNT,
      variables: { data: payloadData },
    })
    if (!data) {
      logger.error('No data returned from login via social account')
      throw new Error('No data returned from login via social account')
    }
    return data.loginViaSocialAccount
  } catch (error) {
    logger.error('There is an error when login via social account', error)
    throw new Error('There is an error when login via social account')
  }
}
