'use client'

import useIsMobile from '@/hooks/use-is-mobile'

import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { LinkComingSoon } from './layouts/desktop-links'
import { EXPLORE_FOR, EXPLORE_ABOUT } from '../configs/navigation'
import Link from 'next/link'

export function ExploreDropdown() {
  const { toast } = useToast()
  const isMobile = useIsMobile()

  function openComingSoon() {
    if (!isMobile) return
    toast({
      message: 'Coming soon! Subscribe us to get update!',
      variant: 'comingSoon',
    })
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 md:gap-14">
      <ul className="grid gap-4 self-start">
        <li className="font-medium text-neutral-500">About</li>
        {EXPLORE_ABOUT.map((link, index) =>
          link.isComingSoon ? (
            <LinkComingSoon key={index}>
              <li>
                <Button
                  intent="ghost-black"
                  className="flex h-auto w-max items-center py-1.5 text-md md:h-[29px] md:py-0 md:text-sm"
                  onClick={openComingSoon}
                >
                  {link.label}
                </Button>
              </li>
            </LinkComingSoon>
          ) : (
            <Link key={index} href={link.href}>
              <li>
                <Button
                  intent="ghost-black"
                  className="flex h-auto w-max items-center py-1.5 text-md md:h-[29px] md:py-0 md:text-sm"
                >
                  {link.label}
                </Button>
              </li>
            </Link>
          ),
        )}
      </ul>
      <ul className="grid gap-4 self-start">
        <li className="font-medium text-neutral-500">For</li>
        {EXPLORE_FOR.map((link, index) => (
          <LinkComingSoon key={index}>
            <li>
              <Button
                intent="ghost-black"
                className="flex h-auto w-max items-center py-1.5 text-md md:h-[29px] md:py-0 md:text-sm"
                onClick={openComingSoon}
              >
                {link.label}
              </Button>
            </li>
          </LinkComingSoon>
        ))}
      </ul>
    </div>
  )
}
