'use client'

import React, { useState } from 'react'

import { Link } from '@/configs/navigation'
import * as Popover from '@radix-ui/react-popover'
import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { CaretDown } from '@phosphor-icons/react/dist/ssr'

import { Button } from '../ui/button'

export default function DesktopLinks({ links }: { links: Array<Link> }) {
  return (
    <ul className='hidden h-full space-x-14 rounded-3xl px-8 xl:flex'>
      {links.map((link, index) => {
        const key = `${link.href}-${index}`
        const isNode = React.isValidElement(link.children)
        const isValidArray =
          Array.isArray(link.children) && link.children.length > 0
        const isHasChildren = isNode || isValidArray

        if (link.isComingSoon) {
          return (
            <LinkComingSoon key={key}>
              <li className='py-3'>
                <Button
                  intent='ghost-black'
                  className='flex items-center normal-case'
                >
                  {link.label}
                </Button>
              </li>
            </LinkComingSoon>
          )
        }

        if (isHasChildren) {
          return <NavLinkWithChildren key={key} link={link} />
        }

        return <NavLinkWithoutChildren key={key} link={link} />
      })}
    </ul>
  )
}

function NavLinkWithoutChildren({ link }: { link: Link }) {
  return (
    <li className='py-3'>
      <Button
        key={link.href}
        asLink
        href={link.href}
        intent='ghost-black'
        className='flex items-center normal-case'
        target={link.href.includes('http') ? '_blank' : '_self'}
      >
        {link.label}
      </Button>
    </li>
  )
}

function NavLinkWithChildren({ link }: { link: Link }) {
  const [isOpen, setIsOpen] = useState(false)

  const onHover = () => {
    setIsOpen(true)
  }

  const onBlur = () => {
    setIsOpen(false)
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <li
          className='group relative py-3'
          onMouseEnter={onHover}
          onMouseLeave={onBlur}
        >
          <Button
            intent='ghost-black'
            className='flex items-center'
            icon={
              <CaretDown
                size={16}
                className={cn(
                  'transition-transform group-data-[state=delayed-open]:rotate-180 group-data-[state=instant-open]:rotate-180',
                  link.isComingSoon && 'hidden',
                  isOpen && 'rotate-180',
                )}
              />
            }
          >
            {link.label}
          </Button>
        </li>
      </Popover.Trigger>
      <AnimatePresence>
        <Popover.Portal>
          <Popover.Content sideOffset={0} asChild>
            <motion.div
              initial={{
                opacity: 0,
                y: '10px',
                scale: 0.9,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: '-10px',
                scale: 0.9,
              }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className='z-header rounded-3xl bg-white/80 px-8 py-6 outline-none backdrop-blur-[50px]'
              onMouseEnter={onHover}
              onMouseLeave={onBlur}
            >
              {link.isComingSoon && (
                <div className='px-6 py-10 font-medium text-neutral-500'>
                  <p className='whitespace-nowrap'>Coming soon</p>
                </div>
              )}

              {Array.isArray(link.children) && (
                <ul className='grid gap-4'>
                  {link.children?.map((child, index) => {
                    const Wrapper = ({
                      children,
                    }: {
                      children: React.ReactNode
                    }) =>
                      child.isComingSoon ? (
                        <LinkComingSoon>{children}</LinkComingSoon>
                      ) : (
                        <>{children}</>
                      )

                    return (
                      <Wrapper key={`${child.href}-${index}`}>
                        <li>
                          <Button
                            href={child.isComingSoon ? '#' : child.href}
                            asLink
                            target={
                              child.href.includes('http') ? '_blank' : '_self'
                            }
                            intent='ghost-black'
                            className='flex w-max items-center'
                          >
                            {child.label}
                          </Button>
                        </li>
                      </Wrapper>
                    )
                  })}
                </ul>
              )}

              {React.isValidElement(link.children) && link.children}
            </motion.div>
          </Popover.Content>
        </Popover.Portal>
      </AnimatePresence>
    </Popover.Root>
  )
}

export function LinkComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <AnimatePresence>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={0} asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className='z-[110] flex w-[284px] items-center rounded-2xl bg-white p-4 shadow-coming-soon'
            >
              <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-md'>
                ⏰
              </div>
              <p className='ml-2 text-sm text-neutral-600'>
                Coming soon! Subscribe us to get update!
              </p>
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </AnimatePresence>
    </Tooltip.Root>
  )
}
