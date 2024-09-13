import { TSocialLoginMethod, WalletLoginMethod } from '@/lib/graphql/type'

export type LoginMethod = {
  id: TSocialLoginMethod
  title: string
  image?: string
}

export type SocialAccount = {
  id: TSocialLoginMethod
  title: string
  image: string
}

export type WalletAccount = {
  id: WalletLoginMethod
  title: string
  image: string
  explorerUrl?: string
}

export type TWalletOptions = {
  recommended: WalletAccount[]
  others: WalletAccount[]
}
