import { Raleway } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import Provider from './_provider'

import './globals.css'

import type { Metadata } from 'next'
import { DEFAULT_DEVELOPMENT_URL } from '@/configs/navigation'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || DEFAULT_DEVELOPMENT_URL),
  title: {
    template: '%s | Orochi Network',
    default: 'Orochi Network: The World First Zero Knowledge Modular DA Layer',
  },
  description:
    'Orochi Network applies Cryptography, ZKP, Multi Party Computation to create secure and scalable solutions for Blockchain, dApps, zkApps, Data, Custody, Computation and Daily life.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='!scroll-smooth lining-nums'>
      <body className={`${raleway.className} text-base`}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  )
}
