'use client'
import { Button } from '@/components/ui/button'
import {
  advantagesBanner,
  advantagesBanner2,
  advantagesBanner3,
  orochiLogo,
  sletterBanner,
} from '@/images/orocle'
import {
  ArrowRight,
  ArrowsOut,
  CaretDown,
  Plant,
  Rabbit,
} from '@phosphor-icons/react/dist/ssr'
import React, { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const advantagesData = {
  cost: [2560, 10496],
  teraFlops: [8.14, 35.58],
  memory: [16, 24],
}

const Advantages = () => {
  return (
    <section className='py-20 lg:h-auto'>
      <div
        style={{ backgroundImage: `url(${sletterBanner.default.src})` }}
        className='mb-20 h-65 w-full py-8 px-4 xs:py-10 xs:px-6 lg:px-10'
      >
        <div className='mx-auto max-w-[1440px] xs:px-6 lg:px-10 flex flex-col lg:flex-row h-full gap-6 lg:gap-0 lg:items-center lg:justify-between'>
          <div>
            <h4 className='mb-4 text-23 lg:text-35 font-semibold text-neutral-800'>
              Lorem ipsum dolor sit amet
            </h4>
            <p className='text-16 font-light text-black/70'>
              Orochi Network is the operating system for Web3 powered by Cryptography.
            </p>
          </div>
          <Button
            intent='white'
            className='w-fit'
            icon={<ArrowRight size={16} />}
          >
            learn more
          </Button>
        </div>
      </div>
      <div className='w-full px-2 lg:px-20 mx-auto max-w-[1440px] overflow-x-hidden'>
        <div className='mb-6 lg:mb-14 text-center'>
          <h4 className='mb-4 text-23 lg:text-35 font-semibold text-neutral-800'>
            [Advantages] Convallis nec
          </h4>
          <span className='text-16 lg:text-18 font-normal text-neutral-600'>
            This is the vision behind Orochi Network&apos;s Orocle service, a
            powerful tool poised <br />
            to revolutionize the way DApps interact with the external world.
          </span>
        </div>
        <div className='flex w-full flex-col gap-10 rounded-40 border border-neutral-200 py-6 px-4 lg:p-10 overflow-hidden lg:overflow-auto'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-20'>
            <div className='flex w-full lg:w-2/5 flex-col gap-4 lg:gap-6'>
              <h6 className='text-23 font-semibold text-neutral-800'>
                A Blockchain-Agnostic Solution
              </h6>
              <p className='text-16 font-normal text-neutral-600'>
                Orochi&apos;s Orocle shatters these limitations, offering a
                decentralized, secure, and versatile solution for feeding
                accurate and verifiable data into your DApps.
              </p>
              <Button
                intent='primary'
                className='w-fit'
                icon={<ArrowRight size={16} />}
              >
                get started
              </Button>
            </div>
            <div className='lg:ml-auto flex w-full lg:w-3/5'>
              <Table className='border-separate border-spacing-0'>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead className='rounded-tl-24 border-t border-x border-neutral-300'>
                      <div className='flex h-full w-full justify-center opacity-50'>
                        <Image
                          alt='orochi-logo'
                          src={orochiLogo.default.src}
                          width={100}
                          height={100}
                          className='mx-auto object-contain mix-blend-luminosity'
                        />
                      </div>
                    </TableHead>
                    <TableHead className='flex justify-center rounded-tr-24 border-t border-r border-neutral-300'>
                      <Image
                        alt='orochi-logo'
                        src={orochiLogo.default.src}
                        width={100}
                        height={100}
                        className='object-contain'
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow className='relative w-full'>
                    <TableCell className='rounded-tl-24 border-t border-l border-neutral-300'>
                      <div className='text-end text-14 lg:text-16 font-semibold text-neutral-800'>
                        Cost
                      </div>
                    </TableCell>
                    {advantagesData.cost.map((item, index) => (
                      <React.Fragment key={index}>
                        <TableCell 
                          className={cn(
                            'border-neutral-300 border-t',
                            index === advantagesData.memory.length - 1
                              ? 'border-r'
                              : 'border-x',
                          )}
                        >
                          <div className='mx-auto text-center text-14 lg:text-16 font-normal text-neutral-600 lining-nums'>
                            {item.toLocaleString()}
                          </div>
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                  <TableRow className='relative w-full'>
                    <TableCell className='border-t border-l border-neutral-300'>
                      <div className='text-end text-14 lg:text-16 font-semibold text-neutral-800'>
                        teraFLOPS
                      </div>
                    </TableCell>
                    {advantagesData.teraFlops.map((item, index) => (
                      <React.Fragment key={index}>
                        <TableCell 
                          className={cn(
                            'border-neutral-300 border-t',
                            index === advantagesData.memory.length - 1
                              ? 'border-r'
                              : 'border-x',
                          )}
                        >
                          <div className='mx-auto text-center text-14 lg:text-16 font-normal text-neutral-600 lining-nums'>
                            {item}
                          </div>
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                  <TableRow className='relative w-full'>
                    <TableCell className='rounded-bl-24 border-y border-l border-neutral-300'>
                      <div className='text-end text-14 lg:text-16 font-semibold text-neutral-800'>
                        Memory
                      </div>
                    </TableCell>
                    {advantagesData.memory.map((item, index) => (
                      <React.Fragment key={index}>
                        <TableCell
                          className={cn(
                            'border-neutral-300 border-y',
                            index === advantagesData.memory.length - 1
                              ? 'rounded-br-24 border-r'
                              : 'border-x',
                          )}
                        >
                          <div className='mx-auto text-center text-14 lg:text-16 font-normal text-neutral-600 lining-nums'>
                            {item}
                          </div>
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className='flex w-full gap-6 overflow-x-scroll md:hidden-scrollbar'>
            <AdvantagesContent data={advantagesContent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantages

const advantagesContent = [
  {
    title: 'Optimize Performance',
    icon: <Plant size={30} />,
    description:
      'Process unlimited token pairs simultaneously for maximum throughput.',
    image: advantagesBanner.default.src,
  },
  {
    title: 'Unrivaled Speed',
    icon: <Rabbit size={30} />,
    description:
      'Arcu aliquet porta venenatis nunc pharetra. Tristique tristique faucibus et amet scelerisque cursus suspendisse fermentum et.',
    image: advantagesBanner2.default.src,
  },
  {
    title: 'Unmatched Scalability',
    icon: <ArrowsOut size={30} />,
    description:
      'Arcu aliquet porta venenatis nunc pharetra. Tristique tristique faucibus et amet scelerisque cursus suspendisse fermentum et.',
    image: advantagesBanner3.default.src,
  },
]

type AdvantagesContentProps = {
  data: {
    title: string
    icon: React.JSX.Element
    description: string
    image: string
  }[]
}

const AdvantagesContent: FC<AdvantagesContentProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <>
      {data.map((content, index) => (
        <div
          key={content.title}
          className='flex h-fit w-full min-w-70 flex-col rounded-24 border border-neutral-200'
        >
          <div className='h-40 lg:h-full max-w-full'>
            <Image
              alt='advantages-banners'
              src={content.image}
              width={340}
              height={200}
              className='h-full w-full rounded-t-24 object-fill'
            />
          </div>
          <div className={cn(
            'flex flex-col gap-4 px-6 pt-6 transition-all duration-1000',
            openIndex === index
              ? 'h-full'
              : 'h-20',
          )}>
            <div
              className={cn(
                'flex items-center gap-4 duration-200 cursor-pointer',
                openIndex === index ? 'border-b border-neutral-200 pb-6' : '',
              )}
              onClick={() => handleToggle(index)}
            >
              {content.icon}
              <span className='w-full text-16 font-semibold text-neutral-800'>
                {content.title}
              </span>
              <CaretDown
                size={16}
                className={cn(
                  'cursor-pointer duration-500',
                  openIndex === index ? 'rotate-180' : '',
                )}
              />
            </div>
            <div
              className={cn(
                'overflow-hidden transition-all duration-1000',
                openIndex === index
                  ? 'max-h-96 pb-6 opacity-100'
                  : 'max-h-0 opacity-0',
              )}
            >
              <p className='text-16 font-normal text-neutral-600'>
                {content.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
