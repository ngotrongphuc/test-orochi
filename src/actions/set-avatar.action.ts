'use server'

import { mutateProfilePictureUrl } from '@/lib/graphql/mutations'
import { TUserProfile } from '@/lib/graphql/type'
import { logger } from '@/utils/logger'

export const postAvatar = async (profilePictureUrl: string): Promise<TUserProfile> => {
  try {
    const result = await mutateProfilePictureUrl({ profilePictureUrl })
    if (!result) {
      throw new Error('No result returned from mutation')
    }
    return result
  } catch (error) {
    logger.error('Error setting Avatar:', error)
    throw error
  }
}
