'use server'
import { ENV } from '@/lib/env'
import { logger } from '@/utils/logger'
import { ServiceSpider } from '@orochi-network/jrpc'

const identifier = [
  'USDT',
  'USDC',
  'ETH',
  'BNB',
  'ADA',
  'XRP',
  'LINK',
  'SOL',
  'DOT',
  'AVAX',
  'BTC',
]

export const getListPriceToken = async () => {
  const client = ServiceSpider.Client(ENV.OROCHI_SPIDER_SERVICE_URL || '')
  const result = await client.getLatestTokenPrice(identifier)

  if (result.isData()) {
    return result.unwrap()
  } else {
    logger.error('Cannot get list lasted price token ', result.unwrapError())
  }
}
