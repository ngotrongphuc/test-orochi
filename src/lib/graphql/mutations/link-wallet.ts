'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { IWalletLinking, TGraphqlResponse } from '../type'
import { logger } from '@/utils/logger'

export type TLinkWalletResponse = {
  linkWallet: boolean
}

const MUTATION_LINK_WALLET = gql`
  mutation Mutation(
    $nonceSessionUuid: String!
    $signature: String!
    $address: String!
    $walletProvider: String
  ) {
    linkWallet(
      nonceSessionUuid: $nonceSessionUuid
      signature: $signature
      address: $address
      walletProvider: $walletProvider
    )
  }
`

export const mutateLinkWallet = async ({
  nonceSessionUuid,
  signature,
  address,
  walletProvider,
}: IWalletLinking): Promise<TGraphqlResponse> => {
  try {
    const client = getClient()
    const { data } = await client.mutate<TLinkWalletResponse>({
      mutation: MUTATION_LINK_WALLET,
      variables: { nonceSessionUuid, signature, address, walletProvider },
    })
    if (!data) {
      throw new Error('No data returned from link wallet')
    }
    return { data: data.linkWallet }
  } catch (error) {
    logger.error('There is an error when link wallet', error)
    return {
      error:
        error instanceof Error
          ? error.message
          : 'There is an error when link wallet',
    }
  }
}
