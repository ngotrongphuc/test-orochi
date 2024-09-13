import { ETokenWithdrawalStatus } from '@/lib/graphql/type'

export type TWithdrawalHistory = {
  address: string
  chain: string
  wallet: string
  amount: number
  withdrawalDate: string
  status: ETokenWithdrawalStatus
}
