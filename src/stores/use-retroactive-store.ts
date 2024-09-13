import { TWithdrawXOroArgs } from '@/lib/graphql/mutations'
import {
  queryGloballyTotalReferralCount,
  queryListXOroBalances,
  queryLoginMethodsStatus,
  queryTotalVerifiedUsers,
  queryUserReferralLeaderboard,
  queryUserReward,
} from '@/lib/graphql/queries'
import { queryTokenWithdrawalHistory } from '@/lib/graphql/queries'
import {
  EOrder,
  ETokenName,
  TGetTokenWithdrawalHistoryFields,
  TLinkedWallet,
  TLoginMethodsStatus,
  TUserReferralLeaderboardResponse,
  TUserRewardResponse,
  TXOroBalances,
  WalletLoginMethod,
} from '@/lib/graphql/type'
import { create } from 'zustand'

type TUserRewardState = {
  userReward?: TUserRewardResponse
  balance: number
  getUserReward: () => Promise<void>
  withdrawData?: TWithdrawXOroArgs & { walletProvider: WalletLoginMethod }
  setWithdrawData: (
    params: TWithdrawXOroArgs & { walletProvider: WalletLoginMethod },
  ) => void
}

type TXOroBalancesState = {
  xOroBalances?: TXOroBalances
  getXOroBalances: () => Promise<void>
  tokenWithdrawalHistory?: TGetTokenWithdrawalHistoryFields
  getTokenWithdrawalHistory: () => Promise<void>
}

type TLoginMethodsStatusState = {
  loginMethodsStatus?: TLoginMethodsStatus
  connectedWallets: TLinkedWallet[]
  getLoginMethodsStatus: () => Promise<void>
}

type TLeaderBoardState = {
  userReferralLeaderboard?: TUserReferralLeaderboardResponse
  globallyTotalReferralCount: number
  totalVerifiedUsers: number
  getUserReferralLeaderboard: () => Promise<void>
  getGloballyTotalReferralCount: () => Promise<void>
  getTotalVerifiedUsers: () => Promise<void>
}

export const useUserRewardStore = create<TUserRewardState>((set, get) => ({
  userReward: undefined,
  balance: 0,
  getUserReward: async () => {
    const result = await queryUserReward()
    set({ userReward: result, balance: parseFloat(result.amount.toString()) })
  },
  withdrawData: undefined,
  setWithdrawData: ({ amount, chainId, walletAddress, walletProvider }) =>
    set(() => ({
      withdrawData: { amount, chainId, walletAddress, walletProvider },
    })),
}))

export const useXOroBalancesStore = create<TXOroBalancesState>((set, get) => ({
  xOroBalances: undefined,
  getXOroBalances: async () => {
    const result = await queryListXOroBalances()
    set({ xOroBalances: result })
  },
  tokenWithdrawalHistory: undefined,
  getTokenWithdrawalHistory: async () => {
    const result = await queryTokenWithdrawalHistory({
      tokenName: ETokenName.X_ORO,
      pagination: {
        limit: 10,
        offset: 0,
        order: [
          {
            column: 'createdAt',
            order: EOrder.DESC,
          },
        ],
      },
    })
    set({ tokenWithdrawalHistory: result })
  },
}))

export const useLoginMethodsStatusStore = create<TLoginMethodsStatusState>(
  (set) => ({
    loginMethodsStatus: undefined,
    connectedWallets: [],
    getLoginMethodsStatus: async () => {
      const result = await queryLoginMethodsStatus()
      set({
        loginMethodsStatus: result,
        connectedWallets: result.walletConnections,
      })
    },
  }),
)

export const useLeaderBoardStore = create<TLeaderBoardState>((set) => ({
  userReferralLeaderboard: undefined,
  globallyTotalReferralCount: 0,
  totalVerifiedUsers: 0,
  getUserReferralLeaderboard: async () => {
    const result = await queryUserReferralLeaderboard()
    set({
      userReferralLeaderboard: result,
    })
  },
  getGloballyTotalReferralCount: async () => {
    const result = await queryGloballyTotalReferralCount()
    set({
      globallyTotalReferralCount: result,
    })
  },
  getTotalVerifiedUsers: async () => {
    const result = await queryTotalVerifiedUsers()
    set({
      totalVerifiedUsers: result,
    })
  },
}))
