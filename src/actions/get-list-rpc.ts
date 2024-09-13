'use server'
import { ENV } from '@/lib/env'
import { logger } from '@/utils/logger'
import { ServiceSpider } from '@orochi-network/jrpc'

export const getListRpcRecord = async () => {
  const client = ServiceSpider.Client(ENV.OROCHI_SPIDER_SERVICE_URL || '')
  const result = await client.getListRpc(undefined)

  if (result.isData()) {
    return result.unwrap();
  }
  
  logger.error('Cannot get list lasted price token', result.unwrapError());  
}
