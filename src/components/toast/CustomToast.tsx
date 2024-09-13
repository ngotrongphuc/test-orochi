import { Confetti, Warning, XCircle } from '@phosphor-icons/react/dist/ssr'
import React, { type FC } from 'react'

type ToastProps = {
  message: string
}

export const ErrorToast: FC<ToastProps> = ({ message }) => {
  return (
    <div className='flex w-fit items-center gap-2 rounded-md'>
      <Warning weight='fill' size={32} fill='red' />
      <span className='text-16 font-semibold text-neutral-800 '>{message}</span>
    </div>
  )
}

export const InformationToast: FC<ToastProps> = ({ message }) => {
  return (
    <div>
      <div className='flex w-fit items-center gap-2 rounded-md'>
        <div className='grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-red-50 text-md'>
          ⏰
        </div>
        <span className='text-sm text-red-600 '>{message}</span>
      </div>
    </div>
  )
}

export const SuccessToast: FC<ToastProps> = ({ message }) => {
  return (
    <div className='flex w-fit items-center gap-2 rounded-md'>
      <Confetti weight='fill' size={32} fill='green' />
      <span className='text-16 font-semibold text-neutral-800 '>{message}</span>
    </div>
  )
}

export const WarningToast: FC<ToastProps> = ({ message }) => {
  return (
    <div>
      <div className='flex w-fit items-center gap-2 rounded-md'>
        <Warning weight='duotone' size={32} fill='brown' />
        <span className='text-16 text-neutral-800 '>{message}</span>
      </div>
    </div>
  )
}
