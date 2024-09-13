import React, { FC } from 'react'
import { Modal } from './modal'
import { SmileySad } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'

type TWithdrawFailedModalProps = {
  visible?: boolean
  onClose: () => void
  slug: string
}

export const WithdrawFailedModal: FC<TWithdrawFailedModalProps> = ({
  visible,
  onClose,
  slug,
}) => {
  const router = useRouter()

  const handleClickingHere = () => {
    onClose()
    router.push(`/contribute-to-earn/account/${slug}/crypto-wallets`)
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className='w-full bg-white backdrop-blur-0 md:w-[480px]'
    >
      <h4 className='border-b border-neutral-200 pb-6 text-lg font-semibold lg:text-23'>
        {'Claim failed :('}
      </h4>
      <div className='flex flex-col items-center py-4'>
        <SmileySad size={80} weight='fill' className='mb-2 text-[#E09745]' />
        <p className='text-center text-base text-neutral-600'>
          Your claim request failed because you declined the transaction signing
          on your wallet. Please retry the transaction again by{' '}
          <strong
            className='cursor-pointer font-bold text-red-500 underline'
            onClick={handleClickingHere}
          >
            clicking here
          </strong>
          .
        </p>
      </div>
    </Modal>
  )
}

export default WithdrawFailedModal
