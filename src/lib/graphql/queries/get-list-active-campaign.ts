'use server'

import { gql } from '@apollo/client'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'
import { TListCampaignResponse } from '../type'

export type TGetListActiveCampaignResponse = {
  getListActiveCampaign: TListCampaignResponse[]
}

const QUERY_LIST_ACTIVE_CAMPAIGN = gql`
  query Query {
    getListActiveCampaign {
      uuid
      name
      campaignDescription
      campaignStartTime
      campaignEndTime
      isActive
      quests {
        uuid
        name
        description
        isActive
      }
      defaultSelectedQuest {
        quest {
          uuid
          name
          description
          isActive
        }
        tasks {
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
      campaignTotalEarning
    }
  }
`

export const queryListActiveCampaign = async () => {
  try {
    const client = getClient()
    const { data } = await client.query<TGetListActiveCampaignResponse>({
      query: QUERY_LIST_ACTIVE_CAMPAIGN,
    })
    if (!data) {
      logger.error('No data returned from get list active campaign')
      throw new Error('No data returned from get get list active campaign')
    }
    return data.getListActiveCampaign
  } catch (error) {
    logger.error('There is an error when get list active campaign', error)
    throw new Error('There is an error when get list active campaign')
  }
}
