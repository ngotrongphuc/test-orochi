import { Metadata } from 'next'
import Subscriber from '../_components/subscriber'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'
import Hero from './_components/hero'
import Cores from './_components/core'
import InformationAboutUs from './_components/information-about-us'

export const metadata: Metadata = {
  title: 'About Us',
}
export default function AboutUsPage() {
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
        <Cores />
        <InformationAboutUs />
        <Subscriber />
      </main>
    </>
  )
}
