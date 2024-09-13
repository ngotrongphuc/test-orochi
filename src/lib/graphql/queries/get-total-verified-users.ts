'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TGetTotalVerifiedUsersResponse = {
  getTotalVerifiedUsers: number
}

const QUERY_GET_TOTAL_VERIFIED_USERS = gql`
  query Query {
    getTotalVerifiedUsers
  }
`

export const queryTotalVerifiedUsers = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetTotalVerifiedUsersResponse>({
      query: QUERY_GET_TOTAL_VERIFIED_USERS,
    })
    if (!data) {
      logger.error('No data returned from get total verified users')
      throw new Error('No data returned from get total verified users')
    }
    return data.getTotalVerifiedUsers
  } catch (error) {
    logger.error('There is an error when get total verified users', error)
    throw new Error('There is an error when get total verified users')
  }
}
