import Image from 'next/image'

import {
  AppleLogo,
  ArrowRight,
  GooglePlayLogo,
} from '@phosphor-icons/react/dist/ssr'

import { Button } from './ui/button'
import { TypingText } from './typing-text'

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] pt-5">
      <div className="relative grid h-20 w-full grid-cols-[128px,1fr,128px] px-2 before:absolute before:-bottom-[600px] before:left-2 before:right-2 before:-z-10 before:hidden before:h-[600px] before:bg-blue-200 md:h-40 md:grid-cols-[252px,1fr,252px] md:px-6 before:md:left-6 before:md:right-6 md:before:block">
        <div className="relative h-full">
          <Image alt="hero-pattern-left" src="/images/hero-pattern-left.svg" fill />
        </div>

        <div className="-mx-2 rounded-tl-xl rounded-tr-xl bg-blue-200 md:-mx-3" />

        <div className="relative h-full">
          <Image alt="hero-pattern-right" src="/images/hero-pattern-right.svg" fill />
        </div>
      </div>

      <div className="mx-2 rounded-bl-2xl rounded-br-2xl bg-blue-200 md:mx-6 md:bg-transparent">
        <div className="grid-cols-[252px,1fr,252px] md:grid">
          <div />
          <h2 className="relative bg-blue-200 px-4 text-center text-3xl font-semibold md:mx-auto md:-mt-24 md:text-5xl">
            zkOS for Web3
            <br />
            Secured Scaling
            <br />
            <TypingText className="text-left text-red-500" />
          </h2>
          <div />
        </div>

        <div className="mt-5 grid aspect-[2/1] h-auto w-full grid-cols-3 justify-center gap-1 overflow-hidden bg-blue-200 px-3 md:max-h-96 md:grid-cols-[repeat(3,minmax(0,350px))] md:gap-5 md:pt-7">
          <div className="group relative mt-9 aspect-[1/2] transition-transform duration-300 hover:scale-[101%]">
            <div className="relative z-0 h-full w-full rounded-3xl group-hover:animate-border group-hover:bg-conic md:rounded-[40px]" />
            <div className="absolute inset-0.5 md:inset-1">
              <Image
                src="/images/phone-screen1.png"
                alt="phone-screen1"
                width={230}
                height={110}
                className="w-full rounded-[22px] md:rounded-[36px]"
              />
            </div>
          </div>

          <div className="group relative aspect-[1/2] transition-transform duration-300 hover:scale-[101%]">
            <div className="relative z-0 h-full w-full rounded-3xl group-hover:animate-border group-hover:bg-conic md:rounded-[40px]" />
            <div className="absolute inset-0.5 md:inset-1">
              <Image
                src="/images/phone-screen2.png"
                priority
                alt="phone-screen2"
                width={230}
                height={110}
                className="w-full rounded-[22px] md:rounded-[36px]"
              />
            </div>
          </div>

          <div className="group relative mt-9 aspect-[1/2] transition-transform duration-300 hover:scale-[101%]">
            <div className="relative z-0 h-full w-full rounded-3xl group-hover:animate-border group-hover:bg-conic md:rounded-[40px]" />
            <div className="absolute inset-0.5 md:inset-1">
              <Image
                src="/images/phone-screen3.png"
                alt="phone-screen3"
                width={230}
                height={110}
                className="w-full rounded-[22px] md:rounded-[36px]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 grid gap-4 overflow-hidden rounded-2xl bg-blue-200 px-8 pb-6 pt-4 md:gap-6 md:py-6">
          <div
            style={{
              background:
                'radial-gradient(at center top, #51A3F0 1%, #89A5BD, #DFEEFA 80%)',
              filter: 'blur(50px)',
            }}
            className="absolute inset-0 -z-10 rounded-2xl backdrop-blur-sm md:rounded-none"
          />

          <p className="mx-auto max-w-[864px] text-center font-semibold text-white md:text-lg">
            Orochi Network is the operating system for Web3 powered by
            Cryptography, Zero Knowledge Proof and Multi Party Computation.
          </p>

          <div className="grid grid-cols-2 justify-center gap-2 md:grid-cols-[repeat(2,180px)]">
            <Button
              asLink
              href="#subscriber"
              intent="white"
              className="text-center "
            >
              Talk to us
            </Button>
            <Button
              icon={<ArrowRight size={16} />}
              className="justify-center p-0"
            >
              Get Started
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-neutral-600">
            <span className="mr-0.5 text-md">Available on</span>
            <AppleLogo size={20} weight="fill" />
            <GooglePlayLogo size={20} weight="fill" />
          </div>
        </div>
      </div>
    </section>
  )
}
