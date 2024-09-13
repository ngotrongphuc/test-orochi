'use client'

import React, { useRef, useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'

import { X, List } from '@phosphor-icons/react'

import { Button } from '../ui/button'

export default function MobileNavToggler({
  children,
  open,
  navToggle
}: {
  children?: React.ReactNode
  open?: boolean
  navToggle?: () => void
}) {
  const [debouncedOpen, setDebouncedOpen] = useState<boolean>(open || false)

  const timeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>()
  const isActiveRef = useRef<boolean>(false)

  function toggle() {
    setDebouncedOpen((open) => !open)
  }

  useEffect(() => {
    const container = containerRef.current

    function activate() {
      isActiveRef.current = true
    }

    function deactivate() {
      isActiveRef.current = false
    }

    container?.addEventListener('animationstart', activate)
    container?.addEventListener('animationend', deactivate)

    return () => {
      container?.removeEventListener('animationstart', activate)
      container?.removeEventListener('animationend', deactivate)
    }
  }, [])

  useEffect(() => {
    if (!isActiveRef.current) {
      return setDebouncedOpen(open || false)
    }

    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setDebouncedOpen(open || false), 1000)

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [open])

  return (
    <>
      <Button
        aria-label='menu button'
        iconOnly
        intent={debouncedOpen ? 'outline-black' : 'primary'}
        icon={
          <AnimatePresence>
            {debouncedOpen ? (
              <motion.span
                className='absolute left-[18px] top-[18px]'
                key='close'
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.7 }}
              >
                <X className='size-4' />
              </motion.span>
            ) : (
              <motion.span
                className='absolute left-[18.5px] top-[18.5px]'
                key='open'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.7 }}
              >
                <List className='size-4' />
              </motion.span>
            )}
          </AnimatePresence>
        }
        onClick={navToggle || toggle}
        className='relative z-10 size-[53px] transition-colors duration-1000 xl:hidden'
      />

      <div
        className={cn(
          'invisible fixed inset-0 transition-all duration-1000 overflow-x-hidden w-full h-[100vh]',
          debouncedOpen ? 'visible' : ''
        )}
      >
        <div
          className={cn(
            'absolute right-[50.5px] top-[58.5px] -z-10 after:absolute after:size-[750vmax] md:after:size-[350vmax] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white after:transition-transform after:duration-1000',
            debouncedOpen ? 'after:scale-100' : 'after:scale-0 after:delay-300',
          )}
        />

        <div
          className={cn(
            'h-full -translate-y-10 opacity-0 duration-300',
            debouncedOpen && 'translate-y-0 opacity-100 delay-1000',
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
