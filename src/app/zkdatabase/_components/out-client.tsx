'use client'
import { GOOGLE_FORM_URL } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { OROCHI_DASHBOARD } from '@/configs/navigation'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

const OutClient = () => {
  const { toast } = useToast()
  return (
    <section className='container py-10 lg:py-20'>
      <div className='grid gap-10 container-fluid lg:grid-cols-2'>
        <div className='grid gap-6 lg:grid-rows-[minmax(0,1fr)_auto]'>
          <div className='lg:max-w-[444px]'>
            <h2 className='text-28 font-semibold md:text-35'>Our clients</h2>
            <p className='mt-6 text-14 text-neutral-600 md:text-18'>
              3,000+ installs and hundreds of zkApps powered by zkDatabase for
              Web3 data availability and correctness have been completed!
            </p>
          </div>

          <div className='hidden gap-2 lg:flex'>
            <Button
              className='flex w-full items-center justify-center py-4 text-center text-sm lg:size-32 lg:rounded-full'
              target='_blank'
              asLink
              href={OROCHI_DASHBOARD}
            >
              Start building
            </Button>
            <Button
              asLink
              href={GOOGLE_FORM_URL}
              target='_blank'
              intent='outline-black'
              className='flex w-full items-center justify-center gap-2 border border-neutral-300 py-3 text-center text-sm hover:border-neutral-600 md:p-1 lg:size-32 lg:rounded-full'
            >
              Talk to us
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className='grid gap-2 md:grid-cols-2'>
          {dataList.map((data, i) =>
            data !== null ? (
              <OurCard
                key={i}
                icon={data.icon}
                title={data.title}
                content={data.content}
              />
            ) : (
              <div key={i} className='hidden lg:block'></div>
            ),
          )}
        </div>
        <div className='flex flex-col gap-2 md:flex-row lg:hidden'>
          <Button
            className='w-full justify-center py-4 text-center text-sm lg:size-32 lg:rounded-full'
            target='_blank'
            asLink
            href={OROCHI_DASHBOARD}
          >
            Start building
          </Button>
          <Button
            asLink
            href={GOOGLE_FORM_URL}
            target='_blank'
            intent='outline-black'
            className='flex w-full items-center justify-center gap-2 border border-neutral-300 py-3 text-center text-sm hover:border-neutral-600 md:p-1 lg:size-32 lg:rounded-full'
          >
            Talk to us
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

const OurCard = ({
  icon,
  title,
  content,
}: {
  icon: string
  title: string
  content: string
}) => {
  return (
    <div className='flex flex-col content-start gap-4 rounded-24 bg-neutral-100 p-5'>
      <Image
        loading='lazy'
        src={icon}
        alt='icon'
        className='mx-auto size-12'
        width={0}
        height={0}
        sizes='100%'
      />
      <h3 className='text-center text-14 font-semibold text-neutral-800 lg:text-16'>
        {title}
      </h3>
      <p className='text-center text-12 text-neutral-600 lg:text-16'>
        {content}
      </p>
    </div>
  )
}

const dataList = [
  {
    icon: '/icons/our-client-1.png',
    title: 'Developers',
    content:
      'Delegate complex data management chores to us, so that you can concentrate on ideation and development',
  },
  {
    icon: '/icons/our-client-2.png',
    title: 'Enterprises',
    content:
      'We provide robust, secure, effective data management and storage system in the Web3 era',
  },
  {
    icon: '/icons/our-client-3.png',
    title: 'Institutions',
    content:
      'Get beyond the drawbacks of off-chain storage techniques for more dependable data access and processing',
  },
  null,
]

export default OutClient
