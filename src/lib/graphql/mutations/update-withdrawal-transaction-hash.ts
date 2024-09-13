'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type TUpdateWithdrawalTransactionHashArgs = {
  transactionUuid: string
  transactionHash: string
}

export type TUpdateWithdrawalTransactionHashResponse = {
  updateWithdrawalTransactionHash: boolean
}

const MUTATION_UPDATE_WITHDRAWAL_TRANSACTION_HASH = gql`
  mutation UpdateWithdrawalTransactionHash(
    $transactionUuid: String!
    $transactionHash: String!
  ) {
    updateWithdrawalTransactionHash(
      transactionUuid: $transactionUuid
      transactionHash: $transactionHash
    )
  }
`

export const mutateUpdateWithdrawalTransactionHash = async ({
  transactionUuid,
  transactionHash,
}: TUpdateWithdrawalTransactionHashArgs): Promise<boolean> => {
  try {
    const client = getClient()
    const { data } =
      await client.mutate<TUpdateWithdrawalTransactionHashResponse>({
        mutation: MUTATION_UPDATE_WITHDRAWAL_TRANSACTION_HASH,
        variables: { transactionUuid, transactionHash },
      })
    if (!data) {
      logger.error('No data returned from update withdrawal transaction hash')
      throw new Error(
        'No data returned from update withdrawal transaction hash',
      )
    }
    return data.updateWithdrawalTransactionHash
  } catch (error) {
    logger.error(
      'There is an error when update withdrawal transaction hash',
      error,
    )
    throw new Error('There is an error when update withdrawal transaction hash')
  }
}
