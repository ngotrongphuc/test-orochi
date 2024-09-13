'use client'
import Image from 'next/image'
import { Pattern } from '@/app/_components/banner'
import { dragonBanner } from '@/images/about'

const Hero = () => {
  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden px-2 pb-10 lg:pb-20 pt-4 md:px-6 lg:h-auto'>
      <div className='bg-about-hero relative overflow-hidden rounded-3xl lg:rounded-40'>
        <div className='w-full lg:h-60'>
          <Pattern />
          <Pattern reverse />
        </div>
        <div className='z-10 flex w-full flex-col px-2 pt-6 md:grid md:grid-cols-[1fr_300px] xl:grid-cols-[1fr_650px] pb-10 lg:pb-20 lg:pt-0'>
          <div className='z-10 md:ml-6 lg:ml-24 flex flex-col items-center justify-center gap-6 md:items-start md:justify-normal'>
            <h2 className='text-center text-35 font-semibold text-neutral-800 md:text-start lg:text-55'>
              About <br />
              Orochi Network
            </h2>
            <p className='text-center font-medium text-neutral-800/70 md:text-start text-16 leading-6'>
              At the heart of Orochi Network lies Zero-Knowledge Modular Data
              Availability Layer (ZK Modular DA Layer - zkMDAL).
              <br />
              <br />
              Our system leverages the power of Zero-Knowledge Proofs (ZKPs) to
              create a high-performance Verifiable Data Pipeline for AI/ML
              models, zkApps (Zero-Knowledge Applications), dApps (Decentralized
              Applications) and smart contract platforms.
            </p>
          </div>
          <div className='w-full h-full hidden md:block'>
            <Image
              src={dragonBanner.default.src}
              alt='dragon-banner'
              width={2800}
              height={30000}
              className='absolute h-full w-1/2 object-fill right-0 top-0 z-20 mix-blend-luminosity'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
