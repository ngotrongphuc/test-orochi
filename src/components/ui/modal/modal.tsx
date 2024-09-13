import React, { FC, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../dialog'
import { cn } from '@/lib/utils'
import { useWeb3ModalState } from '@web3modal/ethers/react'

export type ModalProps = {
  title?: string
  description?: string
  visible?: boolean
  onClose: () => void
  children: React.ReactNode
  hideCloseButton?: boolean
  className?: string
}

export const Modal: FC<ModalProps> = ({
  title,
  description,
  visible,
  children,
  hideCloseButton,
  className,
  onClose,
}) => {
  return (
    <Dialog open={visible} defaultOpen={false} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'pace-y-6 border border-white bg-white/70 shadow-none backdrop-blur-3xl',
          className,
        )}
        hideCloseButton={hideCloseButton}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className='text-muted-foreground text-sm w-full'>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
