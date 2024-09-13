'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type CreateReferralCodeResponse = {
  getOrCreateReferralCode: string
}

const MUTATION_CREATE_REFERRAL_CODE = gql`
  mutation Mutation {
    getOrCreateReferralCode
  }
`

export const mutateCreateReferralCode = async () => {
  try {
    const client = getClient()
    const { data } = await client.mutate<CreateReferralCodeResponse>({
      mutation: MUTATION_CREATE_REFERRAL_CODE,
    })
    if (!data) {
      logger.error('No data returned from create referral code')
      throw new Error('No data returned from create referral code')
    }
    return data.getOrCreateReferralCode
  } catch (error) {
    logger.error('There is an error when create referral code:', error)
    throw new Error('There is an error when create referral code')
  }
}
