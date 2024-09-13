import { Metadata } from 'next'

import Hero from './_components/hero'
import Intro from './_components/intro'
import Partners from './_components/partners'
import Research from './_components/research'
import Benefits from './_components/benefits'
import Highlights from './_components/highlights'
import HowToWork from './_components/how-to-work'
import Subscriber from '../_components/subscriber'
import ClientSpotlight from './_components/client-spotlight'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export const metadata: Metadata = {
  title: 'Orand',
}
export default function OrandPage() {
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
      <main>
        <Hero />
        <Partners />
        <Intro />
        <Highlights />
        <HowToWork />
        <Research />
        <Benefits />
        <ClientSpotlight />
        <Subscriber />
      </main>
    </>
  )
}
