'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TLoginMethodsStatus } from '../type'

export type LoginMethodsStatusResponse = {
  loginMethodsStatus: TLoginMethodsStatus
}

const QUERY_LOGIN_METHODS_STATUS = gql`
  query Query {
    loginMethodsStatus {
      socialConnections {
        socialProvider
        externalId
      }
      walletConnections {
        address
        walletProvider
      }
      availableSocialConnections
    }
  }
`

export const queryLoginMethodsStatus = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<LoginMethodsStatusResponse>({
      query: QUERY_LOGIN_METHODS_STATUS,
    })
    if (!data) {
      logger.error('No data returned from get login methods status')
      throw new Error('No data returned from get login methods status')
    }
    return data.loginMethodsStatus
  } catch (error) {
    logger.error('There is an error when get login methods status', error)
    throw new Error('There is an error when get login methods status')
  }
}
