'use client'

import { useToast } from '@/components/ui/use-toast'
import {
  Toast,
  ToastClose,
  ToastTitle,
  ToastProvider,
  ToastViewport,
  ToastDescription,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        position,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport
        position={toasts[0]?.position || 'right-bottom'}
        className='z-[102]' // display Toast over Modal
      />
    </ToastProvider>
  )
}
