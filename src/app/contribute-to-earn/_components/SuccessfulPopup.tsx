'use client'
import React from 'react'
import { useModal } from '@/app/context/modal-context'
import { SuccessfulModal } from '@/components/ui/modal'
import { EModalId } from '../lib/types'

const SuccessfulPopup = () => {
  const { closeModal, modalStates } = useModal()
  const handleCloseModal = () => {
    closeModal(EModalId.ModalSuccessful)
  }
  return (
    <SuccessfulModal
      visible={modalStates[EModalId.ModalSuccessful]}
      onClose={handleCloseModal}
    />
  )
}

export default SuccessfulPopup
