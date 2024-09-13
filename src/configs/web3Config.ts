import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// 1. Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.PROJECT_ID || ''

// 2. Set chains
export type Chain = {
  rpcUrl: string
  explorerUrl: string
  currency: string
  name: string
  chainId: number
}

const CHAIN_LIST: Chain[] = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  {
    chainId: 56,
    name: 'BNB Smart Chain',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com/',
    rpcUrl: 'https://binance.llamarpc.com',
  },
  {
    chainId: 42161,
    name: 'Arbitrum One',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io/',
    rpcUrl: 'https://arbitrum.llamarpc.com',
  },
]

const defaultChain = CHAIN_LIST.find((chain) => chain.chainId === 1)

// 3. Create a metadata object
export const metadata = {
  name: 'Orochi Network',
  description:
    'Orochi Network applies Cryptography, ZKP, Multi Party Computation to create secure and scalable solutions for Blockchain, dApps, zkApps, Data, Custody, Computation and Daily life.',
  url: 'https://www.orochi.network', // origin must match your domain & subdomain
  icons: ['https://www.orochi.network/_next/image?url=%2Flogo.webp&w=128&q=75'],
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})