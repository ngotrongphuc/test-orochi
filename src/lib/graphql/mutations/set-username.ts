'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TGraphqlResponse } from '../type'

export type SetUsernameArgs = {
  username: string
}

export type SetUsernameResponse = {
  setUsername: string
}

const MUTATION_SET_USERNAME = gql`
  mutation Mutation($username: String!) {
    setUsername(username: $username)
  }
`

export const mutateUsername = async ({
  username,
}: SetUsernameArgs): Promise<TGraphqlResponse> => {
  try {
    const client = getClient()
    const { data } = await client.mutate<SetUsernameResponse>({
      mutation: MUTATION_SET_USERNAME,
      variables: { username },
    })
    if (!data) {
      throw new Error('No data returned from set user name')
    }
    return { data: data.setUsername }
  } catch (error) {
    logger.error('There is an error when set username', error)
    return {
      error:
        error instanceof Error
          ? error.message
          : 'There is an error when set username',
    }
  }
}
