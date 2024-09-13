'use client'

import AppFooter from '@/components/layouts/app-footer'
import { AppHeader } from '@/components/layouts/app-header'
import * as Tooltip from '@radix-ui/react-tooltip'
import { usePathname } from 'next/navigation'

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  if (pathName.startsWith('/contribute-to-earn'))
    return (
      <>
        <Tooltip.Provider>
          {children}
          <AppFooter />
        </Tooltip.Provider>
      </>
    )
  return (
    <>
      <Tooltip.Provider>
        <AppHeader />
        {children}
        <AppFooter />
      </Tooltip.Provider>
    </>
  )
}
