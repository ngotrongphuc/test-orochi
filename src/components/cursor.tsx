'use client'

import { useEffect } from 'react'

import { motion, useSpring, useMotionValue } from 'framer-motion'

import { useCursorStore } from '@/stores/use-cursor-store'

import { cn } from '@/lib/utils'

import { ArrowUpRight } from '@phosphor-icons/react'

export default function Cursor() {
  const { isHover, text = 'Read' } = useCursorStore()

  const mouse = {
    x: useMotionValue(-88),
    y: useMotionValue(-88),
  }

  const cursorSize = 88
  const smoothOptions = { damping: 30, stiffness: 300, mass: 0.1 }

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e

    mouse.x.set(clientX - cursorSize / 2)
    mouse.y.set(clientY - cursorSize / 2)
  }

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove)

    return () => {
      window.removeEventListener('mousemove', manageMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      transition={{ duration: 0.3 }}
      animate={{
        opacity: isHover ? 1 : 0,
        scale: isHover ? 1 : 0,
      }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-cursor h-[88px] w-[88px] rounded-full',
        'bg-neutral-100 text-neutral-800',
        'flex flex-col items-center justify-center space-y-1 touch:hidden',
      )}
    >
      <ArrowUpRight size={20} />
      <span className="whitespace-pre text-sm">{text}</span>
    </motion.div>
  )
}
