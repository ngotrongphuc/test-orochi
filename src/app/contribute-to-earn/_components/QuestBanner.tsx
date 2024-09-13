import { questBanner } from '@/images/contribute-to-earn'
import Image from 'next/image'

const QuestBanner = () => {
  return (
    <div className='relative'>
      <Image
        alt='quest-banner'
        src={questBanner.default.src}
        width={1394}
        height={287}
        className='h-[285px] w-full rounded-t-3xl object-cover md:object-fill'
      />
      <div className='absolute inset-0 flex-col place-self-center justify-self-center text-center flex-center'>
        <div className='rounded-[40px] px-8 py-3 sm:bg-white'>
          <Image alt='orochi-logo' src='/logo.webp' width={115} height={36} />
        </div>
        <div>
          <h4 className='py-4 text-23 font-semibold text-neutral-800 md:text-3xl'>
            Most Wanted XORO V2 - The Gateway to $ORC
          </h4>
          <p className='px-4 text-16 text-neutral-800 md:text-md'>
            Seize the Opportunity:
            <br className='block md:hidden' /> Participate, Earn, Upgrade.{' '}
            <br className='hidden md:block' />
            XORO V2 will be swapped directly to Orochi Native Token
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuestBanner
