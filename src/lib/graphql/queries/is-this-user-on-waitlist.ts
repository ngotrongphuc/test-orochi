'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type IsThisUserOnWaitlistResponse = {
  isThisUserOnWaitlist: boolean
}

const QUERY_IS_THIS_USER_ON_WAITLIST = gql`
  query Query {
    isThisUserOnWaitlist
  }
`

export const queryIsThisUserOnWaitlist = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<IsThisUserOnWaitlistResponse>({
      query: QUERY_IS_THIS_USER_ON_WAITLIST,
    })
    if (!data) {
      logger.error('No data returned from check is on waitlist')
      throw new Error('No data returned from check is on waitlist')
    }
    return data.isThisUserOnWaitlist
  } catch (error) {
    logger.error('There is an error when check is on waitlist', error)
    throw new Error('There is an error when check is on waitlist')
  }
}
