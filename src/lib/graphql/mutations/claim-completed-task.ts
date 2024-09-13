'use server'
import { getClient } from '@/lib/client'
import { logger } from '@/utils/logger'
import { gql } from '@apollo/client'
import { TTaskClaimedStatusResponse } from '../type'

export type TClaimCompletedTaskArgs = {
  taskUuid: string
}

export type TClaimCompletedTaskResponse = {
  claimCompletedTask: TTaskClaimedStatusResponse
}

const MUTATION_CLAIM_COMPLETED_TASK = gql`
  mutation Mutation($taskUuid: String!) {
    claimCompletedTask(taskUuid: $taskUuid) {
      taskUuid
      isClaimed
      reward
    }
  }
`

export const mutateClaimCompletedTask = async ({
  taskUuid,
}: TClaimCompletedTaskArgs) => {
  try {
    const client = getClient()
    const { data } = await client.mutate<TClaimCompletedTaskResponse>({
      mutation: MUTATION_CLAIM_COMPLETED_TASK,
      variables: { taskUuid },
    })
    if (!data) {
      logger.error('No data returned from claim completed task')
      throw new Error('No data returned from claim completed task')
    }
    return data.claimCompletedTask
  } catch (error) {
    logger.error('There is an error when claim completed task:', error)
    throw new Error('There is an error when claim completed task')
  }
}
