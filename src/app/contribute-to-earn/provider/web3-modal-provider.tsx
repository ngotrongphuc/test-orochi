'use client'

import React, { ReactNode, useState } from 'react'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { State, WagmiProvider } from 'wagmi'
import { metadata, projectId } from '@/configs/web3Config'
import { config } from './rainbow-kit-provider'

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

export default function WagmiWrapper({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  const [configWallet] = useState(() => {
    return config
  })
  return (
    <WagmiProvider config={configWallet} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}
