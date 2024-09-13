'use client' // Error components must be Client Components
import { Button } from '@/components/ui/button'
import {
  GOOGLE_TAG_MANAGER_URL,
  SCRIPT_INNER_HTML,
  SessionErrorMessage,
} from '@/configs/navigation'
import { queryMe } from '@/lib/graphql/queries'
import { getSession, signOut } from 'next-auth/react'
import Script from 'next/script'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const handleInvalidSession = async () => {
    const session = await getSession()

    if (session) {
      const profile = await queryMe()
      if (profile && 'error' in profile) {
        signOut({ callbackUrl: '/contribute-to-earn', redirect: true })
      }
    }

    if (
      error.message === SessionErrorMessage.Error401 ||
      error.message === SessionErrorMessage.Authorized ||
      error.message === SessionErrorMessage.ErrorJWT ||
      error.message === SessionErrorMessage.InvalidCredentials ||
      error.message === SessionErrorMessage.TokenExpired
    ) {
      signOut({ callbackUrl: '/contribute-to-earn', redirect: true })
    }
  }

  useEffect(() => {
    handleInvalidSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src={GOOGLE_TAG_MANAGER_URL}
        strategy='afterInteractive'
      ></Script>
      <Script
        dangerouslySetInnerHTML={SCRIPT_INNER_HTML}
        strategy='afterInteractive'
        id='gtag-init'
      />
      <main>
        <div className='flex h-[50vh] flex-col items-center justify-center gap-8'>
          <h2 className='text-center text-lg'>Opps! Something went wrong!</h2>
          <Button
            intent={'primary'}
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </main>
    </>
  )
}
