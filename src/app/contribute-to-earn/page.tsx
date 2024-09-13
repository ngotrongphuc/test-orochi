import About from './_components/About'
import { Guide } from './_components/Guide'
import { Hero } from './_components/Hero'
import { LeaderBoard } from './_components/LeaderBoard'
import SetUsernamePopup from './_components/SetUsernamePopup'
import CloseWarningPopup from './_components/CloseWarningPopup'
import ConnectAccountPopup from './_components/ConnectAccountPopup'
import WalletConnectPopup from './_components/WalletConnectPopup'
import SuccessfulPopup from './_components/SuccessfulPopup'
import { PartnersLine } from './_components/PartnersLine'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Retroactive',
}
const Quest = dynamic(() => import('./_components/Quest'), {
  ssr: false,
  //TODO: When you have loading component replace it here
  loading: () => <p>Loading...</p>,
})
export default function RetroactivePage() {
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
        <PartnersLine />
        <Quest />
        <Guide />
        <LeaderBoard />
        <About />
        <SetUsernamePopup />
        <CloseWarningPopup />
        <ConnectAccountPopup />
        <WalletConnectPopup />
        <SuccessfulPopup />
      </main>
    </>
  )
}
