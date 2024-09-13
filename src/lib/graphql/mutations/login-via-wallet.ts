'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { IWalletLinking, UserAuth } from '../type'
import { logger } from '@/utils/logger'

export type LoginViaWalletResponse = {
  loginViaWallet: UserAuth
}

const MUTATION_LOGIN_VIA_WALLET = gql`
  mutation Mutation(
    $nonceSessionUuid: String!
    $signature: String!
    $address: String!
    $walletProvider: String
  ) {
    loginViaWallet(
      nonceSessionUuid: $nonceSessionUuid
      signature: $signature
      address: $address
      walletProvider: $walletProvider
    ) {
      uuid
      accessToken
      refreshToken
      isActive
      isVerified
      avatarUrl
    }
  }
`

export const mutateLoginViaWallet = async ({
  nonceSessionUuid,
  signature,
  address,
  walletProvider,
}: IWalletLinking) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<LoginViaWalletResponse>({
      mutation: MUTATION_LOGIN_VIA_WALLET,
      variables: { nonceSessionUuid, signature, address, walletProvider },
    })
    if (!data) {
      logger.error('No data returned from login via wallet')
      throw new Error('No data returned from login via wallet')
    }
    return data.loginViaWallet
  } catch (error) {
    logger.error('There is an error when login via wallet', error)
    throw new Error('There is an error when login via wallet')
  }
}
