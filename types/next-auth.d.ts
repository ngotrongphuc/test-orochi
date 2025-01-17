import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
  }
  interface User {
    accessToken?: string
    refreshToken?: string
    uuid?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    error?: string
  }
}
