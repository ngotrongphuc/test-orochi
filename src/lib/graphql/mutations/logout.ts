'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'

export type LogoutArgs = {
  logoutEverywhere: boolean
  refreshToken?: string
}

export type LogoutResponse = {
  logout: boolean
}

const MUTATION_LOGOUT = gql`
  mutation Logout($logoutEverywhere: Boolean!, $refreshToken: String) {
    logout(logoutEverywhere: $logoutEverywhere, refreshToken: $refreshToken)
  }
`

export const mutateLogout = async ({ logoutEverywhere, refreshToken }: LogoutArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<LogoutResponse>({
      mutation: MUTATION_LOGOUT,
      variables: { logoutEverywhere, refreshToken },
    })
    if (!data) {
      logger.error('No data returned from logout')
      throw new Error('No data returned from logout')
    }
    return data.logout
  } catch (error) {
    logger.error('There is an error when logout', error)
    throw new Error('There is an error when logout')
  }
}
