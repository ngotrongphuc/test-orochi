'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import { Pattern } from '@/app/_components/banner'
import { zklogo } from '@/images/zkdatabase'

const Hero = () => {
  const { toast } = useToast()
  return (
    <section id='hero' className='transition-colors duration-300 mx-auto max-w-[1440px] overflow-x-hidden px-2 pt-4 lg:h-auto lg:px-6 pb-20'>
      <div className='relative h-full rounded-40 bg-zkdatabase-hero overflow-hidden'>
        <div className='lg:h-60 w-full'>
          <Pattern />
          <Pattern reverse />
        </div>
        <div className='w-full lg:grid lg:grid-cols-2 lg:ml-10 flex flex-col pb-30 z-10 px-2 pt-6 lg:pt-0'>
          {/* left */}
          <div className='flex flex-col gap-6 mx-auto z-10 justify-center items-center lg:justify-normal lg:items-start w-full lg:w-auto'>
            <div className='w-fit flex items-center gap-2 bg-white/70 border-white/30 px-6 py-2 rounded-3xl'>
              <Image alt='orocle logo' src={zklogo.default.src} width={25.6} height={25.6} />
              <p className='font-bold text-18'>zkDatabase</p>
            </div>
            <h2 className='font-semibold text-35 lg:text-55 text-neutral-800 text-center lg:text-start'>
              Provable Data <br/>
              For Everything
            </h2>
            <p className='text-16 lg:text-18 font-normal text-neutral-600 text-center lg:text-start'>
              zkDatabase is the world first Verifiable Data Pipeline for <br/>
              any Smart Contract Platforms, dApps and zkApps
            </p>
            {/* desktop */}
            <div className='lg:flex flex-col gap-2 justify-center hidden'>
              <div className='flex gap-2 flex-wrap justify-center'>
                <div className='px-4 py-2 rounded-full text-16 animate-color-3 hero-tag'>
                  zkApps
                </div>
                <div className='px-8 py-2 rounded-full text-16 animate-color-0 hero-tag'>
                  zkML
                </div>
                <div className='px-4 py-2 rounded-full text-16 animate-color-4 hero-tag'>
                  dApps
                </div>
                <div className='p-2 rounded-full text-16 animate-color-7 hero-tag'>
                  Blockchain Platform
                </div>
              </div>
              <div className='flex gap-2 flex-wrap justify-center'>
                <div className='px-8 py-2 rounded-full text-16 animate-color-5 hero-tag'>
                  zkID
                </div>
                <div className='px-4 py-2 rounded-full text-16 animate-color-6 hero-tag'>
                  Gaming
                </div>
                <div className='p-2 rounded-full text-16 animate-color-1 hero-tag'>
                  Privacy Preserving
                </div>
                <div className='px-4 py-2 rounded-full text-16 animate-color-2 hero-tag'>
                  zkWallet
                </div>
              </div>
            </div>
            {/* mobile */}
            <div className='flex flex-col gap-2 justify-center md:hidden'>
              <div className='flex gap-2 flex-wrap justify-center'>
                <div className='px-4 py-2 rounded-full text-16 animate-color-3 hero-tag'>
                  zkApps
                </div>
                <div className='px-8 py-2 rounded-full text-16 animate-color-0 hero-tag'>
                  zkML
                </div>
                <div className='px-4 py-2 rounded-full text-16 animate-color-4 hero-tag'>
                  dApps
                </div>
              </div>
              <div className='flex gap-2 flex-wrap justify-center'>
                <div className='p-2 rounded-full text-16 animate-color-7 hero-tag'>
                  Blockchain Platform
                </div>
                <div className='px-8 py-2 rounded-full text-16 animate-color-5 hero-tag'>
                  zkID
                </div>
              </div>
              <div className='flex gap-2 justify-center'>
                <div className='p-2 rounded-full text-16 animate-color-6 hero-tag'>
                  Gaming
                </div>
                <div className='p-2 rounded-full text-16 animate-color-1 hero-tag'>
                  Privacy Preserving
                </div>
                <div className='p-2 rounded-full text-16 animate-color-2 hero-tag'>
                  zkWallet
                </div>
              </div>
            </div>
            <div className='mt-4 flex flex-wrap gap-4 items-center z-10'>
              <Button
                icon={<ArrowRight size={20} />}
                className='w-full justify-center md:w-auto font-medium md:text-xl text-sm px-8'
                onClick={() => {
                  toast({
                    message: 'Coming soon! Subscribe us to get update!',
                    variant: 'comingSoon',
                  })
                }}
              >
                GET STARTED
              </Button>
            </div>
          </div>
          {/* right */}
          <div className='flex flex-col lg:items-end justify-center lg:absolute w-full h-60 lg:h-full items-center lg:top-20 xl:top-0 lg:right-35 xl:right-50'>
            <div className='skew-y-[35deg] rotate-[120deg] flex flex-col justify-center items-center flex-shrink-0 xl:w-73 xl:h-73 md:w-50 md:h-50 w-40 h-40 rounded-2xl xl:rounded-40 border border-white bg-white/10 backdrop-blur-3xl absolute bottom-35 lg:top-60 z-30'>
              <Image alt='orocle logo' src={zklogo.default.src} width={50} height={50} className='rotate-90' />
            </div>
            <div className='skew-y-[35deg] rotate-[120deg] flex flex-col justify-center items-center flex-shrink-0 xl:w-73 xl:h-73 md:w-50 md:h-50 w-40 h-40 rounded-2xl xl:rounded-40 border border-white bg-white/30 backdrop-blur-3xl absolute bottom-20 lg:top-80 z-10'/>
            <div className='skew-y-[35deg] rotate-[120deg] flex flex-col justify-center items-center flex-shrink-0 xl:w-73 xl:h-73 md:w-50 md:h-50 w-40 h-40 rounded-2xl xl:rounded-40 border border-white bg-tint-white-70 backdrop-blur-3xl absolute bottom-5 lg:top-100 z-0'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero