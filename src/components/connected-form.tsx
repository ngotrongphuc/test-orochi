'use client'

import { createRef, FormEvent, useEffect, useRef, useState } from 'react'

import { connectedAction } from '@/actions/connected.action'

import { cn } from '@/lib/utils'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Button } from './ui/button'
import ReCAPTCHA from 'react-google-recaptcha'

export default function ConnectedForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isShowThank, setIsShowThank] = useState(false)
  const [email, setEmail] = useState('')
  const recaptchaRef = createRef<ReCAPTCHA>()
  const [recaptchaToken, setRecaptchaToken] = useState<string>('')

  const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const isEmailValid = regEmail.test(email)

  const onChangeCaptcha = async (token: string | null) => {
    setRecaptchaToken(token || '')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const formData = e.target as HTMLFormElement
      const username = formData.username.value
      if (!isEmailValid || username) {
        return
      }

      if (formRef.current && recaptchaToken) {
        const formData = new FormData(formRef.current)
        formData.append('recaptchaResponse', recaptchaToken)
        await connectedAction(formData)
        setIsShowThank(true)
        setTimeout(() => {
          setIsShowThank(false)
        }, 3000)
      }
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Something error while submit connect form',
      )
    }
  }

  return (
    <div className='mx-auto grid w-full max-w-[600px] gap-2'>
      {isShowThank ? (
        <div className='flex justify-center rounded-3xl bg-white p-4'>
          <p className='text-md text-neutral-500'>Thank you!</p>
        </div>
      ) : (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='grid w-full max-w-[600px] justify-items-center gap-4 md:gap-10'
          >
            {process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
                onChange={onChangeCaptcha}
              />
            )}
            <div className='relative w-full'>
              <input
                type='text'
                name='email'
                placeholder='Enter your email here'
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'h-[70px] w-full rounded-3xl bg-white md:h-[76px]',
                  'text-center text-md text-neutral-800 placeholder:text-neutral-500',
                  'border border-white outline-none transition-colors hocus:border-red-500',
                )}
              />
              <input
                className='absolute -z-cursor h-0 w-0 opacity-0'
                autoComplete='off'
                type='username'
                id='username'
                name='username'
                aria-hidden='true'
              />
              {email.length > 0 && !isEmailValid && (
                <span className='absolute right-1/2 top-[calc(100%+8px)] block translate-x-1/2 text-md text-red-500'>
                  Please enter a valid email
                </span>
              )}
            </div>

            <Button
              type='submit'
              style={
                email.length > 0 && !isEmailValid
                  ? { transform: 'translateY(8px)' }
                  : undefined
              }
              icon={<ArrowRight size={16} />}
              className='w-full justify-center lg:w-fit lg:px-10'
              disabled={!recaptchaToken.length}
            >
              Subscribe
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
