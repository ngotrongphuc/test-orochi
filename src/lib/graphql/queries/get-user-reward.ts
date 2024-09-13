'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'
import { TUserRewardResponse } from '../type'

export type TGetUserRewardResponse = {
  getUserReward: TUserRewardResponse
}

const QUERY_USER_REWARD = gql`
  query Query {
    getUserReward {
      uuid
      amount
    }
  }
`

export const queryUserReward = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetUserRewardResponse>({
      query: QUERY_USER_REWARD,
    })
    if (!data) {
      logger.error('No data returned from get user reward')
      throw new Error('No data returned from get user reward')
    }
    return data.getUserReward
  } catch (error) {
    logger.error('There is an error when get user reward', error)
    throw new Error('There is an error when get user reward')
  }
}
