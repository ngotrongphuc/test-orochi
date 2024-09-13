import { cn } from '@/lib/utils'
import React, { FC } from 'react'

export enum EZKAppLayer {
  Fintech = 'fintech',
  SupplyChain = 'supplyChain',
  OnChainGames = 'onchainGames',
  ZKApps = 'zkApps',
}

type ZKAppCastleProps = {
  className?: string
}

const ZKAppCastle: FC<ZKAppCastleProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'mr-10 flex h-full w-full flex-col items-center justify-center lg:w-1/2',
        className,
      )}
    >
      <div className='absolute top-10 flex w-full flex-col items-center justify-center'>
        <div className='absolute top-30 z-30 flex w-full items-center justify-center'>
          <p className='absolute top-12 z-20 mr-68 skew-y-[35deg] text-12 font-semibold uppercase text-neutral-800 md:mr-86'>
            Applications
          </p>
          <div className='border-zk-layer absolute flex h-50.5 w-50.5 md:h-65.5 md:w-65.5 rotate-[126deg] skew-y-[20deg] ml-0.25 rounded-24 backdrop-blur-2xl' />
          <div className='absolute flex h-50 w-50 rotate-[126deg] skew-y-[20deg] flex-col flex-wrap content-between items-center justify-between rounded-24 p-1 pr-2 pt-2.5 md:h-65 md:w-65 md:p-3 md:pr-4 md:pt-4.5'>
            {dataLayer[0].map((app) => (
              <div
                key={app.name}
                className={cn(
                  'bg-first-zk-app flex h-14 w-14 flex-shrink-0 rotate-180 flex-col items-center justify-center gap-1 px-1 py-0.5 md:h-16 md:w-16',
                  !app.name && 'opacity-0',
                )}
              >
                <p className='w-full text-center text-[9.5px] font-semibold leading-tight text-neutral-800 md:text-[10px]'>
                  {app.name}
                </p>
              </div>
            ))}
            <div className='absolute bottom-0 -z-10 flex h-full w-full rounded-24 bg-gradient-to-br from-blue-400/10 to-blue-500/10 backdrop-blur-2xl'></div>
          </div>
        </div>
      </div>

      <div className='absolute top-73 flex w-full flex-col items-center justify-center md:top-80'>
        <div className='flex flex-col items-center justify-center'>
          <p className='absolute top-8 z-50 -ml-72 skew-y-[35deg] text-12 font-semibold uppercase text-neutral-800 md:-ml-80'>
            zkmemory
          </p>
          <div className='absolute z-10 flex h-45 w-45 rotate-[126deg] skew-y-[20deg] flex-col flex-wrap content-between items-center justify-between rounded-24 p-2 md:h-55 md:w-55 md:p-3'>
            {dataLayer[1].map((app, index) => (
              <div
                key={`${app.name}-${index}`}
                className={cn(
                  'bg-blue-tint-50 flex h-13.25 w-13.25 flex-shrink-0 rotate-180 flex-col items-center justify-center gap-1 px-0.5 py-0.5 md:h-16 md:w-16 rounded-xl',
                  !app.name && 'opacity-0',
                )}
              >
                <p className='w-full text-center text-[8px] font-semibold leading-tight text-white md:text-[10px]'>
                  {app.name}
                </p>
              </div>
            ))}
            <div className='absolute bottom-0 -z-10 flex h-full w-full rounded-24 bg-gradient-to-br from-blue-400/30 to-blue-500/30 backdrop-blur-2xl' />
          </div>
        </div>
      </div>

      <div className='absolute top-85 -ml-3 mt-17 flex w-full flex-col items-center justify-center md:top-100'>
        <div className='flex flex-col items-center justify-center'>
          <p className='absolute top-15 z-50 -ml-33 skew-y-[35deg] text-12 font-semibold uppercase text-neutral-800 md:-ml-34'>
            Proof System
          </p>
          <div className='bg-selected-zk-layer absolute -z-10 flex h-35 w-35 rotate-[126deg] skew-y-[20deg] flex-wrap content-between items-center justify-between rounded-24 bg-gradient-to-br from-blue-400/50 to-blue-500/50 p-2 backdrop-blur-2xl md:h-40 md:w-40 md:p-3'>
            {dataLayer[2].map((app, index) => (
              <div
                key={`${app.name}-${index}`}
                className={cn(
                  'bg-zk-app flex h-14 w-14 flex-shrink-0 rotate-180 flex-col items-center justify-center gap-1 px-0.5 py-0.5 md:h-16 md:w-16',
                  !app.name && 'opacity-0',
                )}
              >
                <p className='w-full text-center text-[9px] font-semibold leading-tight text-white md:text-[10px]'>
                  {app.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZKAppCastle

const dataLayer = [
  [
    {
      name: 'zkRISC',
    },
    {
      name: 'zkEVM',
    },
    {
      name: 'xkMDAL Engine',
    },
    {
      name: 'zkMIPS',
    },
    {
      name: 'Off-chain Storage',
    },
    {
      name: 'zkDatabase Backend',
    },
    {
      name: 'zkWASM',
    },
    {
      name: 'zkVM Framework',
    },
    {
      name: 'zkVM Module',
    },
  ],
  [
    {
      name: 'CPU Architecture SImulator',
    },
    {},
    {},
    {
      name: 'ISA Simulator',
    },
    {},
    {},
    {
      name: 'Abstract RAM Machine',
    },
    {
      name: 'ZK Circuit',
    },
    {
      name: 'Proof Systems Adapter',
    },
  ],
  [
    {
      name: 'Arithmetiza-tion',
    },
    {
      name: 'Comitment Schemes',
    },
    {},
    {
      name: 'Proof Systems',
    },
  ],
]

type InformationLineProps = {
  className?: string
  reverse?: boolean
}

const InformationLine: FC<InformationLineProps> = ({ className, reverse }) => (
  <div
    className={cn(
      'absolute z-50 flex w-20 rotate-90 items-center justify-center overflow-hidden text-11 uppercase',
      className,
    )}
  >
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
    <p
      className={cn(
        'bg-information-line lowercase',
        reverse
          ? 'animate-information-line-reverse'
          : 'animate-information-line',
      )}
    >
      information
    </p>
  </div>
)
