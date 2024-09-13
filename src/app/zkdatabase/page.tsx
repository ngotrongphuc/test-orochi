import { Metadata } from 'next'

import Hero from './_components/hero'
import About from './_components/about'
import OutClient from './_components/out-client'
import Subscriber from '../_components/subscriber'
import TradeStorage from './_components/trade-storage'
import Transformation from './_components/tranformation'
import ZKDatabaseApp from './_components/zkdatabase-app'
import EnjoyZKP from './_components/enjoy-zkp'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export const metadata: Metadata = {
  title: 'zkDatabase',
}
export default function ZKDatabasePage() {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src={GOOGLE_TAG_MANAGER_URL}
        strategy='afterInteractive'
      ></Script>
      <Script
        dangerouslySetInnerHTML={SCRIPT_INNER_HTML}
        strategy='afterInteractive'
        id='gtag-init'
      />
      <main className='w-full'>
        <Hero />
        <About />
        <Transformation />
        <ZKDatabaseApp />
        <TradeStorage />
        <EnjoyZKP />
        <OutClient />
        <Subscriber className='bg-red-50' />
      </main>
    </>
  )
}
