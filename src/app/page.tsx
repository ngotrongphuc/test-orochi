import Cursor from '@/components/cursor'

import Blogs from './_components/blogs'
import Banner from './_components/banner'
import Metrics from './_components/metrics'
import Features from './_components/features'
import Community from './_components/community'
import GrantedBy from './_components/granted-by'
import Subscriber from './_components/subscriber'
import ProductHighlights from './_components/product-highlights'
import PartnersAndBackers from './_components/partners-and-backer'
import { bigBanner, campaignBanner } from '../../public/images'
import Image from 'next/image'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

const PROMOTION_LINK = [
  'https://x.com/OrochiNetwork/status/1796145377550512180',
  'https://eprint.iacr.org/2024/336',
]

export default function Home() {
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
        <Banner />
        <GrantedBy />
        <PromotionTop />
        <ProductHighlights />
        <Metrics />
        <Features />
        <PromotionBottom />
        <PartnersAndBackers />
        <Community />
        <Blogs />
        <Subscriber />
      </main>
      <Cursor />
    </>
  )
}

function PromotionTop() {
  return (
    <a
      href={PROMOTION_LINK[0]}
      aria-label='promotion-top'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image
        loading='lazy'
        alt='campaign-banner'
        src={campaignBanner.default.src}
        className='h-[94px] w-full object-cover object-center md:h-auto'
        width={0}
        height={0}
        sizes='100%'
      />
    </a>
  )
}

function PromotionBottom() {
  return (
    <a href={PROMOTION_LINK[1]} target='_blank' aria-label='promotion-bottom'>
      <Image
        loading='lazy'
        alt='banner-big'
        src={bigBanner.default.src}
        className='h-[211px] w-full cursor-pointer object-cover object-center lg:h-auto'
        width={0}
        height={0}
        sizes='100%'
      />
    </a>
  )
}
