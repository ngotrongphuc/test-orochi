import { queryMe } from '@/lib/graphql/queries'
import { ProfileSetting } from './_components/sections/ProfileSetting'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const meData = await queryMe()
  if (meData && 'error' in meData) {
    throw new Error('No profile')
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
        <ProfileSetting data={meData.data} />
      </main>
    </>
  )
}
