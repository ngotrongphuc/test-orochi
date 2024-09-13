'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { RAMenPaSTA_URL } from '@/configs/navigation'
import { bigBanner } from '@/images/orocle'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

const About = () => {
  const container = useRef<HTMLDivElement>(null)
  const scrollContainer = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (scrollContainer.current && container.current) {
        const containerHeight = container.current.clientHeight || 0
        const scrollValue =
          scrollContainer.current.clientHeight - (containerHeight - 256)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: true,
            start: 'top',
            end: 'bottom',
          },
        })
        tl.to(scrollContainer.current, {
          y: `-${Math.abs(scrollValue)}`,
          duration: 1,
          ease: 'none',
        })

        return () => {
          tl.kill()
        }
      }
    })
  })

  return (
    <>
      <section ref={container}>
        <div className='ml-2 py-10 lg:container lg:h-[calc(110vh-85px)] lg:overflow-hidden lg:py-20'>
          <div className='relative grid gap-y-6 container-fluid lg:h-full lg:grid-cols-[1fr_500px] lg:gap-x-36'>
            <div className='mr-2 flex max-h-[600px] flex-col justify-between py-6 lg:gap-30 lg:mt-10'>
              <div>
                <h2 className='text-23 font-semibold md:text-35'>
                  Support <br />
                  ZK-Data-Rollups Natively
                </h2>
                <p className='mt-6 text-14 text-neutral-600 md:text-18'>
                  zkDatabase establishes a decentralized network that performs
                  data proving on every steps of data processing to build the
                  first Verifiable Data Pipeline
                </p>
                <Button className='w-fit mt-6' icon={<ArrowRight size={20}/>}>
                  learn more
                </Button>
              </div>
              <SponsorCard />
            </div>

            <div className='relative hidden lg:block lg:h-full'>
              <div>
                <div
                  ref={scrollContainer}
                  className='top-0 grid gap-6 overflow-hidden md:grid-cols-2 lg:absolute lg:grid-cols-1'
                >
                  {cardList.map((card) => (
                    <Card
                      key={card.title}
                      src={card.src}
                      title={card.title}
                      description={card.description}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='relative overflow-x-scroll lg:hidden'>
              <div className='w-fit'>
                <div className='top-0 flex gap-6'>
                  {cardList.map((card) => (
                    <Card
                      key={card.title}
                      src={card.src}
                      title={card.title}
                      description={card.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Link
        href={RAMenPaSTA_URL}
        className='h-full w-full pb-10 lg:pb-20 justify-center flex'
        target='_blank'
      >
        <Image
          alt='big-banner'
          src={bigBanner.default.src}
          width={5068}
          height={1690}
          className='h-full w-full max-w-[1168px] bg-no-repeat object-contain'
        />
      </Link>
    </>
  )
}

const SponsorCard = () => {
  return (
    <div
      className='relative mt-5 flex max-h-[128px] w-full max-w-[400px] flex-col gap-4 self-start overflow-hidden rounded-24 p-6 lg:mt-0 lg:p-8'
      style={{ backgroundImage: `url('/images/zkdatabase/mina-card.png')` }}
    >
      <p className='text-16 font-semibold'>Backed by</p>
      <div className='h-10'>
        <Image
          loading='lazy'
          src='/images/mina.svg'
          alt='mina-logo'
          className='h-full w-auto object-cover'
          width={0}
          height={0}
          sizes='100%'
        />
      </div>
    </div>
  )
}

type CardProps = {
  title: string
  description: string
  src: string
}

const Card: FC<CardProps> = ({ title, description, src }) => {
  return (
    <>
      <div
        className='group relative aspect-[5/6] h-[400px] overflow-hidden rounded-24 px-6 md:rounded-40 md:px-10 md:py-2 lg:h-full lg:max-h-[600px] lg:p-10'
        style={{ backgroundImage: `url('/images/zkdatabase/content.png')` }}
      >
        <div className='absolute bottom-0 left-0 ml-5 h-1/2 w-1/2 lg:mb-10'>
          <Image
            loading='lazy'
            src={src}
            alt='card'
            height={500}
            width={200}
            className='h-full w-full object-contain'
          />
        </div>
        <h3 className='relative mt-10 text-18 font-semibold lg:text-28'>
          {title}
        </h3>
        <p className='relative mt-3 text-14 text-neutral-700 lg:text-16'>
          {description}
        </p>
        <Pattern />
      </div>
    </>
  )
}

const cardList = [
  {
    title: 'Verifiable Sampling',
    description:
      'The sampling process is verified with cryptography proof, providing the correctness for data from the input.',
    src: '/images/zkdatabase/card-1.png',
  },
  {
    title: 'Verifiable Processing',
    description:
      'Transforming raw data to structured data with cryptography proof turning the data to be even more valuable than ever before store them into immutable storage.',
    src: '/images/zkdatabase/card-2.png',
  },
  {
    title: 'Immutable Storage',
    description:
      'Lock in data integrity with commitment schemes. Guarantee tamper-proof storage and build trust with your users.',
    src: '/images/zkdatabase/card-3.png',
  },
  {
    title: 'Lookup Prover',
    description: 'Proving the existence of data recorded and lookup process.',
    src: '/images/zkdatabase/card-4.png',
  },
  {
    title: 'Transforming Prover',
    description:
      'Proving the data transformation, e.g: update data, changing structure.',
    src: '/images/zkdatabase/card-5.png',
  },
]

function Pattern() {
  return (
    <>
      <Image
        data-anim='screenPattern'
        loading='lazy'
        className='absolute bottom-0 right-0 hidden h-20 w-auto rotate-180 lg:block'
        src='/images/pattern/banner-left.png'
        alt='banner-left'
        width={0}
        height={0}
        sizes='100%'
      />

      <Image
        data-anim='screenPattern'
        loading='lazy'
        className='absolute bottom-0 left-0 hidden h-20 w-auto rotate-180 -scale-x-100 lg:block'
        src='/images/pattern/banner-left.png'
        alt='banner-left'
        width={0}
        height={0}
        sizes='100%'
      />
    </>
  )
}

export default About
