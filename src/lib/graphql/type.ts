import { EPartnerName } from '@/app/contribute-to-earn/lib/types'

export type TSocialProvider = 'google' | 'discord' | 'twitter'

export type TSocialLoginMethod =
  | 'google'
  | 'discord'
  | 'twitter'
  | 'cryptoWallet'

export type WalletLoginMethod =
  | 'metamask'
  | 'walletConnect'
  | 'coinbaseWallet'
  | 'okx'
  | 'trustWallet'
  | 'bitGetWallet'
  | 'backpack'
  | 'byBit'
  | 'rainbowKit'

export type LoginMethod = TSocialProvider | WalletLoginMethod

export enum ESocialLoginMethod {
  Google = 'google',
  Discord = 'discord',
  Twitter = 'twitter',
  CryptoWallet = 'cryptoWallet',
}

export type TGraphqlData = {
  data: any
}

export type TGraphqlError = {
  error: string
}

export type TGraphqlResponse = TGraphqlData | TGraphqlError

/*==========User===========*/

export type UserAuth = {
  uuid: string
  accessToken: string
  refreshToken: string
  isActive: boolean
  isVerified: boolean
  avatarUrl: string
}

export type TUserProfile = {
  uuid: string
  username: string
  profilePictureUrl: string
  email: string
  emailVerified: boolean
  verified: boolean
  isChunin: boolean
}

/*=================Wallet=================*/
export type TWalletBalance = {
  address: string
  balance: bigint
  chainId: bigint
  walletProvider: string
}

export type TXOroBalances = {
  totalBalance: number
  balances: TWalletBalance[]
}

export type TWithdrawXOroFields = {
  withdrawalStatus: ETokenWithdrawalStatus
  signedPayload: string
  transactionUuid: string
}

export enum ETokenWithdrawalStatus {
  Signed = 'signed',
  Transacting = 'transacting',
  Minted = 'minted',
}

export enum ETokenName {
  X_ORO = 'x_oro',
}

export type TTokenWithdrawalHistory = {
  amount: number
  chainId: bigint
  createdAt: Date
  nonce: bigint
  signedPayload: string
  status: ETokenWithdrawalStatus
  token: ETokenName
  uuid: string
  walletAddress: string
}

export type TGetTokenWithdrawalHistoryArgs = {
  tokenName: ETokenName
  pagination: IPagination
}

export type TGetTokenWithdrawalHistoryFields = {
  pagination: IPagination
  records: TTokenWithdrawalHistory[]
}

/*==========Login Method Status===========*/

export type TLinkedWallet = {
  address: `0x${string}`
  walletProvider: WalletLoginMethod
}

export type TLinkedSocialAccount = {
  externalId: string
  socialProvider: TSocialProvider
}

export type TLoginMethodsStatus = {
  availableSocialConnections: TSocialProvider[]
  walletConnections: TLinkedWallet[]
  socialConnections: TLinkedSocialAccount[]
}

/*===========================*/

export type TSuccessfulReferral = {
  isChuninUser: boolean
  isVerified: boolean
  username: string
}

export interface IWalletLinking {
  nonceSessionUuid: string
  signature: string
  address: string
  walletProvider?: string
}

export interface ISocialAccountLinking {
  email?: string
  socialProvider: TSocialProvider
  externalId: string
}

export enum EOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IOrderingBy {
  column: string
  order: EOrder
}

export interface IPagination {
  limit: number
  offset: number
  order: IOrderingBy[]
  total?: number
}

export type TLeaderboardUser = {
  isVerified: boolean
  referralCount: number
  username: string
  referrerUsername: string
}

export type TTotalUserAndPoints = {
  totalPoints: number
  totalUsers: number
}

export type TUserOnWaitlist = {
  username: string
  uuid: string
}

/*==========Quest===========*/

export type TQuest = {
  description?: string
  isActive: boolean
  name?: string
  uuid: string
}

export type TUserQuestTaskStatus = {
  quest: TQuest
  tasks: TTaskWithStatusResponse[]
}

/*===============Response================*/

export type TJoinWaitListResponse = {
  isWait: boolean
  userId: number
}

export type TGetSuccessfulReferralsResponse = {
  records: TSuccessfulReferral[]
  limit: number
  offset: number
  order: IOrderingBy[]
  total: bigint
}

export type TCreateCountLinkResponse = {
  isSuccess: boolean
  ownerLinkId: number
  userId: number
}

export type TUserReferralLeaderboardResponse = {
  records: TLeaderboardUser[]
  limit: number
  offset: number
  order: IOrderingBy[]
  total: bigint
}

export type TListUserOnWaitlistResponse = {
  records: TUserOnWaitlist[]
  limit: number
  offset: number
  order: IOrderingBy[]
  total: bigint
}

export type TRefreshTokenResponse = {
  accessToken: string
}

export type TWalletMessageWithNonce = {
  message: string
  nonceSessionUuid: string
}

export type TTaskWithStatusResponse = {
  uuid: string
  name: string
  taskDescription: string
  taskParameter: {
    url: string
    logo: string
    referralCode: string
    partnerName: EPartnerName
    [key: string]: any
  }
  taskGuide: {
    steps: string[]
    [key: string]: any
  }
  isDone: boolean
  priority: number
  taskFrequency: string
  reward: string
  isClaimed: boolean
}

export type TUserRewardResponse = {
  uuid: string
  amount: number
}

export type TTaskClaimedStatusResponse = {
  isClaimed: boolean
  reward: number
  taskUuid: string
}

export type TListCampaignResponse = {
  campaignDescription?: string
  campaignStartTime?: Date
  campaignEndTime?: Date
  defaultSelectedQuest?: TUserQuestTaskStatus
  isActive: boolean
  name: string
  quests: TQuest[]
  uuid: string
  campaignTotalEarning: string
}

export type TUserJoinCampaignResponse = {
  profilePictureUrl?: string
  username?: string
}

export type TListParticipatedUserForCampaignResponse = {
  offset?: number
  limit?: number
  order?: IOrderingBy[]
  total?: bigint
  records?: TUserJoinCampaignResponse[]
}

export type TProcessTaskResponse = {
  isDone: boolean
  name?: string
  taskUuid?: string
}
