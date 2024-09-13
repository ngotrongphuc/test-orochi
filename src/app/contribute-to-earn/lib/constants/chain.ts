'use client'
import { a8V2, bnbV2, ethV2, scrollV2, u2uV2 } from '@/images/contribute-to-earn/chains'
import { TChain } from '../types'

export const CHAINS: TChain[] = [
  {
    networkName: 'Ancient8 Testnet',
    icon: a8V2.default.src,
    chainId: 28122024,
    currency: 'A8',
  },
  {
    networkName: 'Unicorn Ultra Nebulas',
    icon: u2uV2.default.src,
    chainId: 2484,
    currency: 'U2U',
  },
  {
    networkName: 'BNB Chain Testnet',
    icon: bnbV2.default.src,
    chainId: 97,
    currency: 'BNB',
  },
  {
    networkName: 'Sepolia Testnet',
    icon: ethV2.default.src,
    chainId: 18,
    currency: 'ETH',
  },
  {
    networkName: 'ETH Mainnet',
    icon: ethV2.default.src,
    chainId: 1,
    currency: 'ETH',
  },
  {
    networkName: '"BNB Smart Chain"',
    icon: bnbV2.default.src,
    chainId: 56,
    currency: 'BNB',
  },
  {
    networkName: 'Scroll Chain Mainnet',
    icon: scrollV2.default.src,
    chainId: 534352,
    currency: 'Scroll',
  },
]
