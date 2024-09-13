'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'
import { TTaskWithStatusResponse } from '../type'

export type TGetAllTaskWithStatusArgs = {
  questUuid: string
}

export type TGetAllTaskWithStatusResponse = {
  getAllTaskWithStatus: TTaskWithStatusResponse[]
}

const QUERY_ALL_TASK_WITH_STATUS = gql`
  query Query($questUuid: String!) {
    getAllTaskWithStatus(questUuid: $questUuid) {
      uuid
      name
      taskDescription
      taskParameter
      taskGuide
      isDone
      priority
      taskFrequency
      reward
      isClaimed
    }
  }
`

export const queryAllTaskWithStatus = async ({
  questUuid,
}: TGetAllTaskWithStatusArgs) => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetAllTaskWithStatusResponse>({
      query: QUERY_ALL_TASK_WITH_STATUS,
      variables: { questUuid },
    })
    if (!data) {
      logger.error('No data returned from get all task with status')
      throw new Error('No data returned from get get all task with status')
    }
    return data.getAllTaskWithStatus
  } catch (error) {
    logger.error('There is an error when get all task with status', error)
    throw new Error('There is an error when get all task with status')
  }
}
