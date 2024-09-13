import Image from 'next/image'
import { ethereum, mina, web3Foundation } from '@/images'

const GRANTED_BY_URL = [
  'https://x.com/PrivacyScaling/status/1678800219620937730',
  'https://x.com/MinaProtocol/status/1643682998502473728',
  'https://github.com/w3f/Grant-Milestone-Delivery/pull/1007'
]

export default function GrantedBy() {
  return (
    <section className='mx-auto max-w-[1088px] grid-cols-[auto,minmax(0,1fr)] items-center justify-center px-6 py-10 md:py-20 lg:grid lg:gap-32'>
      <p className='flex-1 text-center text-sm text-neutral-600 lg:text-lg'>
        Granted by
      </p>

      <ul className='mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:m-0 lg:justify-between'>
        <a
          href={GRANTED_BY_URL[0]}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image alt='ethereum' src={ethereum.default.src} width={147} height={36} />
        </a>

        <a
          href={GRANTED_BY_URL[1]}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image alt='mina' src={mina.default.src} width={113} height={32} />
        </a>

        <a
          href={GRANTED_BY_URL[2]}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            alt='web3-foundation'
            src={web3Foundation.default.src}
            width={127}
            height={40}
          />
        </a>

        {/* <li>
          <Image alt='aleo' src='/images/aleo.svg' width={86} height={32} />
        </li> */}
      </ul>
    </section>
  )
}
