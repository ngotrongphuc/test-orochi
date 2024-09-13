import { cn } from '@/lib/utils'
import { Binoculars, Lightning, Trophy } from '@phosphor-icons/react/dist/ssr'
import React, { FC } from 'react'

const Cores = () => {
  return (
    <>
      <section className='mx-auto my-10 max-w-[1168px] overflow-x-hidden lg:my-20 lg:h-auto'>
        <div className='mx-2 flex flex-col gap-4 md:mx-10 lg:flex-row xl:mx-0'>
          {CoreCardData.map((card) => (
            <CoreCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </section>
      <div className='bg-linear h-0.25 w-full' />
    </>
  )
}

export default Cores

type CoreCardProps = {
  icon: React.JSX.Element
  title: string
  description: string
}

const CoreCardData = [
  {
    icon: <Lightning size={32} color='red' weight='duotone' />,
    title: 'Web3 Challenger',
    description:
      'Data integrity in Web3 is often reliant on distributed validation networks. However, many current solutions still require trust in third-party oracles and the limitations of smart contract environments pose challenges for data availability and security.',
  },
  {
    icon: <Binoculars size={32} color='red' weight='duotone' />,
    title: 'Our Mission',
    description:
      'We leverage the power of ZKP to create a high-performance Verifiable Data Pipeline for developers and let people focus on building innovative applications, leaving the complexity behind. of Data Integrity and Data Availability for zkMDAL.',
  },
  {
    icon: <Trophy size={32} color='red' weight='duotone' />,
    title: 'Our Recognition',
    description:
      'Orochi Network is a grantee of the Ethereum Foundation, Web3 Foundation, Mina Protocol, Aleo and trusted by 40+ blockchain.\nThis recognition underscores the potential of our technology to shape the future of Web3.',
  },
]

const CoreCard: FC<CoreCardProps> = ({ icon, title, description }) => {
  return (
    <div className='group border-gradient rounded-2xl md:rounded-24 mx-auto flex h-fit w-full justify-center p-0.25 md:h-66 lg:h-100 lg:w-77 xl:w-95'>
      <div className='z-10 flex flex-col gap-4 rounded-[15px] md:rounded-[23px] bg-white p-6 group-hover:bg-gradient-to-tr group-hover:from-red-50/90 group-hover:via-white group-hover:to-white md:gap-6 md:p-10 group-active:from-red-50/90 group-active:via-white group-active:to-white group-active:bg-gradient-to-tr'>
        {icon}
        <h4 className='text-23 font-semibold text-neutral-800 group-hover:text-red-500'>
          {title}
        </h4>
        <div className='text-neutral-800 font-normal text-16 leading-6 lining-nums'>
        {description.split('\n').map((line: string, index: number) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>
  )
}
