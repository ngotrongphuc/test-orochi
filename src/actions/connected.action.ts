'use server'

import { Resend } from 'resend'

import { ENV } from '@/lib/env'

export async function connectedAction(formData: FormData): Promise<boolean> {
  const email = formData.get('email')
  const recaptchaResponse = formData.get('recaptchaResponse')
  const RECAPTCHA_VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    const result = await response.json()
    if (result.success) {
      const resend = new Resend(ENV.RESEND_API_KEY)
      const from = process.env.SENDMAIL_FROM
      const to = process.env.SENDMAIL_TO
      const subject = process.env.SENDMAIL_SUBJECT

      const { data, error } = await resend.emails.send({
        from: from || 'No Reply <no-reply@orochi.network>',
        to: [to || 'contact@orochi.network'],
        subject: subject || 'EMAIL SUBSCRIBER',
        html: `<strong>${email}</strong>`,
      })

      if (error) {
        throw error
      }

      return true
    }
    return false
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Send email failed',
    )
  }
}
