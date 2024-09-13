'use server'

import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'

export type UpdateReferralDataAfterSignupArgs = {
  referralCode: string
}

export type UpdateReferralDataAfterSignupResponse = {
  updateReferralDataAfterSignup: boolean
}

const MUTATION_UPDATE_REFERRAL_DATA_AFTER_SIGNUP = gql`
  mutation Mutation($referralCode: String!) {
    updateReferralDataAfterSignup(referralCode: $referralCode)
  }
`

export const mutateUpdateReferralDataAfterSignup = async ({
  referralCode,
}: UpdateReferralDataAfterSignupArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<UpdateReferralDataAfterSignupResponse>(
      {
        mutation: MUTATION_UPDATE_REFERRAL_DATA_AFTER_SIGNUP,
        variables: { referralCode },
      },
    )
    if (!data) {
      logger.error('No data returned from update referral data after signup')
      throw new Error('No data returned from update referral data after signup')
    }
    return data.updateReferralDataAfterSignup
  } catch (error) {
    logger.error(
      'There is an error when update referral data after signup',
      error,
    )
    throw new Error('There is an error when update referral data after signup')
  }
}
