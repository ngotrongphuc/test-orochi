import Cursor from '@/components/cursor'
import { cn } from '@/lib/utils'
import AppFooter from '../../components/layouts/app-footer'
import Script from 'next/script'
import { GOOGLE_TAG_MANAGER_URL, SCRIPT_INNER_HTML } from '@/configs/navigation'

export default function TermOfService() {
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
                Orochi Network Terms of Service
              </h2>
              <h3 className='md:text-xl text-center text-md font-semibold capitalize'>
                Effective Date: 26 Mar 2024
              </h3>
              <div className='px-6 py-6 leading-8'>
                <div className='font-semibold'>
                  These Terms of Service &#40;&quot;Terms&quot;&#41; govern your
                  access to and use of the Orochi Network dashboard &#40;
                  &quot;the Dashboard&quot;&#41;. By accessing or using the
                  Dashboard, you agree to be bound by these Terms. If you
                  disagree with any part of these Terms, you may not access or
                  use the Dashboard.
                </div>
                <p className='py-2 font-semibold'>Account Creation</p>
                <ul>
                  <li>
                    - To access certain features of the Dashboard, you may be
                    required to create an account. You are responsible for
                    maintaining the confidentiality of your account information,
                    including your username and password. You are also
                    responsible for all activity that occurs under your account.
                  </li>
                  <li>
                    - You agree to provide true, accurate, current, and complete
                    information when creating your account. You agree to update
                    your information promptly to keep it accurate.
                  </li>
                  <li>
                    - You may not use the Dashboard for any illegal or
                    unauthorized purpose. You may not use the Dashboard in a way
                    that could damage, disable, overburden, or impair the
                    Dashboard or interfere with another user&#39;s use and
                    enjoyment of the Dashboard.
                  </li>
                </ul>
                <ul>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <p style={{ fontWeight: 'bold' }}>User Content</p>
                    <p>
                      - You may be able to submit content to the Dashboard, such
                      as comments, feedback, or suggestions &#40;&quot;User
                      Content&quot;&#41;. You retain all ownership rights to
                      your User Content.
                    </p>
                    <p>
                      - By submitting User Content, you grant Orochi Network a
                      non-exclusive, royalty-free, worldwide license to use,
                      reproduce, modify, publish, distribute, and translate your
                      User Content for the purpose of operating and improving
                      the Dashboard.
                    </p>
                    <p>
                      - You are solely responsible for your User Content and
                      represent and warrant that you have the right to submit
                      such User Content. You agree not to submit any User
                      Content that is illegal, obscene, defamatory, threatening,
                      or otherwise violates these Terms.
                    </p>
                  </li>
                  <li style={{ listStyle: 'disc' }} className='mx-10'>
                    <span style={{ fontWeight: 'bold' }}>
                      Intellectual Property:
                    </span>
                    <p>
                      - The Dashboard and all content and materials on the
                      Dashboard, including but not limited to text, graphics,
                      logos, images, audio, video, and software, are the
                      property of Orochi Network or its licensors and are
                      protected by copyright, trademark, and other intellectual
                      property laws.
                    </p>
                    <p>
                      - You may not modify, publish, translate, reverse
                      engineer, decompile, disassemble, or create derivative
                      works from the Dashboard or any content or materials on
                      the Dashboard.
                    </p>
                  </li>
                </ul>

                <p className='py-2 font-semibold'>Disclaimers</p>

                <p>
                  - THE DASHBOARD IS PROVIDED &quot;AS IS&quot; AND WITHOUT
                  WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. OROCHI NETWORK
                  DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  - OROCHI NETWORK DOES NOT WARRANT THAT THE DASHBOARD WILL BE
                  UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE. OROCHI NETWORK DOES
                  NOT WARRANT THAT THE RESULTS THAT MAY BE OBTAINED FROM THE USE
                  OF THE DASHBOARD WILL BE ACCURATE OR RELIABLE.
                </p>

                <p className='py-2 font-semibold'>Limitation of Liability</p>
                <p>
                  - TO THE MAXIMUM EXTENT PERMITTED BY LAW, OROCHI NETWORK SHALL
                  NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
                  CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING
                  OUT OF OR RELATING TO YOUR USE OF THE DASHBOARD.
                </p>
                <p className='py-2 font-semibold'>Termination</p>
                <p>
                  Orochi Network may terminate your access to the Dashboard for
                  any reason, at any time, without notice.
                </p>
                <p>You may terminate your account at any time</p>
                <p className='py-2 font-semibold'>Governing Law</p>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of [insert jurisdiction], without regard to its
                  conflict of laws provisions.
                </p>
                <p className='py-2 font-semibold'>Entire Agreement</p>
                <p>
                  These Terms constitute the entire agreement between you and
                  Orochi Network with respect to your use of the Dashboard and
                  supersede all prior or contemporaneous communications and
                  proposals, whether oral or written.
                </p>
                <p className='py-2 font-semibold'>Amendment</p>
                <p>
                  Orochi Network may update these Terms from time to time. We
                  will post any changes on the Dashboard. You are advised to
                  review these Terms periodically for any changes.
                </p>

                <p className='py-2 font-semibold'>Contact Us</p>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
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
