'use server'

import { gql } from '@apollo/client'
import {
  TGetSuccessfulReferralsResponse,
  IOrderingBy,
  IPagination,
  EOrder,
  TListParticipatedUserForCampaignResponse,
} from '../type'
import { logger } from '@/utils/logger'
import { getClient } from '@/lib/client'

export type TGetListParticipatedUserForCampaignRequest = {
  campaignUuid: string
  pagination?: IPagination
}

export type TGetListParticipatedUserForCampaignResponse = {
  getListParticipatedUserForCampaign: TListParticipatedUserForCampaignResponse
}

const QUERY_GET_LIST_PARTICIPATED_USER_FOR_CAMPAIGN = gql`
  query Query($campaignUuid: String!, $pagination: IPagination) {
    getListParticipatedUserForCampaign(
      campaignUuid: $campaignUuid
      pagination: $pagination
    ) {
      offset
      limit
      order {
        column
        order
      }
      total
      records {
        username
        profilePictureUrl
      }
    }
  }
`

export const queryListParticipatedUserForCampaign = async ({
  campaignUuid,
  pagination = {
    limit: 10,
    offset: 0,
    order: [
      {
        column: 'username',
        order: EOrder.ASC,
      },
    ],
  },
}: TGetListParticipatedUserForCampaignRequest) => {
  try {
    const client = getClient()
    const { data } =
      await client.query<TGetListParticipatedUserForCampaignResponse>({
        query: QUERY_GET_LIST_PARTICIPATED_USER_FOR_CAMPAIGN,
        variables: { campaignUuid, pagination },
      })
    if (!data) {
      logger.error(
        'No data returned from get list participated user for campaign',
      )
      throw new Error(
        'No data returned from get list participated user for campaign',
      )
    }
    return data.getListParticipatedUserForCampaign
  } catch (error) {
    logger.error(
      'There is an error when get list participated user for campaign',
      error,
    )
    throw new Error(
      'There is an error when get list participated user for campaign',
    )
  }
}
