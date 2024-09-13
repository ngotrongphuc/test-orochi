'use client'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { mainnet, type Chain } from 'wagmi/chains'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { queryLinkingWalletMessageWithNonce } from '@/lib/graphql/queries'
import { mutateLinkWallet } from '@/lib/graphql/mutations'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import {
  metaMaskWallet,
  okxWallet,
  bybitWallet,
  bitgetWallet,
  rabbyWallet,
  trustWallet,
  coinbaseWallet,
  phantomWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { getWalletProviderId } from '../lib/utils'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''

export const bnb = {
  id: 56,
  name: 'BNB Smart Chain Mainnet',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://binance.llamarpc.com'] },
  },
  testnet: false,
} as const satisfies Chain

export const scroll = {
  id: 534352,
  name: 'Scroll',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/scroll'] },
  },
  testnet: false,
} as const satisfies Chain

const customChains = [bnb, scroll]

// TODO: add BNB chain and Backpack wallet
export const config = getDefaultConfig({
  appName: 'Retroactive',
  projectId,
  chains: [mainnet, ...customChains],
  ssr: true, // If your dApp uses server side rendering (SSR)
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        okxWallet,
        bybitWallet,
        bitgetWallet,
        rabbyWallet,
        trustWallet,
        coinbaseWallet,
        phantomWallet,
        walletConnectWallet,
      ],
    },
  ],
})

// context
type TOpenWalletConnectModalParams = {
  callback?: () => void
  isLinkWallet?: boolean
}

export type TRainbowModalContext = {
  openRainbowKitModal: (params?: TOpenWalletConnectModalParams) => void
}

export const RainbowModalContext = createContext<
  TRainbowModalContext | undefined
>(undefined)

export const useRainbowKitContext = () => {
  const context = useContext(RainbowModalContext)
  if (!context) {
    throw new Error(
      'useRainbowKitContext must be used within a SessionProvider',
    )
  }
  return context
}

const RainbowKitContext = ({ children }: React.PropsWithChildren) => {
  const { openConnectModal } = useConnectModal()

  const account = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [params, setParams] = useState<TOpenWalletConnectModalParams>({
    callback: () => {},
    isLinkWallet: false,
  })
  const [clicked, setClicked] = useState<boolean>(false)

  const TOAST_DURATION = 5000

  const onSignMessage = useCallback(async () => {
    try {
      const { callback, isLinkWallet } = params
      const { address, connector } = account
      const walletProvider = getWalletProviderId(
        connector?.name || 'rainbowKit',
      )
      if (!address) {
        throw new Error('Invalid address')
      }
      const { message, nonceSessionUuid } =
        await queryLinkingWalletMessageWithNonce()
      if (!message || !nonceSessionUuid) {
        throw new Error('Something error')
      }
      const signature = await signMessageAsync({ message, account: address })
      if (isLinkWallet) {
        const response = await mutateLinkWallet({
          nonceSessionUuid,
          signature,
          address,
          walletProvider,
        })
        if (response && 'error' in response) {
          toast({
            message: response.error,
            variant: 'error',
            duration: TOAST_DURATION,
          })
        }
      } else {
        const response = await signIn('credentials', {
          address,
          nonceSessionUuid,
          signature,
          loginMethod: walletProvider,
          callbackUrl: `/contribute-to-earn/account/${address}`,
          redirect: false,
        })
        if (response?.error) {
          toast({
            message: response.error,
            variant: 'error',
            duration: TOAST_DURATION,
          })
        }
      }
      callback?.()
    } catch (error) {
      toast({
        message: error instanceof Error ? error.message : 'Link wallet error',
        variant: 'error',
        duration: TOAST_DURATION,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, params])

  useEffect(() => {
    if (clicked && account.status === 'connected') {
      onSignMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.status, clicked])

  const openRainbowKitModal = (params?: TOpenWalletConnectModalParams) => {
    if (account.address) {
      toast({
        message: 'You have to disconnect recent account first!',
        variant: 'error',
        duration: TOAST_DURATION,
      })
    }
    const { callback, isLinkWallet = false } = params || {}
    setParams({
      callback,
      isLinkWallet,
    })
    openConnectModal?.()
    setClicked(true)
  }

  return (
    <RainbowModalContext.Provider value={{ openRainbowKitModal }}>
      {children}
    </RainbowModalContext.Provider>
  )
}

// wrapper
export const RainbowKitWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <RainbowKitProvider>
      <RainbowKitContext>{children}</RainbowKitContext>
    </RainbowKitProvider>
  )
}
