'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TProcessTaskResponse } from '../type'

export type TCompleteTaskArgs = {
  taskUuid: string
}

export type TCompleteTaskResponse = {
  completeTask: TProcessTaskResponse
}

const MUTATION_COMPLETE_TASK = gql`
  mutation Mutation($taskUuid: String!) {
    completeTask(taskUuid: $taskUuid) {
      taskUuid
      name
      isDone
    }
  }
`

export const mutateCompleteTask = async ({ taskUuid }: TCompleteTaskArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<TCompleteTaskResponse>({
      mutation: MUTATION_COMPLETE_TASK,
      variables: { taskUuid },
    })
    if (!data) {
      logger.error('No data returned from complete task')
      throw new Error('No data returned from complete task')
    }
    return data.completeTask
  } catch (error) {
    logger.error('There is an error when complete task:', error)
    throw new Error('There is an error when complete task')
  }
}
