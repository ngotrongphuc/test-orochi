'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { type TUserProfile } from '../type'

export type SetProfilePictureUrlArgs = {
  profilePictureUrl: string
}

export type SetProfilePictureUrlResponse = {
  setProfilePictureUrl: TUserProfile
}

const MUTATION_SET_PROFILE_PICTURE_URL = gql`
  mutation Mutation($profilePictureUrl: String!) {
    setProfilePictureUrl(profilePictureUrl: $profilePictureUrl) {
      uuid
      username
      email
      profilePictureUrl
      verified
      emailVerified
    }
  }
`

export const mutateProfilePictureUrl = async ({
  profilePictureUrl,
}: SetProfilePictureUrlArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<SetProfilePictureUrlResponse>({
      mutation: MUTATION_SET_PROFILE_PICTURE_URL,
      variables: { profilePictureUrl },
    })

    if (!data) {
      logger.error('No data returned from set profile picture url')
      throw new Error('No data returned from set profile picture url')
    }
    return data.setProfilePictureUrl
  } catch (error) {
    logger.error('There is an error when set profile picture url', error)
    throw new Error('There is an error when set profile picture url')
  }
}
