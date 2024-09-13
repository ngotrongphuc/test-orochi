'use client'
import React from 'react'
import { useModal } from '@/app/context/modal-context'
import { ConnectAccountModal } from '@/components/ui/modal/connect-account'
import { EModalId } from '../lib/types'

const ConnectAccountPopup = () => {
  const { closeModal, modalStates } = useModal()
  const handleCloseModal = () => {
    closeModal(EModalId.ModalConnectAccount)
  }

  return (
    <ConnectAccountModal
      visible={modalStates[EModalId.ModalConnectAccount]}
      onClose={handleCloseModal}
    />
  )
}

export default ConnectAccountPopup
