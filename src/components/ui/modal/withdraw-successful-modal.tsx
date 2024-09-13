import React, { FC } from 'react'
import { Modal } from './modal'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { useUserRewardStore } from '@/stores'
import Image from 'next/image'
import { getImageUrl, shortenString } from '@/utils'
import { CHAINS } from '@/app/contribute-to-earn/lib/constants'
import { xoroCoin } from '@/images/contribute-to-earn/icons'

type TWithdrawSuccessfulModalProps = {
  visible?: boolean
  onClose: () => void
}

export const WithdrawSuccessfulModal: FC<TWithdrawSuccessfulModalProps> = ({
  visible,
  onClose,
}) => {
  const { withdrawData } = useUserRewardStore()
  const chainData = CHAINS.find(
    (chain) => chain.chainId.toString() === withdrawData?.chainId.toString(),
  )

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className='w-full bg-white backdrop-blur-0 md:w-[480px]'
    >
      <h4 className='border-b border-neutral-200 pb-6 text-lg font-semibold lg:text-23'>
        Claim successful!
      </h4>
      <div className='flex flex-col items-center py-4'>
        <CheckCircle size={80} weight='fill' className='mb-2 text-green-500' />
        <p className='text-base text-neutral-600'>
          Your claim is confirmed successfully!
        </p>
      </div>
      <div className='rounded-2xl border border-neutral-300 p-4'>
        <div className='flex flex-col gap-2 border-b border-neutral-300 pb-4'>
          <div className='flex justify-between'>
            <p className='text-base text-neutral-600'>Chain</p>
            <span className='flex items-center gap-2'>
              {chainData?.networkName}
              <Image
                alt='testnet-icon'
                src={chainData?.icon || ''}
                width={20}
                height={20}
              />
            </span>
          </div>
          <div className='flex justify-between'>
            <p className='text-base text-neutral-600'>Wallet</p>
            <span className='flex items-center gap-2'>
              {shortenString(withdrawData?.walletAddress || '')}
              <Image
                alt='testnet-icon'
                src={getImageUrl(withdrawData?.walletProvider || '')}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        <div className='flex justify-between pt-4'>
          <p className='text-base text-neutral-600'>Claimed</p>
          <div className='flex items-center gap-2'>
            <p className='text-18 font-semibold text-red-600'>
              {withdrawData?.amount}
            </p>
            <Image
              src={xoroCoin.default.src}
              width={20}
              height={20}
              alt='logo-x-oro'
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default WithdrawSuccessfulModal
