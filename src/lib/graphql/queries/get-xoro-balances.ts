'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { TXOroBalances } from '../type'
import { logger } from '@/utils/logger'

export type TListXOroBalancesResponse = {
  xOroBalances: TXOroBalances
}

const QUERY_LIST_XORO_BALANCES = gql`
  query XOroBalances {
    xOroBalances {
      balances {
        address
        balance
        walletProvider
        chainId
      }
      totalBalance
    }
  }
`

export const queryListXOroBalances = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TListXOroBalancesResponse>({
      query: QUERY_LIST_XORO_BALANCES,
    })
    if (!data) {
      throw new Error('No data returned from get list XORO balances')
    }
    return data.xOroBalances
  } catch (error) {
    logger.error('There is an error when get list XORO balances', error)
    throw new Error('There is an error when get list XORO balances')
  }
}
