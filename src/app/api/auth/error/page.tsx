'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const ERROR_MESSAGES: { [key: string]: string } = {
  OAuthSignin: 'There was a problem with signing in. Please try again.',
  OAuthCallback: 'The authentication callback failed. Please try again.',
  OAuthCreateAccount: 'An error occurred while creating your account.',
  OAuthAccountNotLinked:
    'The email is already associated with another account. Try logging in with the associated provider.',
  OAuthSessionRequired: 'You must be authenticated to access this page.',
  Configuration: 'There was an issue with the server configuration.',
  AccessDenied: 'You do not have access to this page.',
  Verification: 'The email verification token is invalid or has expired.',
  Default: 'An unknown error occurred. Please try again later.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || ERROR_MESSAGES.Default // Retrieve the error parameter

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-black text-white'>
      <h1 className='mb-4 text-3xl font-semibold'>Authentication Error</h1>
      <p className='mb-6 text-lg'>{ERROR_MESSAGES[error]}</p>
      <Link href='/contribute-to-earn'>
        <p className='text-blue-500 hover:underline'>Go back to the homepage</p>
      </Link>
    </div>
  )
}
