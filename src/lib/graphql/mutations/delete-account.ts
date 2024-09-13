'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type DeleteAccountResponse = {
  deleteAccount: boolean
}

const MUTATION_DELETE_ACCOUNT = gql`
  mutation Mutation {
    deleteAccount
  }
`

export const mutateDeleteAccount = async () => {
  try {
    const client = getClient()
    const { data } = await client.mutate<DeleteAccountResponse>({
      mutation: MUTATION_DELETE_ACCOUNT,
    })
    if (!data) {
      logger.error('No data returned from delete account')
      throw new Error('There is an error when delete account')
    }
    return data.deleteAccount
  } catch (error) {
    logger.error('There is an error when delete account', error)
    throw new Error('There is an error when delete account')
  }
}
