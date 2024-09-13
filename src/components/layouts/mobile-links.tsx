'use client'

import React, { useState, type FC } from 'react'

import { Link } from '@/configs/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'

import { CaretDown } from '@phosphor-icons/react'

import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useMobileNavStore } from '@/stores/use-mobile-nav-store'

export const MobileNavLinks = ({ links }: { links: Array<Link> }) => {
  return (
    <ul className='grid content-start gap-6'>
      {links.map((link, index) => {
        const hasChildren =
          React.isValidElement(link.children) ||
          Boolean(Array.isArray(link.children) && link.children.length > 0)

        return hasChildren ? (
          <NavLinkWithChildren key={index} link={link} index={index} />
        ) : (
          <NavLinkWithoutChildren key={index} link={link} index={index} />
        )
      })}
    </ul>
  )
}

function NavLinkWithoutChildren({
  link,
  index,
}: {
  link: Link
  index: number
}) {
  const { toast } = useToast()
  return (
    <motion.li className='w-max px-4'>
      <Button
        intent='ghost-black'
        className='flex h-auto items-center py-1.5 text-md font-semibold normal-case'
        asLink
        target={link.href.includes('http') ? '_blank' : '_self'}
        href={link.href}
        onClick={(e) => {
          if (!link.href || link.href === '#') {
            e.preventDefault()
            toast({
              message: 'Coming soon! Subscribe us to get update!',
              variant: 'comingSoon',
            })
          }
        }}
      >
        {link.label}
      </Button>
    </motion.li>
  )
}

export const NavLinkWithChildren = ({
  link,
  index,
}: {
  link: Link
  index: number
}) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const openState = useMobileNavStore()
  function toggle() {
    setOpen((open) => !open)
  }

  return (
    <motion.li key={link.href} className='px-4'>
      <Button
        intent='ghost-black'
        onClick={toggle}
        className={cn(
          'flex h-auto items-center py-1.5 text-md font-semibold normal-case',
          open && 'text-red-500',
        )}
        icon={
          <CaretDown
            size={16}
            className={cn('transition-transform', open && 'rotate-180')}
          />
        }
      >
        {link.label}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className={cn('pl-6 pt-2')}
          >
            {Array.isArray(link.children) && link.children.length > 0 ? (
              <ul className='grid content-start gap-6 first:pt-2'>
                {link.children.map((child, index) => (
                  <li key={index}>
                    <Button
                      asLink
                      href={child.href}
                      target={child.href.includes('http') ? '_blank' : '_self'}
                      intent='ghost-black'
                      className='h-auto py-1.5 text-md font-semibold normal-case'
                      onClick={(e) => {
                        if (!child.href || child.href === '#') {
                          e.preventDefault()
                          toast({
                            message: 'Coming soon! Subscribe us to get update!',
                            variant: 'comingSoon',
                          })
                          return
                        }
                        openState.setOpenMobile(false)
                        //todo: close the mobile nav here
                      }}
                    >
                      {child.label}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : null}

            {React.isValidElement(link.children) ? link.children : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
