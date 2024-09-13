'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'

export type TSupportedXOroChainIdsResponse = {
  supportedXOroChainIds: string[]
}

const QUERY_SUPPOERTED_XORO_CHAIN_IDS = gql`
  query Query {
    supportedXOroChainIds
  }
`

export const querySupportedXOroChainIds = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TSupportedXOroChainIdsResponse>({
      query: QUERY_SUPPOERTED_XORO_CHAIN_IDS,
    })
    if (!data) {
      logger.error('No data returned from get supported XOro chain ids')
      throw new Error('No data returned from get supported XOro chain ids')
    }
    return data.supportedXOroChainIds
  } catch (error) {
    logger.error('There is an error when get supported XOro chain ids', error)
    throw new Error('There is an error when get supported XOro chain ids')
  }
}
