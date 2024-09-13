'use client'

import Image from 'next/image'
import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { metrics1, metrics2, metrics3, metrics4 } from '@/images'
import { useRollingStore } from '@/stores/use-cursor-store'

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const firstSceneTextRef = useRef<HTMLDivElement>(null)
  const leftBlocksRef = useRef<Array<HTMLDivElement | null>>([])
  const rightBlocksRef = useRef<Array<HTMLDivElement | null>>([])
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  const { toggle } = useRollingStore()

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    let mm = gsap.matchMedia(),
      breakPoint = 768

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            pin: true,
            scrub: true,
            trigger: containerRef.current,
            start: 'top+=40 top',
            snap: [0, 0.4, 0.65, 1],
            end: context.conditions?.isDesktop ? 'bottom bottom-=2000' : '',
          },
        })

        tl.to(
          leftBlocksRef.current,
          {
            x: -300,
            rotate: -240,
            opacity: 0,
            duration: 70,
          },
          0,
        )
          .to(
            rightBlocksRef.current,
            {
              x: 300,
              rotate: 240,
              opacity: 0,
              duration: 70,
            },
            0,
          )
          .to(
            cardContainerRef.current,
            {
              width: '90%',
              duration: 70,
            },
            0,
          )
          .from(
            firstSceneTextRef.current,
            {
              y: 50,
              opacity: 0,
              duration: 70,
            },
            0,
          )
          .from(
            cardsRef.current.at(-1)!,
            {
              opacity: context.conditions?.isDesktop ? undefined : 0,
              y: context.conditions?.isDesktop ? undefined : -100,
              delay: 55,
              duration: 55,
            },
            0,
          )
          .to(
            cardsRef.current.at(-2)!,
            {
              borderBottomLeftRadius: context.conditions?.isDesktop
                ? undefined
                : 40,
              borderBottomRightRadius: context.conditions?.isDesktop
                ? undefined
                : 40,
              duration: 70,
            },
            0,
          )
          .to(
            cardsRef.current[0],
            {
              borderTopLeftRadius: context.conditions?.isDesktop
                ? undefined
                : 40,
              borderTopRightRadius: context.conditions?.isDesktop
                ? undefined
                : 40,
              duration: 70,
            },
            0,
          )

          .to(
            rightBlocksRef.current,
            {
              display: 'none',
            },
            70,
          )

          .to(
            textRef.current,
            {
              opacity: 0,
              y: 50,
              duration: 30,
            },
            70,
          )

          .to(
            cardsRef.current,
            {
              scale: context.conditions?.isDesktop ? 0.9 : 0.95,
              borderRadius: '40px',
              duration: 25,
            },
            100,
          )

          .fromTo(
            cardsRef.current.map((card) =>
              card?.querySelector('div:first-child'),
            ),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              onComplete: () => {
                toggle()
              },
              duration: 10,
            },
            115,
          )

        if (context.conditions?.isDesktop) {
          tl.add(() => {}, '+=50')
        }
      },
    )
  })

  return (
    <section
      ref={containerRef}
      className='mx-auto max-w-[1440px] pt-32 lg:overflow-hidden lg:px-6 lg:pt-48'
    >
      <div className='relative'>
        <div className='w-full md:h-[31.25rem] md:max-h-[25rem] lg:max-h-[31.25rem]'>
          <div
            ref={cardContainerRef}
            className='mx-auto grid grid-rows-4 px-2 md:h-full md:grid-cols-4 md:grid-rows-[minmax(0,1fr)]'
          >
            <div
              ref={(ref) => {cardsRef.current[0] = ref}}
              className='h-[234px] bg-blue-200 md:h-auto md:rounded-l-[40px]'
            >
              <div className='grid h-full gap-2 opacity-0 md:content-between'>
                <div className='grid grid-rows-[56px,auto] items-center justify-items-center gap-2 pt-4 md:grid-rows-[92px,auto] md:gap-6 md:pt-6 lg:pt-16'>
                  <Image
                    alt='metrics-image-1'
                    src={metrics1.default.src}
                    width={92}
                    height={92}
                    className='w-14 md:w-[64px] lg:w-[92px]'
                  />

                  <RollingParagraph className='max-h-[38px] overflow-hidden text-3xl font-semibold md:max-h-[66px] md:text-4xl lg:text-5xl'>
                    15ms
                  </RollingParagraph>
                </div>

                <p className='mx-auto flex-col justify-end px-5 text-center md:pb-6 lg:pb-[44px] lg:text-md'>
                  <span className='mb-1 block font-bold'>Orand</span>
                  <span className='text-sm lg:text-base'>
                    Verifiable randomness generation time with low cost on-chain
                    verification
                  </span>
                </p>
              </div>
            </div>

            <div
              ref={(ref) => {cardsRef.current[1] = ref}}
              className='h-[234px] bg-blue-200 md:block md:h-auto'
            >
              <div className='grid h-full gap-2 opacity-0 md:content-between'>
                <div className='grid grid-rows-[56px,auto] items-center justify-items-center gap-2 pt-4 md:grid-rows-[92px,auto] md:gap-6 md:pt-6 lg:pt-16'>
                  <Image
                    alt='metrics-image-2'
                    src={metrics2.default.src}
                    width={92}
                    height={92}
                    className='w-14 md:w-[64px] lg:w-[92px]'
                  />
                  <RollingParagraph className='max-h-[38px] overflow-hidden text-3xl font-semibold md:max-h-[66px] md:text-4xl lg:text-5xl'>
                    1000+
                  </RollingParagraph>
                </div>

                <p className='ax-w-[208px] mx-auto flex-col justify-end px-5 text-center md:pb-6 lg:pb-[44px] lg:text-md'>
                  <span className='mb-1 block font-bold'>Orocle</span>
                  <span className='text-sm lg:text-base'>
                    Support multiple pair <br className='hidden lg:block' />
                    with lowest average cost <br className='hidden lg:block' />
                    each pair
                  </span>
                </p>
              </div>
            </div>

            <div
              ref={(ref) => {cardsRef.current[2] = ref}}
              className='h-[234px]  bg-blue-200 md:h-auto'
            >
              <div className='grid h-full gap-2 opacity-0 md:content-between'>
                <div className='grid grid-rows-[56px,auto] items-center justify-items-center gap-2 pt-4 md:grid-rows-[92px,auto] md:gap-6 md:pt-6 lg:pt-16'>
                  <Image
                    alt='metrics-image-3'
                    src={metrics3.default.src}
                    width={92}
                    height={92}
                    className='lgale-110 w-14 md:w-[64px] lg:w-[92px]'
                  />

                  <RollingParagraph className='max-h-[38px] overflow-hidden text-3xl font-semibold md:max-h-[66px] md:text-4xl lg:text-5xl'>
                    10+
                  </RollingParagraph>
                </div>

                <p className='mx-auto flex-col justify-end px-5 text-center md:pb-6 lg:pb-[44px] lg:text-md'>
                  <span className='mb-1 block font-bold'>Orosign</span>
                  <span className='text-sm lg:text-base'>
                    Support multiple chains <br className='hidden lg:block' />
                    for simple customized <br className='hidden lg:block' />
                    smart contract
                  </span>
                </p>
              </div>
            </div>

            <div
              ref={(ref) => {cardsRef.current[3] = ref}}
              className='h-[234px]  rounded-[40px] bg-blue-200 md:h-auto md:rounded-none md:rounded-r-[40px]'
            >
              <div className='grid h-full gap-2 opacity-0 md:content-between'>
                <div className='grid grid-rows-[56px,auto] items-center justify-items-center gap-2 pt-4 md:grid-rows-[92px,auto] md:gap-6 md:pt-6 lg:pt-16'>
                  <Image
                    alt='metrics-image-4'
                    src={metrics4.default.src}
                    width={92}
                    height={92}
                    className='w-14 md:w-[64px] lg:w-[92px]'
                  />

                  <RollingParagraph className='max-h-[38px] overflow-hidden text-3xl font-semibold md:max-h-[66px] md:text-4xl lg:text-5xl'>
                    3000+
                  </RollingParagraph>
                </div>

                <p className='mx-auto flex-col justify-end px-5 text-center md:pb-6 lg:pb-[44px] lg:text-md'>
                  <span className='mb-1 block font-bold'>zkDatabase</span>

                  <span className='text-sm lg:text-base'>
                    Completed solution for <br className='hidden lg:block' />
                    Web3 data availability <br className='hidden lg:block' />
                    and correctness
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={(el) => {leftBlocksRef.current[0] = el}}
          className='absolute -top-8 left-5 aspect-square w-[126px] rounded-3xl bg-blue-500 md:-top-[53px] md:left-[60px] lg:-top-[16px] lg:left-[122px] lg:w-[184px]'
        />
        <div
          ref={(el) => {leftBlocksRef.current[1] = el}}
          className='absolute left-[18px] top-[115px] aspect-square w-[66px] rounded-xl bg-red-300 md:left-6 md:top-[118px] lg:left-[73px] lg:top-[195px] lg:w-[97px]'
        />
        <div
          ref={(el) => {leftBlocksRef.current[2] = el}}
          className='absolute left-[27px] top-[415px] aspect-square w-[47px] rounded-xl bg-red-400 md:bottom-[47px] md:left-20 md:top-[215px] md:w-[92px] lg:left-[260px] lg:top-[initial] lg:w-[128px]'
        />
        <div
          ref={(el) => {leftBlocksRef.current[3] = el}}
          className='absolute -left-[53px] top-[495px] aspect-square w-[168px] rounded-3xl bg-white md:-bottom-[3px] md:-left-[56px] md:top-[319px] lg:-left-6 lg:top-[initial]'
        />

        <p
          ref={textRef}
          className='absolute top-[245px] z-10 flex w-full flex-col justify-center px-8 text-center text-2xl font-semibold md:top-[132px] md:p-0 md:px-6 md:text-3xl lg:top-[182px] lg:text-5xl'
        >
          <span>Numeric Scaling</span>
          <span ref={firstSceneTextRef} className='mt-4 block'>
            Unleash Unmatched Performance
          </span>
        </p>

        <div
          ref={(el) => {rightBlocksRef.current[0] = el}}
          className='absolute -top-4 right-0 h-[121px] w-[106px] rounded-l-3xl bg-white md:top-0 md:h-[98px] md:w-[100px] md:rounded-bl-3xl md:rounded-tl-none lg:-right-6 lg:-top-[10px] lg:aspect-square lg:h-auto lg:w-[172px] lg:rounded-3xl'
        />
        <div
          ref={(el) => {rightBlocksRef.current[1] = el}}
          className='absolute right-[17px] top-[131px] aspect-square w-[47px] rounded-xl bg-red-400 md:right-[116px] md:top-10 md:w-[92px] lg:right-[228px] lg:top-[106px] lg:w-[112px]'
        />
        <div
          ref={(el) => {rightBlocksRef.current[2] = el}}
          className='absolute right-0 top-[355px] h-[120px] w-[108px] rounded-l-3xl bg-blue-500 md:top-[135px] md:h-[160px] md:w-[104px] lg:-right-[58px] lg:bottom-[72px] lg:top-[initial] lg:aspect-square lg:h-auto lg:w-[186px] lg:rounded-3xl'
        />
        <div
          ref={(el) => {rightBlocksRef.current[3] = el}}
          className='absolute right-[66px] top-[520px] aspect-square w-[59px] rounded-xl bg-red-300 md:bottom-4 md:right-[61px] md:top-[315px] md:w-[75px] lg:right-[147px] lg:top-[initial]'
        />
      </div>
    </section>
  )
}

function RollingParagraph({
  className,
  children,
}: {
  className?: string
  children: string
}) {
  const { roll } = useRollingStore()

  return (
    <div className={className}>
      <p className='flex'>
        {children.split('').map((c, index) => (
          <motion.span
            animate={roll && { y: '-100%' }}
            key={c}
            transition={{ delay: 0.075 * index, ease: 'easeOut' }}
            className='block'
          >
            {c}
          </motion.span>
        ))}
      </p>

      <p className='flex'>
        {children.split('').map((c, index) => (
          <motion.span
            animate={roll && { y: '-100%' }}
            key={c}
            transition={{ delay: 0.075 * index, ease: 'circInOut' }}
            className='block'
          >
            {c}
          </motion.span>
        ))}
      </p>
    </div>
  )
}
