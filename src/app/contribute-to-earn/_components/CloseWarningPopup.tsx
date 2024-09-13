'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CreateUsernameModal } from '@/components/ui/modal/create-username'
import { useModal } from '@/app/context/modal-context'
import { CloseWarningModal } from '@/components/ui/modal/warning-popup'
import { EModalId } from '../lib/types'

const CloseWarningPopup = () => {
  const { closeModal, modalStates } = useModal()

  const handleCloseModal = () => {
    closeModal(EModalId.ModalCloseWarning)
  }
  return (
    <CloseWarningModal
      visible={modalStates[EModalId.ModalCloseWarning]}
      onClose={handleCloseModal}
    />
  )
}

export default CloseWarningPopup
