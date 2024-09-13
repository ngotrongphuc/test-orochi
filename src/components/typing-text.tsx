'use client'
import { TypeAnimation } from 'react-type-animation'

export function TypingText({ className }: { className?: string }) {
  return (
    <TypeAnimation
      sequence={[
        'Blockchain',
        1000,
        'dApp',
        1000,
        'Data',
        1000,
        'Custody',
        1000,
        'Computation',
        1000,
        'Everything',
        1000,
      ]}
      wrapper="span"
      speed={20}
      style={{ display: 'inline-block' }}
      repeat={Infinity}
      className={className}
    />
  )
}
