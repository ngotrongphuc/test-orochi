'use server'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
import { ISocialAccountLinking } from '../type'
import { logger } from '@/utils/logger'

export type LinkSocialAccountArgs = {
  data: ISocialAccountLinking
}

export type LinkSocialAccountResponse = {
  linkSocialAccount: boolean
}

const MUTATION_LINK_SOCIAL_ACCOUNT = gql`
  mutation Mutation($data: ISocialAccountLinking!) {
    linkSocialAccount(data: $data)
  }
`

export const mutateLinkSocialAccount = async ({
  data: payloadData,
}: LinkSocialAccountArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<LinkSocialAccountResponse>({
      mutation: MUTATION_LINK_SOCIAL_ACCOUNT,
      variables: { data: payloadData },
    })
    if (!data) {
      logger.error('No data returned from link social account')
      throw new Error('No data returned from link social account')
    }
    return data.linkSocialAccount
  } catch (error) {
    logger.error('There is an error when link social account', error)
    let errorMessage =
      error instanceof Error
        ? error.message
        : 'There is an error when link social account'
    throw new Error(errorMessage)
  }
}
