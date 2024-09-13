'use server'

import { gql } from '@apollo/client'
import { EOrder, IOrderingBy, TUserReferralLeaderboardResponse } from '../type'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TGetUserReferralLeaderboardRequest = {
  limit?: number
  offset?: number
  order?: IOrderingBy[]
}

export type GetUserReferralLeaderboardResponse = {
  getUserReferralLeaderboard: TUserReferralLeaderboardResponse
}

const QUERY_GET_USER_REFERRAL_LEADERBOARD = gql`
  query Query($offset: Int, $limit: Int, $order: [IOrderingBy]) {
    getUserReferralLeaderboard(offset: $offset, limit: $limit, order: $order) {
      offset
      limit
      order {
        column
        order
      }
      total
      records {
        username
        referralCount
        referrerUsername
        isVerified
      }
    }
  }
`

export const queryUserReferralLeaderboard = async (
  { limit, offset, order }: TGetUserReferralLeaderboardRequest = {
    limit: 10,
    offset: 0,
    order: [
      {
        column: 'referralCount',
        order: EOrder.DESC,
      },
    ],
  },
) => {
  try {
    const client = getClient()
    const { data } = await client.query<GetUserReferralLeaderboardResponse>({
      query: QUERY_GET_USER_REFERRAL_LEADERBOARD,
      variables: { offset, limit, order },
    })
    if (!data) {
      logger.error('No data returned from get user referral leaderboard')
      throw new Error('No data returned from get user referral leaderboard')
    }
    return data.getUserReferralLeaderboard
  } catch (error) {
    logger.error('There is an error when get user referral leaderboard', error)
    throw new Error('There is an error when get user referral leaderboard')
  }
}
