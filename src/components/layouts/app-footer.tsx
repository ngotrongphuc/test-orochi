import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import Github from '../icons/github'
import { Button } from '../ui/button'
import Twitter from '../icons/twitter'
import Discord from '../icons/discord'
import Telegram from '../icons/telegram'

export const DEFAULT_FILL_SVG = '#09090B'

export default function AppFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      id='footer'
      className={cn(
        'mx-auto grid max-w-[1136px] gap-8 bg-white px-6 py-[5rem]',
        'lg:gap-14 lg:py-[12rem]',
      )}
    >
      <div className='grid gap-8 lg:grid-cols-[auto,minmax(0,1fr)] lg:gap-[11.375rem]'>
        <Link href='/' className='block h-12'>
          <Image
            alt='orochi logo'
            src='/logo.webp'
            width={0}
            height={0}
            priority={true}
            unoptimized
            className='h-auto w-[180px] object-contain lg:w-[220px]'
          />
        </Link>

        <FooterNavigate />
      </div>

      <hr className='m-0 h-[1px] w-full border-none bg-neutral-300' />

      <div className='flex flex-wrap items-center justify-between gap-8'>
        <SocialLink />

        <p className='text-sm text-neutral-600 lg:text-base lg:text-neutral-500'>
          © {year} Orochi Network. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterNavigate() {
  const navigate = [
    {
      title: 'About',
      links: [
        {
          href: '/about',
          label: 'About us',
        },
        {
          href: 'https://docs.orochi.network/',
          label: 'Documents',
        },
        {
          href: 'https://eprint.iacr.org/2024/336',
          label: 'RamenPasta',
        },
        // Coming soon
        // {
        //   href: '/',
        //   label: 'Use Cases',
        // },
        {
          href: 'https://orochi.network/blog/',
          label: 'Blog',
        },
        {
          label: 'PRICING',
          href: 'https://dashboard.orochi.network/',
        },
        {
          label: 'PRIVACY POLICY',
          href: '/privacy-policy',
        },
        {
          label: 'TERM OF SERVICE',
          href: '/term-of-service',
        },
      ],
    },
    {
      title: 'Product',
      links: [
        {
          href: '/zkdatabase',
          label: 'ZkDatabase',
        },
        {
          href: '/orocle',
          label: 'Orocle',
        },
        {
          href: '/orand',
          label: 'Orand',
        },
        // Comming soon
        // {
        //   href: '/',
        //   label: 'Orosign',
        // },
        // {
        //   href: '/',
        //   label: 'ZkMemory',
        // },
      ],
    },
    // {
    //   title: 'For',
    //   links: [
    //     {
    //       href: '/',
    //       label: 'Smart Contract Platforms',
    //     },
    //     {
    //       href: '/',
    //       label: 'DAPPS/ZKAPPS',
    //     },
    //     {
    //       href: '/',
    //       label: 'Validators',
    //     },
    //     {
    //       href: '/',
    //       label: 'Developers',
    //     },
    //     {
    //       href: 'https://docs.google.com/forms/d/e/1FAIpQLSdFwMaifPRrQ1q_c2dCm39F3HLk9ZSOkX_pLswNuF62jKeMug/viewform',
    //       label: 'Retail users',
    //     },
    //   ],
    // },
    {
      title: 'Community',
      links: [
        {
          href: 'https://x.com/OrochiNetwork',
          label: 'Twitter',
        },
        {
          href: 'https://discord.com/invite/sTU4TUh8H3',
          label: 'Discord',
        },
        {
          href: 'https://github.com/orochi-network',
          label: 'Github',
        },
        {
          href: 'https://t.me/OrochiNetwork',
          label: 'Telegram',
        },
        {
          href: 'https://docs.google.com/forms/d/e/1FAIpQLSdFwMaifPRrQ1q_c2dCm39F3HLk9ZSOkX_pLswNuF62jKeMug/viewform/',
          label: 'Partnership',
        },
      ],
    },
  ]

  return (
    <div className='grid grid-cols-2 justify-between gap-y-8 lg:flex'>
      {navigate.map((nav, index) => (
        <ul key={'navigate-' + index} className='space-y-2 lg:space-y-4'>
          <li className='text-wrap font-medium uppercase text-neutral-500'>
            {nav.title}
          </li>

          {nav.links.map((link, indexLink) => (
            <li key={'links-' + indexLink} className='w-full'>
              <Button
                asLink
                aria-label={link.label}
                target={link.href.includes('http') ? '_blank' : '_self'}
                rel='noopener noreferrer'
                href={link.href}
                intent='ghost-black'
                className='block h-fit w-max max-w-full text-wrap py-1.5 before:z-[1]'
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export function SocialLink() {
  const socials = [
    {
      href: 'https://x.com/OrochiNetwork',
      icon: <Twitter fill={DEFAULT_FILL_SVG} />,
    },
    {
      href: 'https://discord.com/invite/sTU4TUh8H3',
      icon: <Discord fill={DEFAULT_FILL_SVG} />,
    },
    {
      href: 'https://github.com/orochi-network',
      icon: <Github />,
    },
    {
      href: 'https://t.me/OrochiNetwork',
      icon: <Telegram fill={DEFAULT_FILL_SVG} />,
    },
    // {
    //   href: '/',
    //   icon: <Reddit />,
    // },
  ]

  return (
    <div className='grid auto-cols-max grid-flow-col gap-6'>
      {socials.map((social) => (
        <a
          aria-label='social-link'
          href={social.href}
          key={social.href}
          target='_blank'
          rel='noopener noreferrer'
          className='block h-6 w-6'
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
