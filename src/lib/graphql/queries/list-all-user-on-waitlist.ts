'use server'

import { gql } from '@apollo/client'
import { EOrder, IOrderingBy, TListUserOnWaitlistResponse } from '../type'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TListUserOnWaitlistRequest = {
  limit?: number
  offset?: number
  order?: IOrderingBy[]
}

export type ListUserOnWaitlistResponse = {
  listAllUserOnWaitlist: TListUserOnWaitlistResponse
}

const QUERY_LIST_ALL_USER_ON_WAITLIST = gql`
  query Query($offset: Int, $limit: Int, $order: [IOrderingBy]) {
    listAllUserOnWaitlist(offset: $offset, limit: $limit, order: $order) {
      offset
      limit
      order {
        column
        order
      }
      total
      records {
        uuid
        username
      }
    }
  }
`

export const queryListAllUserOnWaitlist = async (
  { limit, offset, order }: TListUserOnWaitlistRequest = {
    limit: 10,
    offset: 0,
    order: [
      {
        column: 'points',
        order: EOrder.DESC,
      },
    ],
  },
) => {
  try {
    const client = getClient()
    const { data } = await client.query<ListUserOnWaitlistResponse>({
      query: QUERY_LIST_ALL_USER_ON_WAITLIST,
      variables: { offset, limit, order },
    })
    if (!data) {
      logger.error('No data returned from list all user on waitlist')
      throw new Error('No data returned from list all user on waitlist')
    }
    return data.listAllUserOnWaitlist
  } catch (error) {
    logger.error('There is an error when list all user on waitlist', error)
    throw new Error('There is an error when list all user on waitlist')
  }
}
