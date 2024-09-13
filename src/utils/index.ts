import Twitter from '@/components/icons/twitter'
import {
  backpackIcon,
  bigetIcon,
  coinbaseIcon,
  discord,
  google,
  metamaskIcon,
  okxIcon,
  trustWalletIcon,
  walletConnectIcon,
  byBitIcon,
} from '../../public/images/contribute-to-earn/icons'
import { FixedFloat } from '@orochi-network/utilities'

export const hexer = (input: string): string => {
  return `0x${Buffer.from(input, 'utf-8').toString('hex')}`
}

export const shortenString = (str: string): string => {
  return str.length <= 12 ? str : `${str.slice(0, 4)}...${str.slice(-4)}`
}

type providerImage = typeof google
export const getImageUrl = (provider: string): string => {
  const providerName = provider.toLowerCase()
  const tokenImageMap: { [key: string]: providerImage } = {
    google,
    discord,
    // twitter: ,
    metamask: metamaskIcon,
    walletconnect: walletConnectIcon,
    coinbasewallet: coinbaseIcon,
    okx: okxIcon,
    trustwallet: trustWalletIcon,
    bitgetwallet: bigetIcon,
    backpack: backpackIcon,
    bybit: byBitIcon,
  }
  return tokenImageMap[providerName]?.default?.src
}

export const getBalance = (balance: bigint) => {
  const result = FixedFloat.fromFixedFloat({
    basedValue: balance,
    decimals: 18,
  }).prettyAuto('us-en', 2)

  return result
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}
