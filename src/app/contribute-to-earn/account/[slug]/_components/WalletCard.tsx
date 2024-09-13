'use client'
import { CHAINS } from '@/app/contribute-to-earn/lib/constants'
import { xoroCoin } from '@/images/contribute-to-earn/icons'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, type FC, type ReactNode } from 'react'
type WalletCardProps = {
  image: string
  address: string
  action?: ReactNode
  balance: string
  chain: string
}
export const WalletCard: FC<WalletCardProps> = ({
  image,
  address,
  action,
  balance,
  chain,
}) => {
  const [showAction, setShowAction] = useState<boolean>(false)
  const chainLogo = CHAINS.find((rpc) => rpc.chainId.toString() === chain)
  return (
    <motion.div
      onHoverStart={() => {
        setShowAction(true)
      }}
      onHoverEnd={() => {
        setShowAction(false)
      }}
      // whileHover={{ scale: 1.05 }}
      className={cn(
        'flex flex-row justify-between rounded-24 border border-transparent bg-white p-4',
        showAction && 'border-blue-300',
      )}
    >
      <div className='flex flex-row items-center gap-2 pl-3'>
        <Image
          src={image || '/images/logo.webp'}
          width={24}
          height={24}
          alt='wallet'
        />
        <p className='mx-4 text-neutral-500'>|</p>
        {chainLogo && chainLogo.icon && (
          <div className='flex items-center justify-center gap-1 rounded-lg border border-black/10 bg-neutral-100 px-1 py-0.75'>
            <Image src={chainLogo.icon} width={24} height={24} alt='chain' />
            <p className='text-14 font-semibold text-neutral-800 mr-0.75'>
              {chainLogo?.currency}
            </p>
          </div>
        )}
        <p className={cn(showAction && 'font-medium')}>{address}</p>
      </div>
      <div className='flex flex-row gap-2'>
        <motion.div
          animate={showAction === true ? { x: -20 } : { x: 30 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          className='flex flex-row items-center gap-2'
        >
          <Image
            src={xoroCoin.default.src}
            width={20}
            height={20}
            alt='x-oro'
          />
          <p className='text-red-500'>{balance}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={showAction ? { x: -20, opacity: 1 } : { x: 0 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          className='flex flex-row items-center gap-2'
        >
          <div>|</div>
          {action}
        </motion.div>
      </div>
    </motion.div>
  )
}
