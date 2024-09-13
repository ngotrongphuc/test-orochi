import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'
import AppFooter from '../../components/layouts/app-footer'
import Cursor from '@/components/cursor'
import { cn } from '@/lib/utils'
import Script from 'next/script'

export default function PrivacyPolicy() {
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
                Orochi Network Privacy Policy
              </h2>
              <h3 className='md:text-xl text-center text-md font-semibold capitalize'>
                Effective Date: 26 Mar 2024
              </h3>
              <div className='px-6 py-6 leading-8'>
                <div className='font-semibold'>
                  This Privacy Policy describes how Orochi Network &#40;
                  &quot;we, &quot; &quot;us, &quot; or &quot;our &quot;&#41;
                  collects, uses, and discloses your information in connection
                  with your use of the Orochi Network Services &#40;the
                  &quot;Services&quot;&#41;.
                </div>
                <p className='py-2 font-semibold'>Information We Collect</p>
                <p>
                  We collect the following information when you use the
                  Services:
                </p>
                <ul>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p style={{ fontWeight: 'bold' }}>Personal Information:</p>
                    <p>
                      We may collect personal information that can identify you,
                      such as your name, email address, and IP address. We only
                      collect this information if you choose to provide it to
                      us, for example, by contacting us through the Services.
                    </p>
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <span style={{ fontWeight: 'bold' }}>Usage Data:</span>
                    <p>
                      We may collect usage data about your interactions with the
                      Services, such as the pages you visit, the features you
                      use, and the time you spend on the Services. This data is
                      collected anonymously and does not identify you
                      personally.
                    </p>
                  </li>
                </ul>

                <p className='py-2 font-semibold'>
                  How We Use Your Information
                </p>

                <p>
                  We use the information we collect for the following purposes:
                </p>

                <ul>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p>To provide and operate the Services</p>
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p>To improve the Services and develop new features</p>
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p>
                      To send you information about Orochi Network, such as
                      announcements and updates
                    </p>
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p>To comply with legal and regulatory obligations</p>
                  </li>
                </ul>

                <p className='py-2 font-semibold'>
                  Disclosure of Your Information
                </p>
                <p>
                  We may disclose your information to third-party service
                  providers who help us operate the Services and provide us with
                  related services. These service providers are contractually
                  obligated to keep your information confidential and to use it
                  only for the purposes for which we disclose it to them.
                </p>
                <p>
                  We may also disclose your information if we are required to do
                  so by law or in the good faith belief that such disclosure is
                  necessary to comply with a court order, subpoena, or other
                  legal process.
                </p>
                <p className='py-2 font-semibold'>Your Choices</p>
                <p>
                  You can choose not to provide us with any personal
                  information. However, this may limit your ability to use
                  certain features of the Services. You can also opt out of
                  receiving marketing communications from us by following the
                  unsubscribe instructions in those communications.
                </p>
                <p className='py-2 font-semibold'>Data Security</p>
                <p>
                  We take reasonable steps to protect your information from
                  unauthorized access, disclosure, alteration, or destruction.
                  However, no internet transmission or electronic storage is
                  ever completely secure. We cannot guarantee the security of
                  your information.
                </p>
                <p className='py-2 font-semibold'>
                  Changes to this Privacy Policy
                </p>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  post any changes on the Services. You are advised to review
                  this Privacy Policy periodically for any changes.
                </p>

                <p className='py-2 font-semibold'>Contact Us</p>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at :
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
