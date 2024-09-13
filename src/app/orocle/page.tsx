import { Metadata } from 'next'
import Hero from './_components/hero'
import Partners from './_components/partners'
import Benefits from './_components/benefits'
import Subscriber from '../_components/subscriber'
import ClientSpotlight from './_components/client-spotlight'
import HowToUse from './_components/how-to-use'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export const metadata: Metadata = {
  title: 'Orocle',
}
export default function OroclePage() {
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
        <Partners />
        {/* TODO: Waiting maketing update contents for this components */}
        {/* <HowToUse/> */}
        <Benefits />
        <ClientSpotlight />
        <Subscriber />
      </main>
    </>
  )
}
