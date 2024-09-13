import React, { Suspense } from 'react'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

export default Layout
