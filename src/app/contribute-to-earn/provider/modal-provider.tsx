'use client'
import { ModalProvider } from '@/app/context/modal-context'
import type { FC, ReactNode } from 'react'

type TypeModalProvider = {
  children: ReactNode
}

function ModalWrapper({ children }: TypeModalProvider) {
  return <ModalProvider>{children}</ModalProvider>
}

export default ModalWrapper
