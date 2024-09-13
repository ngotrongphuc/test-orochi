'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type JoinWaitlistResponse = {
  joinWaitlist: boolean
}

const MUTATION_JOIN_WAITLIST = gql`
  mutation Mutation {
    joinWaitlist
  }
`

export const mutateJoinWaitlist = async () => {
  try {
    const client = getClient()
    const { data } = await client.mutate<JoinWaitlistResponse>({
      mutation: MUTATION_JOIN_WAITLIST,
    })
    if (!data) {
      logger.error('No data returned from join waitList')
      throw new Error('No data returned from join waitList')
    }
    return data.joinWaitlist
  } catch (error) {
    logger.error('There is an error when join waitlist', error)
    throw new Error('There is an error when join waitlist')
  }
}
