import { cn } from '@/lib/utils'
import React, { type FC, type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
export const Input: FC<InputProps> = (input) => {
  return (
    <input
      type={input.type}
      name={input.name}
      placeholder={input.placeholder}
      //   onChange={(e) => setEmail(e.target.value)}
      className={cn(
        'h-[54px] w-full rounded-3xl bg-white md:h-16',
        'text-left text-md text-neutral-800',
        'border border-white outline-none transition-colors hocus:border-red-500',
        'pl-4 placeholder:text-left placeholder:text-base placeholder:text-neutral-500',
        `${input.className}`,
      )}
    />
  )
}
