'use server'

import { gql } from '@apollo/client'
import { TGetSuccessfulReferralsResponse, IOrderingBy, EOrder } from '../type'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TGetSuccessfulReferralsRequest = {
  limit?: number
  offset?: number
  order?: IOrderingBy[]
}

export type GetSuccessfulReferralsResponse = {
  getSuccessfulReferrals: TGetSuccessfulReferralsResponse
}

const QUERY_GET_SUCCESSFUL_REFERRALS = gql`
  query Query($offset: Int, $limit: Int, $order: [IOrderingBy]) {
    getSuccessfulReferrals(offset: $offset, limit: $limit, order: $order) {
      offset
      limit
      total
      records {
        username
        isChuninUser
        isVerified
      }
      order {
        column
        order
      }
    }
  }
`

export const queryListSuccessfulReferrals = async (
  { limit, offset, order }: TGetSuccessfulReferralsRequest = {
    limit: 10,
    offset: 0,
    order: [
      {
        column: 'points',
        order: EOrder.ASC,
      },
    ],
  },
) => {
  try {
    const client = getClient()
    const { data } = await client.query<GetSuccessfulReferralsResponse>({
      query: QUERY_GET_SUCCESSFUL_REFERRALS,
      variables: { offset, limit, order },
    })
    if (!data) {
      logger.error('No data returned from get list successful referrals')
      throw new Error('No data returned from get list successful referrals')
    }
    return data.getSuccessfulReferrals
  } catch (error) {
    logger.error('There is an error when get list successful referrals', error)
    throw new Error('There is an error when get list successful referrals')
  }
}
