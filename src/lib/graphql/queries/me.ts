'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TGraphqlResponse, TUserProfile } from '../type'

type MeResponse = {
  me: TUserProfile
}

const QUERY_ME = gql`
  query Query {
    me {
      uuid
      username
      email
      profilePictureUrl
      verified
      emailVerified
      isChunin
    }
  }
`

export const queryMe = async (): Promise<TGraphqlResponse> => {
  try {
    const client = getClient()
    const { data } = await client.query<MeResponse>({
      query: QUERY_ME,
    })
    if (!data) {
      throw new Error('No data returned from get me')
    }
    return { data: data.me }
  } catch (error) {
    logger.error('There is an error when get me', error)
    return {
      error:
        error instanceof Error
          ? error.message
          : 'There is an error when get me',
    }
  }
}
