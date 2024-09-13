'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'
import { TWalletMessageWithNonce } from '../type'

export type TGetLinkingWalletMessageWithNonceResponse = {
  getLinkingWalletMessageWithNonce: TWalletMessageWithNonce
}

const QUERY_GET_LINKING_WALLET_MESSAGE_WITH_NONCE = gql`
  query Query {
    getLinkingWalletMessageWithNonce {
      message
      nonceSessionUuid
    }
  }
`

export const queryLinkingWalletMessageWithNonce = async () => {
  try {
    const client = getClient()
    const { data } =
      await client.query<TGetLinkingWalletMessageWithNonceResponse>({
        query: QUERY_GET_LINKING_WALLET_MESSAGE_WITH_NONCE,
      })
    if (!data) {
      logger.error(
        'No data returned from get linking wallet message with nonce',
      )
      throw new Error(
        'No data returned from get linking wallet message with nonce',
      )
    }
    return data.getLinkingWalletMessageWithNonce
  } catch (error) {
    logger.error(
      'There is an error when get linking wallet message with nonce',
      error,
    )
    throw new Error(
      'There is an error when get linking wallet message with nonce',
    )
  }
}
