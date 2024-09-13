'use server'

import { mutateUsername } from '@/lib/graphql/mutations'
import { TGraphqlResponse } from '@/lib/graphql/type'

export const postUserName = async (
  username: string,
): Promise<TGraphqlResponse> => {
  const result = await mutateUsername({ username })
  if (!result) {
    throw new Error('Error to setting username')
  }
  return result
}
