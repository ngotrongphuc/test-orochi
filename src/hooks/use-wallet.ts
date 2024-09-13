'use client'
import { toast } from '@/components/ui/use-toast'
import { mutateLinkWallet } from '@/lib/graphql/mutations'
import { queryLinkingWalletMessageWithNonce } from '@/lib/graphql/queries'
import { WalletLoginMethod } from '@/lib/graphql/type'
import { hexer } from '@/utils'
import { ServiceSpider } from '@orochi-network/jrpc'
import { signIn, SignInResponse } from 'next-auth/react'
import { useWriteContract } from 'wagmi'
import { AbiXORO, XORO } from '@orochi-network/contracts'

const TOAST_DURATION = 5000

const DEFAULT_TOKEN_INFO = {
  type: 'ERC20',
  options: {
    address: '0x010be239991c1ef5a26ee32ed9af4b5eb449ee54',
    symbol: 'XORO',
    decimals: 0,
    image:
      'https://orochi-storage.sgp1.cdn.digitaloceanspaces.com/metadata/x-oro.png',
  },
}

export const useWallet = () => {
  const { writeContractAsync } = useWriteContract()

  const handleLogin = async (
    wallet: EIP6963ProviderDetail,
    method: WalletLoginMethod,
  ): Promise<SignInResponse | undefined> => {
    const address = await wallet.provider.request({
      method: 'eth_requestAccounts',
    })
    if (Array.isArray(address) && address[0]) {
      const { message, nonceSessionUuid } =
        await queryLinkingWalletMessageWithNonce()
      if (!message || !nonceSessionUuid) {
        throw new Error(
          'Something error while get link wallet message with nonce to login',
        )
      }
      const hex = hexer(message)
      const signature = await wallet.provider.request({
        method: 'personal_sign',
        params: [hex, address[0]],
      })
      if (!signature || typeof signature !== 'string') {
        throw new Error('Error when create signature')
      }
      const response = await signIn('credentials', {
        address: address[0],
        nonceSessionUuid,
        signature,
        loginMethod: method,
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
      return response
    }
  }

  const handleConnect = async (
    wallet: EIP6963ProviderDetail,
    method: WalletLoginMethod,
  ): Promise<boolean | undefined> => {
    try {
      const address = await wallet.provider.request({
        method: 'eth_requestAccounts',
      })
      if (Array.isArray(address) && address[0]) {
        const { message, nonceSessionUuid } =
          await queryLinkingWalletMessageWithNonce()
        if (!message || !nonceSessionUuid) {
          throw new Error(
            'Something error while get link wallet message with nonce to connect',
          )
        }
        const hex = hexer(message)
        const signature = await wallet.provider.request({
          method: 'personal_sign',
          params: [hex, address[0]],
        })
        if (!signature || typeof signature !== 'string') {
          throw new Error('Error when create signature')
        }
        const response = await mutateLinkWallet({
          nonceSessionUuid,
          signature,
          address: address[0],
          walletProvider: method,
        })
        if (response && 'error' in response) {
          toast({
            message: response.error,
            variant: 'error',
            duration: TOAST_DURATION,
          })
        }
        return 'data' in response && response.data
      }
    } catch (error) {
      toast({
        message: error instanceof Error ? error.message : 'Link wallet error',
        variant: 'error',
        duration: TOAST_DURATION,
      })
    }
  }

  const handleAddNetwork = async (
    rpc: ServiceSpider.TListRpcRecord,
    setSelectRpc: React.Dispatch<
      React.SetStateAction<ServiceSpider.TListRpcRecord | undefined>
    >,
  ) => {
    try {
      // this is testnet
      // when this go live add the required field to change the network
      // https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
      // could improve by using try switch and add in catch block
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: decimalToHex(rpc.chainId.toString()) }],
      })
    } catch (error) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: decimalToHex(rpc.chainId.toString()),
            chainName: rpc.networkName,
            rpcUrls: [rpc.url],
            nativeCurrency: {
              name: rpc.networkName,
              symbol: rpc.currency,
              decimals: rpc.decimals,
            },
            blockExplorerUrls: rpc.explorers?.map((item) => item.url),
          },
        ],
      })
    }
  }
  const handleAddToken = async () => {
    // this use to add token to user metamask wallet
    // when you add it you can get the balance from user wallet and don't need backend
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: DEFAULT_TOKEN_INFO.type,
          options: {
            address: DEFAULT_TOKEN_INFO.options.address,
            symbol: DEFAULT_TOKEN_INFO.options.symbol,
            decimals: DEFAULT_TOKEN_INFO.options.decimals,
            image: DEFAULT_TOKEN_INFO.options.image,
          },
        },
      })
    } catch (error) {
      throw new Error('Add token fail')
    }
  }

  const handleSignMessage = async ({
    signedPayload,
  }: {
    signedPayload: string
  }) => {
    try {
      // for now contract address is a constant
      const CONTRACT_ADDRESS = '0x010be239991C1ef5A26ee32Ed9af4B5eb449ee54'
      const result = await writeContractAsync({
        abi: AbiXORO,
        address: CONTRACT_ADDRESS,
        functionName: 'redeem',
        args: [signedPayload],
      })
      if (!result) {
        throw new Error('Sign message failed')
      }
      return result
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Sign message failed',
      )
    }
  }
  return {
    handleLogin,
    handleConnect,
    handleAddNetwork,
    handleAddToken,
    handleSignMessage,
  }
}

export const decimalToHex = (decimalBalance: string): string => {
  if (!decimalBalance) {
    throw new Error('The decimal not exist')
  }
  const balance = parseFloat(decimalBalance)
  if (isNaN(balance)) {
    throw new Error('Input must be a valid decimal string')
  }
  const hexBalance = balance.toString(16)
  return `0x${hexBalance}`
}
