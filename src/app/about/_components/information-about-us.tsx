import { aboutBrandKit, aboutCareer, aboutContactUs } from '@/images/about'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const InformationAboutUs = () => {
  return (
    <>
      <section className='mx-auto max-w-[1168px] overflow-hidden py-10 lg:py-20 lg:h-full px-2'>
        <div className='md:mx-10 flex flex-col justify-center md:flex-row lg:mx-30 gap-4 md:gap-0'>
          {InfoCardData.map((card, index) => (
            <InfoCard
              rotate={card.rotate}
              img={card.img}
              key={card.title}
              title={card.title}
              description={card.description}
              link={card.link}
              className={cn(
                'translate-y-0 duration-500 md:hover:-translate-y-10',
                index === 0 && 'md:hover:-translate-x-8.5',
                index === 2 && 'md:hover:translate-x-8.5',
              )}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default InformationAboutUs

type InfoCardProps = {
  rotate: string
  img: string
  title: string
  description: string
  link: string
  className?: string
}

const InfoCardData = [
  {
    rotate: 'lg:rotate-[-15deg] md:rotate-[-5deg]',
    img: aboutCareer.default.src,
    title: 'Careers',
    description:
      'Work with us on cutting-edge projects, collaborate with experts, and gain in-depth knowledge ZKPs.',
    link: 'https://www.linkedin.com/company/orochi-network-official/jobs/?viewAsMember=true',
  },
  {
    rotate: 'rotate-[0deg]',
    img: aboutContactUs.default.src,
    title: 'Contact us',
    description:
      'Stay up-to-date on the latest news, developments, and announcements by joining our vibrant community.',
    link: 'https://linktr.ee/orochi.network',
  },
  {
    rotate: 'lg:rotate-[15deg] md:rotate-[5deg]',
    img: aboutBrandKit.default.src,
    title: 'Brand kits',
    description: 'Download our brand assets.',
    link: 'https://drive.google.com/drive/folders/1MwWNd3vuoopW13gta7Io4DBFRxp46cZ1?usp=sharing',
  },
]

const InfoCard: FC<InfoCardProps> = ({
  rotate,
  img,
  title,
  description,
  className,
  link,
}) => {
  return (
    <Link
      href={link}
      target='_blank'
      className={cn(
        'group mx-auto flex h-fit w-full md:w-60 flex-col items-center justify-center gap-4 rounded-lg border border-black/10 bg-white p-2 md:p-4 lg:w-70',
        rotate,
        rotate !== 'rotate-[0deg]' && 'md:mt-7',
        className,
      )}
    >
      <div className='md:h-52 md:w-52 rounded-lg lg:h-62 lg:w-62'>
        <Image
          alt='info-img'
          src={img}
          width={1600}
          height={1600}
          className='h-full w-full rounded-lg object-fill'
        />
      </div>
      <div className='flex w-full flex-col gap-4 p-2'>
        <div className='flex items-center justify-between border-b border-black/10 pb-4'>
          <h4 className='text-23 font-semibold text-neutral-800'>{title}</h4>
          <ArrowUpRight size={21.25} className='hidden group-hover:block'/>
        </div>
        <p className='text-16 font-normal text-black/70'>{description}</p>
      </div>
    </Link>
  )
}
