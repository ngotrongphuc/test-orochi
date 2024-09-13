'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { TRefreshTokenResponse } from '../type'

export type RefreshTokenArgs = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  refreshToken: TRefreshTokenResponse
}

const MUTATION_REFRESH_TOKEN = gql`
  mutation Mutation($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`

export const mutateRefreshToken = async ({
  refreshToken,
}: RefreshTokenArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<RefreshTokenResponse>({
      mutation: MUTATION_REFRESH_TOKEN,
      variables: { refreshToken },
    })
    if (!data) {
      logger.error('No data returned from refresh token')
      throw new Error('No data returned from refresh token')
    }
    return data.refreshToken
  } catch (error) {
    logger.error('There is an error when refresh token', error)
    throw new Error('There is an error when refresh token')
  }
}
