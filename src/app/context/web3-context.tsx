'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { queryLinkingWalletMessageWithNonce } from '@/lib/graphql/queries'
import { getWalletProviderId } from '../contribute-to-earn/lib/utils'
import { mutateLinkWallet } from '@/lib/graphql/mutations'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'

type TOpenWalletConnectModalParams = {
  callback?: () => void
  isLinkWallet?: boolean
}

export type TWalletConnectModalContext = {
  openWalletConnectModal: (params?: TOpenWalletConnectModalParams) => void
}

export const WalletConnectModalContext = createContext<
  TWalletConnectModalContext | undefined
>(undefined)

export const useWalletConnectModalContext = () => {
  const context = useContext(WalletConnectModalContext)
  if (!context) {
    throw new Error(
      'useWalletConnectModalContext must be used within a SessionProvider',
    )
  }
  return context
}

const TOAST_DURATION = 5000

export function Web3ModalWrapper({ children }: { children: ReactNode }) {
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const account = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [params, setParams] = useState<TOpenWalletConnectModalParams>({
    callback: () => {},
    isLinkWallet: false,
  })
  const [clicked, setClicked] = useState<boolean>(false)

  const onSignMessage = useCallback(async () => {
    const { address, connector } = account
    const walletProvider = getWalletProviderId(
      connector?.name || 'walletConnect',
    )
    const { callback, isLinkWallet } = params
    if (!address) {
      throw new Error('Something error')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, account])

  // CONNECT_SUCCESS run multiple times so only open sign message modal if wallet name matched
  // check event MODAL_CLOSE and property connected is true to handle event scanning qr code
  useEffect(() => {
    if (clicked && account.status === 'connected') {
      onSignMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.status, clicked])

  const openWalletConnectModal = async (
    params?: TOpenWalletConnectModalParams,
  ) => {
    if (account.address) {
      disconnect()
    }
    const { callback, isLinkWallet = false } = params || {}
    setParams({
      callback,
      isLinkWallet,
    })
    await open({ view: 'Connect' })
    setClicked(true)
  }

  return (
    <WalletConnectModalContext.Provider value={{ openWalletConnectModal }}>
      {children}
    </WalletConnectModalContext.Provider>
  )
}
