'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
import { ServiceSpider } from '@orochi-network/jrpc'
import { Pattern } from '@/app/_components/banner'
import { logger } from '@/utils/logger'
import { getListPriceToken } from '@/actions/get-list-price-token'
import { ContractTable } from './layout/token-price-table'
import { Canvas } from '@react-three/fiber'
import TextureMesh from './ui/texture/texture-mesh'
import {
  a8Testnet,
  arbutrumTestnet,
  baseTestnet,
  bnbTestnet,
  fantomTestnet,
  kromaTestnet,
  mantaTestnet,
  metisTestnet,
  moonbaseTestnet,
  morphTestnet,
  optimismTestnet,
  orocleLogo,
  saakuruTestnet,
  scrollTestnet,
  seiTestnet,
  u2uTestnet,
  variant19Testnet,
  variant22Testnet,
  wanchainTestnet,
  xlayerTestnet,
  zircuitTestnet,
  zkfairTestnet,
  zklinkTestnet,
} from '@/images/orocle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { OROCHI_DASHBOARD } from '@/configs/navigation'
import { getRandomInt } from '@/utils'

const TIME_LOADING = 500

const TIME_SEARCH_DEBOUNCE = 700

const TIME_REFETCHING_DATA = 30 * 60 * 1000 // 30 minutes

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        setIsScrolled(tableContainerRef.current.scrollTop > 0)
      }
    }

    const container = tableContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [listPrice, setListPrice] = useState<
    ServiceSpider.TLatestTokenPriceRecord[]
  >([])

  const [selectedNetwork, setSelectedNetwork] = useState<TestnetNetworkProps>(
    TestnetNetwork[0],
  )
  const [tableLoading, setTableLoading] = useState<boolean>(false)

  const [epochValue, setEpochValue] = useState<number>(0)

  const handleSelectValue = (value: string) => {
    const selected = TestnetNetwork.find((network) => network.name === value)
    if (selected) {
      setSelectedNetwork(selected)
      setEpochValue(getRandomInt(3))
      setTableLoading(true)
      setTimeout(() => {
        setTableLoading(false)
      }, TIME_LOADING)
    }
  }

  const searchDebounce = useDebounce((value: string) => {
    setSearchTerm(value)
  }, TIME_SEARCH_DEBOUNCE)

  const filteredData = useMemo(
    () =>
      listPrice.filter((price) => {
        const matchesSearchTerm =
          price.srcSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          price.dstSymbol.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearchTerm
      }),
    [searchTerm, listPrice],
  )

  useEffect(() => {
    const fetchData = async () => {
      const result = await getListPriceToken()
      if (!result) {
        throw new Error('Network not available!')
      }
      setListPrice(result)
    }

    fetchData()

    const refetchingData = setInterval(() => {
      fetchData()
    }, TIME_REFETCHING_DATA)

    return () => clearInterval(refetchingData)
  }, [])

  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden px-2 pb-20 pt-4 lg:h-auto md:px-6'>
      <div className='bg-orocle-hero relative overflow-hidden rounded-3xl'>
        <div className='absolute top-0 -z-0 h-full w-full rotate-[135deg] scale-150 opacity-70 mix-blend-screen'>
          <Canvas
            gl={{
              preserveDrawingBuffer: true,
              premultipliedAlpha: false,
              alpha: true,
              antialias: false,
              precision: 'highp',
              powerPreference: 'high-performance',
            }}
            resize={{
              debounce: 0,
              scroll: false,
              offsetSize: true,
            }}
            dpr={1}
            camera={{
              fov: 75,
              near: 0.1,
              far: 1000,
              position: [0, 0, 2],
            }}
            className='h-full w-full'
          >
            <TextureMesh />
          </Canvas>
        </div>
        <div className='w-full lg:h-60'>
          <Pattern />
          <Pattern reverse />
        </div>
        <div className='z-10 flex w-full flex-col px-2 pb-2 pt-6 lg:grid lg:grid-cols-2 lg:pb-30 lg:pt-0'>
          <div className='z-10 mx-auto flex flex-col items-center justify-center gap-6 lg:items-start lg:justify-normal'>
            <div className='flex w-fit items-center gap-2 rounded-3xl border-white/30 bg-white/70 px-6 py-2'>
              <Image
                alt='orocle logo'
                src={orocleLogo.default.src}
                width={25.6}
                height={25.6}
              />
              <p className='text-18 font-bold'>Orocle</p>
            </div>
            <h2 className='text-center text-35 font-semibold text-neutral-800 lg:text-start lg:text-55'>
              Thrives on <br />
              real-world data
            </h2>
            <p className='text-center text-16 font-light text-neutral-600 lg:text-start lg:text-18'>
              Imagine building a Web3 application that thrives on <br />
              real-world data, free from centralized control.
            </p>
            <Button
              asLink
              href={OROCHI_DASHBOARD}
              target='_blank'
              icon={<ArrowRight size={18} />}
              intent='primary'
              className='mb-10 mt-4 flex w-full items-center justify-center text-14 font-semibold text-white lg:mb-0 lg:w-fit'
            >
              start building
            </Button>
          </div>
          <div className='z-10 mx-auto w-full lg:pr-8 xl:pr-25'>
            <div className='flex w-full flex-col gap-2 xl:flex-row'>
              <Select
                value={selectedNetwork.name}
                onValueChange={(value) => handleSelectValue(value)}
              >
                <SelectTrigger
                  className='flex h-full w-full items-center gap-3 rounded-2xl border-2 border-white bg-tint-white-70 px-4 py-4 backdrop-blur-3xl xl:w-4/5 2xl:w-3/5'
                  icon={
                    <Image
                      alt='selected-icon'
                      src={selectedNetwork.icon}
                      width={20}
                      height={20}
                    />
                  }
                  text={selectedNetwork.name}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='rounded-lg border-2 border-white bg-tint-white-70'>
                  {TestnetNetwork.map((network) => (
                    <SelectItem
                      className={cn(
                        'my-1 rounded-xl py-4',
                        selectedNetwork.name === network.name
                          ? 'bg-blue-300'
                          : 'hover:bg-blue-100',
                      )}
                      key={network.name}
                      value={network.name}
                      icon={
                        <Image
                          alt='testnet-icon'
                          src={network.icon}
                          width={20}
                          height={20}
                        />
                      }
                    >
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label className='flex w-full items-center gap-2 rounded-2xl border-2 border-white bg-tint-white-70 px-4 py-3 backdrop-blur-3xl xl:w-3/5'>
                <MagnifyingGlass size={16} />
                <input
                  type='text'
                  placeholder='Search...'
                  className='w-full bg-transparent focus:border-none focus:outline-none'
                  onChange={(e) => searchDebounce(e.target.value)}
                />
              </label>
            </div>
            <div
              ref={tableContainerRef}
              className='mt-2 h-60 overflow-hidden overflow-y-auto rounded-2xl border border-white bg-tint-white-70 backdrop-blur-3xl lg:h-90'
            >
              <ContractTable
                epochValue={epochValue}
                isScrolled={isScrolled}
                data={filteredData}
                className={cn(tableLoading && 'animate-pulse')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

type TestnetNetworkProps = {
  name: string
  icon: any
}

const TestnetNetwork: TestnetNetworkProps[] = [
  {
    name: 'Ancient8 Testnet',
    icon: a8Testnet.default.src,
  },
  {
    name: 'Unicorn Ultra Nebulas',
    icon: u2uTestnet.default.src,
  },
  {
    name: 'Sei Devnet',
    icon: seiTestnet.default.src,
  },
  {
    name: 'Saakuru Testnet',
    icon: saakuruTestnet.default.src,
  },
  {
    name: 'Zircuit Testnet',
    icon: zircuitTestnet.default.src,
  },
  {
    name: 'ZKFair Testnet',
    icon: zkfairTestnet.default.src,
  },
  {
    name: 'X Layer Testnet',
    icon: xlayerTestnet.default.src,
  },
  {
    name: 'ZKLink Nova',
    icon: zklinkTestnet.default.src,
  },
  {
    name: 'BNB Chain Testnet',
    icon: bnbTestnet.default.src,
  },
  {
    name: 'Arbitrum Sepolia Testnet',
    icon: arbutrumTestnet.default.src,
  },
  {
    name: 'Moonbase Alpha Testnet',
    icon: moonbaseTestnet.default.src,
  },
  {
    name: 'Manta Pacific Sepolia Testnet',
    icon: mantaTestnet.default.src,
  },
  {
    name: 'Kroma Sepolia Testnet',
    icon: kromaTestnet.default.src,
  },
  {
    name: 'Fantom Testnet',
    icon: fantomTestnet.default.src,
  },
  {
    name: 'LayerEdge Testnet',
    icon: variant19Testnet.default.src,
  },
  {
    name: 'Base Sepolia Testnet',
    icon: baseTestnet.default.src,
  },
  {
    name: 'Optimism Sepolia Testnet',
    icon: optimismTestnet.default.src,
  },
  {
    name: 'Wanchain Testnet',
    icon: wanchainTestnet.default.src,
  },
  {
    name: 'Scroll Sepolia Testnet',
    icon: scrollTestnet.default.src,
  },
  {
    name: 'Morph Holesky Testnet',
    icon: morphTestnet.default.src,
  },
  {
    name: 'LightLink Pegasus Testnet',
    icon: variant22Testnet.default.src,
  },
  {
    name: 'Metis Sepolia Testnet',
    icon: metisTestnet.default.src,
  },
]
