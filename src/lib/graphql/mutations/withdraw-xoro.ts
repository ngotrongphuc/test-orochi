'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TWithdrawXOroFields } from '../type'

export type TWithdrawXOroArgs = {
  amount: string
  chainId: string
  walletAddress: string
}

export type TWithdrawXOroResponse = {
  withdrawXOro: TWithdrawXOroFields
}

const MUTATION_WITHDRAW_XORO = gql`
  mutation WithdrawXOro(
    $amount: Decimal!
    $chainId: BigInt!
    $walletAddress: String!
  ) {
    withdrawXOro(
      amount: $amount
      chainId: $chainId
      walletAddress: $walletAddress
    ) {
      withdrawalStatus
      signedPayload
      transactionUuid
    }
  }
`

export const mutateWithdrawXOro = async ({
  amount,
  chainId,
  walletAddress,
}: TWithdrawXOroArgs): Promise<TWithdrawXOroFields> => {
  try {
    const client = getClient()
    const { data } = await client.mutate<TWithdrawXOroResponse>({
      mutation: MUTATION_WITHDRAW_XORO,
      variables: { amount, chainId, walletAddress },
    })
    if (!data) {
      logger.error('No data returned from withdraw XOro')
      throw new Error('No data returned from withdraw XOro')
    }
    return data.withdrawXOro
  } catch (error) {
    logger.error('There is an error when withdraw XOro', error)
    throw new Error('There is an error when withdraw XOro')
  }
}
