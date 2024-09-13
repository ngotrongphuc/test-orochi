// import { ProfileSetting } from './_components/sections/ProfileSetting'

import { Referral } from '../_components/sections/Referral'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export default function Page({ params }: { params: { slug: string } }) {
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
      <main className='flex w-full'>
        <Referral />
      </main>
    </>
  )
}
