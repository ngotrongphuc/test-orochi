'use client'
import React from 'react'
import { useModal } from '@/app/context/modal-context'
import { EModalId } from '../lib/types'
import { WalletConnectModal, WalletLoginModal } from '@/components/ui/modal'

const WalletConnectPopup = () => {
  const { closeModal, modalStates } = useModal()
  const handleCloseModalWalletLogin = () => {
    closeModal(EModalId.ModalWalletLogin)
  }
  const handleCloseModalWalletConnect = () => {
    closeModal(EModalId.ModalWalletConnect)
  }
  return (
    <>
      <WalletLoginModal
        visible={modalStates[EModalId.ModalWalletLogin]}
        onClose={handleCloseModalWalletLogin}
      />
      <WalletConnectModal
        visible={modalStates[EModalId.ModalWalletConnect]}
        onClose={handleCloseModalWalletConnect}
      />
    </>
  )
}

export default WalletConnectPopup
