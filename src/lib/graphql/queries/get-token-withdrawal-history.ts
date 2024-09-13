'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import {
  TGetTokenWithdrawalHistoryArgs,
  TGetTokenWithdrawalHistoryFields,
} from '../type'
import { logger } from '@/utils/logger'

export type TGetTokenWithdrawalHistoryResponse = {
  getTokenWithdrawalHistory: TGetTokenWithdrawalHistoryFields
}

const QUERY_TOKEN_WITHDRAWAL_HISTORY = gql`
  query GetTokenWithdrawalHistory(
    $tokenName: ETokenName!
    $pagination: IPagination
  ) {
    getTokenWithdrawalHistory(tokenName: $tokenName, pagination: $pagination) {
      pagination {
        total
        offset
        limit
        order {
          column
          order
        }
      }
      records {
        uuid
        token
        amount
        chainId
        nonce
        walletAddress
        signedPayload
        status
        createdAt
      }
    }
  }
`

export const queryTokenWithdrawalHistory = async ({
  tokenName,
  pagination,
}: TGetTokenWithdrawalHistoryArgs): Promise<TGetTokenWithdrawalHistoryFields> => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetTokenWithdrawalHistoryResponse>({
      query: QUERY_TOKEN_WITHDRAWAL_HISTORY,
      variables: { tokenName, pagination },
    })
    if (!data) {
      logger.error('No data returned from get token withdrawal history')
      throw new Error('No data returned from get token withdrawal history')
    }
    return data.getTokenWithdrawalHistory
  } catch (error) {
    logger.error('There is an error when get token withdrawal history', error)
    throw new Error('There is an error when get token withdrawal history')
  }
}
