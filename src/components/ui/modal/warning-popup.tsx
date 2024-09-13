'use client'
import { type FC } from 'react'
import { Button } from '../button'
import { Input } from '../input/input'
import { Modal } from './modal'
import { useModal } from '@/app/context/modal-context'
import { signOut } from 'next-auth/react'
import { mutateDeleteAccount } from '@/lib/graphql/mutations'
import { EModalId } from '@/app/contribute-to-earn/lib/types'

type CloseWarningModalProps = {
  visible?: boolean
  onClose: () => void
}

export const CloseWarningModal: FC<CloseWarningModalProps> = ({
  visible,
  onClose,
}) => {
  const { closeModal, openModal } = useModal()
  const handleBack = () => {
    closeModal(EModalId.ModalCloseWarning)
    openModal(EModalId.ModalCreateUsername)
  }

  const handleQuit = async () => {
    closeModal(EModalId.ModalCloseWarning)
    closeModal(EModalId.ModalCreateUsername)
    await mutateDeleteAccount()
    signOut()
  }

  return (
    <>
      <Modal
        visible={visible}
        onClose={handleBack}
      >
        <div className='flex animate-up flex-col gap-8 md:animate-none'>
          <h4 className='text-lg font-medium md:text-center lg:text-3xl'>
            Are you sure you want to <br /> leave this page?
          </h4>
          <p className='text-clip text-wrap text-md font-medium text-[#6d6767] md:text-center xl:mx-40'>
            You are in the process of creating an account. If you leave now, all
            the information you have entered will not be saved and you will have
            to start over.
          </p>
          <div className='flex w-full flex-col-reverse items-center justify-center gap-4 md:flex-row'>
            <Button
              intent='white'
              className='w-full rounded-24 px-5 py-4 lg:w-1/4'
              onClick={handleBack}
            >
              back
            </Button>
            <Button
              className='w-full rounded-24 px-4 py-4 lg:w-1/4'
              onClick={handleQuit}
            >
              confirm & quit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
