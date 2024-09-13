'use client'
import React, { useEffect } from 'react'
import { CreateUsernameModal } from '@/components/ui/modal/create-username'
import { useModal } from '@/app/context/modal-context'
import { EModalId } from '../lib/types'

const SetUsernamePopup = () => {
  const { closeModal, modalStates } = useModal()
  const handleCloseModal = () => {
    closeModal(EModalId.ModalCreateUsername)
  }
  return (
    <CreateUsernameModal
      visible={modalStates[EModalId.ModalCreateUsername]}
      onClose={handleCloseModal}
    />
  )
}

export default SetUsernamePopup
