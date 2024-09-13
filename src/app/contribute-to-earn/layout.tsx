import { Raleway } from 'next/font/google'

import AppFooter from '@/components/layouts/app-footer'

// import './globals.css'

import { getServerSession } from 'next-auth'
import RetroactiveHeader from './_components/layout/RetroactiveHeader'
import SessionProvider from './provider/session-provider'
import { ApolloWrapper } from './provider/apollo-provider'
import ModalWrapper from './provider/modal-provider'
import { RainbowKitWrapper } from './provider/rainbow-kit-provider'
import { cookieToInitialState } from 'wagmi'
import { headers } from 'next/headers'
import { config } from '@/configs/web3Config'
import { Web3ModalWrapper } from '../context/web3-context'
import WagmiWrapper from './provider/web3-modal-provider'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <WagmiWrapper initialState={initialState}>
      <SessionProvider session={session}>
        <RainbowKitWrapper>
          <ModalWrapper>
            <ApolloWrapper>
              <RetroactiveHeader />
              {children}
              {/* <AppFooter /> */}
            </ApolloWrapper>
          </ModalWrapper>
        </RainbowKitWrapper>
      </SessionProvider>
    </WagmiWrapper>
  )
}
