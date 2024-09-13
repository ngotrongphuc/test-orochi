import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'
import AppFooter from '../../components/layouts/app-footer'
import Cursor from '@/components/cursor'
import { cn } from '@/lib/utils'
import Script from 'next/script'

export default function OrosignPrivacy() {
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
      <div>
        <main>
          <div className='mx-auto p-6 md:max-w-[1440px]'>
            <BlockEdge />
            <div className='rounded-3xl bg-blue-100 '>
              <h2 className='px-6 py-9 text-center text-lg font-semibold capitalize md:max-w-none md:gap-10 md:p-3 md:text-4xl'>
                Orosign Privacy Policy
              </h2>
              <h3 className='md:text-xl text-center text-md font-semibold capitalize'>
                Effective Date: 26 Mar 2024
              </h3>
              <div className='px-6 py-6 leading-8'>
                <div className='font-semibold'>
                  Orosign &#40; &quot;we, &quot; &quot;us, &quot; or &quot;our
                  &quot;&#41; operates the Orosign mobile application &#40;the
                  &#40;Service&#41;. This page informs you of our commitment to
                  your privacy as Orosign does not collect any personal data
                  from users.
                </div>
                <p className='py-2 font-semibold'>We Respect Your Privacy</p>
                <p>
                  Orosign is designed to function without collecting any
                  personal information about you. You can use our app with
                  complete confidence that your data privacy is respected.
                </p>
                <p className='py-2 font-semibold'>Information Not Collected</p>
                <p>
                  Orosign does not collect any of the following types of data:
                </p>
                <ul>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    Email address
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    Username Device information (type, model, operating system)
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    Usage data (how you interact with the Service) Location data
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    Contact information Transparency and Trust
                  </li>
                </ul>
                <p>
                  We believe in transparency and trust. This policy clarifies
                  that Orosign operates without user data collection.
                </p>
                <p className='py-2 font-semibold'>Security Disclaimer</p>
                <p>
                  While Orosign itself doesn&#39;t collect data, some standard
                  data transmission practices might occur through your device or
                  app store during download or use. We recommend consulting the
                  privacy policies of your device manufacturer and app store for
                  more details on their data handling practices.
                </p>
                <p className='py-2 font-semibold'>
                  Disclaimer: You Hold Your Private Keys
                </p>
                <p>
                  Orosign functions as a non-custodial wallet. This means you
                  are solely responsible for managing your private key. Your
                  private key grants access to your digital assets stored on the
                  blockchain. Orosign cannot recover your digital assets if you
                  lose or forget your private key.
                </p>
                <p>
                  It is crucial to back up your private key securely and keep it
                  confidential. Losing your private key will result in permanent
                  loss of access to your digital assets.
                </p>
                <p className='py-2 font-semibold'>
                  Changes to This Privacy Policy
                </p>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page.
                </p>
                <p className='py-2 font-semibold'>Contact Us</p>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                  <a href='mailto: contact@orochi.network'>
                    contact@orochi.network
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
        <AppFooter />
        <Cursor />
      </div>
    </>
  )
}

function BlockEdge({ reverse }: { reverse?: boolean }) {
  return (
    <div
      className={cn(
        'grid h-32 max-h-[40px] grid-cols-[40px,1fr,40px] md:max-h-[80px] md:grid-cols-[80px,1fr,80px]',
        reverse && 'rotate-180',
      )}
    >
      <div className='relative aspect-square rounded-br-xl bg-white before:absolute before:inset-0 before:-z-10 before:bg-blue-100 md:rounded-br-3xl' />
      <div className='rounded-tl-xl rounded-tr-xl bg-blue-100 md:rounded-tl-3xl md:rounded-tr-3xl'></div>
      <div className='relative aspect-square rounded-bl-xl bg-white before:absolute before:inset-0 before:-z-10 before:bg-blue-100 md:rounded-bl-3xl' />
    </div>
  )
}
