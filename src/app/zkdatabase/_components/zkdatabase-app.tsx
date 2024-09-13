'use client'
import { useState } from 'react'
import ZKAppCastle from './layout/zk-app-castle'
import ZKAppTable from './layout/zk-app-table'
import Image from 'next/image'

const ZKDatabaseApp = () => {
  const [selectedTab, setSelectedTab] = useState<string>(ZKTabs[0].id)

  const handleChangeTab = (tabId: string) => {
    setSelectedTab(tabId)
  }

  return (
    <section className='mx-auto my-10 max-w-[1440px] px-2 lg:my-20 lg:h-auto lg:px-6'>
      <div className='relative z-10 h-full w-full items-center justify-center px-2 pb-2 pt-6 md:grid md:grid-rows-2 lg:flex lg:min-h-[70vh] lg:flex-row 4k:min-h-0 4k:items-start'>
        <div className='mb-10 flex h-full w-full justify-center lg:mb-30 lg:w-1/2 4k:mb-0'>
          <Image
            src='/images/zkdatabase/zkdatabase-application.png'
            width={1800}
            height={1000}
            alt='zk-castle'
            className='h-full object-fill md:w-[70%] lg:w-full xl:w-[70%]'
          />
        </div>

        {/* right */}
        <ZKAppTable
          data={ZKTabs}
          selectedTab={selectedTab}
          onTabChange={handleChangeTab}
        />
      </div>
    </section>
  )
}

export default ZKDatabaseApp

export type zkTabsProps = {
  id: string
  tab: string
  title: string
  contents: {
    title: string
    description: string
  }[]
}

const ZKTabs = [
  {
    id: 'fintech',
    tab: 'Fintech',
    title: 'Streamline Audits, Empower Payment System Innovation.',
    contents: [
      {
        title: 'Auditable Banking and Credit Systems: ',
        description:
          'zkdatabase can be used to build secure and transparent banking and credit systems. Banks and credit institutions can store and manage sensitive data (e.g., transaction history, credit scores) off-chain while using zero-knowledge proofs to demonstrate the validity and consistency of this data to auditors and regulators. This enhances privacy while ensuring compliance.',
      },
      {
        title: 'Efficient Order Book Management: ',
        description:
          'allows fintech companies to manage off-chain order books (records of buy and sell orders), improving scalability and transaction speed. It uses zero-knowledge proofs to prove the validity of order books on the main blockchain, ensuring data integrity without revealing sensitive details.',
      },
    ],
  },
  {
    id: 'supplyChain',
    tab: 'Supply Chain',
    title:
      'Securing Global Supply Chains with Privacy, Authenticity, and Trust.',
    contents: [
      {
        title: 'Global Reach: ',
        description:
          'Position zkDatabase as a solution for seamless cross-border trade and international supply chain management. Ensure sensitive information about products, origin, and transportation can be stored off-chain, building data privacy while maintaining accessibility for authorized parties.',
      },
      {
        title: 'Reduced Fraud: ',
        description:
          'Verifiable provenance minimizes counterfeiting and tampering with goods, leading to a more secure supply chain environment.',
      },
      {
        title: 'Consumer Trust: ',
        description:
          'Market zkDatabase as a way for businesses to build consumer trust by ensuring product authenticity and ethical sourcing.',
      },
    ],
  },
  {
    id: 'onchainGames',
    tab: 'On-chain Games',
    title: 'The Secret Weapon for Web3 Games Success.',
    contents: [
      {
        title: 'Boost Scalability: ',
        description:
          'Store vast amounts of game data off-chain, significantly reducing on-chain transaction fees and congestion. This allows for smoother gameplay with faster transactions.',
      },
      {
        title: 'Enhance Security: ',
        description:
          'Employ cryptographic proofs to ensure the integrity and validity of game data stored off-chain. This prevents cheating and manipulation, promoting fair play in the game environment.',
      },
      {
        title: 'Mass Adoption: ',
        description:
          'By addressing scalability issues, zkDatabase allows Web3 games to handle a larger player base, facilitating the transition of players from traditional games.',
      },
    ],
  },
  {
    id: 'zkApps',
    tab: 'zkApps',
    title: 'What do you think about “on-chain data availability”?',
    contents: [
      {
        title: 'Used blockchain to store commitment: ',
        description:
          "utilizes the blockchain to store commitments, which are cryptographically condensed representations of the data. These commitments act as a tamper-proof record of the data's existence and state without revealing the actual content.",
      },
      {
        title: 'Feeding data directly to smart contract with a ZKP: ',
        description:
          'Store vast amounts of data off-chain in zkDatabase, reducing on-chain storage requirements and transaction costs. These cryptographic proofs act as a bridge between the secure storage of zkDatabase and the trustless environment of smart contracts. This eliminates the need for complex on-chain data retrieval processes, improving efficiency and scalability.',
      },
      {
        title: 'Data can be fed with valid ZKP: ',
        description:
          'Faster, since it just require one single transaction to feed the data. Eliminate third-party trust with ZKP',
      },
    ],
  },
]
