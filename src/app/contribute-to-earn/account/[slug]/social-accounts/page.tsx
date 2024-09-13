// import { ProfileSetting } from './_components/sections/ProfileSetting'
import { queryLoginMethodsStatus } from '@/lib/graphql/queries'
import { SocialAccount } from '../_components/sections/SocialAccount'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await queryLoginMethodsStatus()
  if (!result) {
    throw new Error('Fail to get login method status')
  }
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
        <SocialAccount connectAccountStatus={result} />
      </main>
    </>
  )
}
