'use client'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'
import {
  useLoginMethodsStatusStore,
  useUserRewardStore,
  useXOroBalancesStore,
} from '@/stores'
import Script from 'next/script'
import { useEffect } from 'react'
import { CryptoWallets } from '../_components/sections/CryptoWallets'

export default function Page() {
  const { getLoginMethodsStatus } = useLoginMethodsStatusStore()
  const { getUserReward } = useUserRewardStore()
  const { getXOroBalances } = useXOroBalancesStore()

  useEffect(() => {
    getLoginMethodsStatus()
    getUserReward()
    getXOroBalances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <CryptoWallets />
      </main>
    </>
  )
}
