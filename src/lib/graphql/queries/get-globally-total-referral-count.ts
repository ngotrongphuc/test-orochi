'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TGetGloballyTotalReferralCountResponse = {
  getGloballyTotalReferralCount: number
}

const QUERY_GET_GLOBALLY_TOTAL_REFERRAL_COUNT = gql`
  query Query {
    getGloballyTotalReferralCount
  }
`

export const queryGloballyTotalReferralCount = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetGloballyTotalReferralCountResponse>(
      {
        query: QUERY_GET_GLOBALLY_TOTAL_REFERRAL_COUNT,
      },
    )
    if (!data) {
      logger.error('No data returned from get globally total referral count')
      throw new Error('No data returned from get globally total referral count')
    }
    return data.getGloballyTotalReferralCount
  } catch (error) {
    logger.error(
      'There is an error when get globally total referral count',
      error,
    )
    throw new Error('There is an error when get globally total referral count')
  }
}
