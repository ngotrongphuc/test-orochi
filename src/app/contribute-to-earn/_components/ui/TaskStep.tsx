import React, { FC } from 'react'
import { referralCodeToUrl } from '../../lib/utils'
import Link from 'next/link'

type TTaskStepProps = {
  step: string
  referralCode: string
}

const TaskStep: FC<TTaskStepProps> = ({ step, referralCode }) => {
  const phrase = 'Your referral link: '
  const referralLink = referralCodeToUrl(referralCode)
  if (step.includes(phrase) && referralCode) {
    const index = step.indexOf(phrase) + phrase.length
    return (
      <p>
        {step.slice(0, index)}
        <Link href={referralLink} className='text-red-500'>
          {referralLink}
        </Link>
        {step.slice(index)}
      </p>
    )
  }
  return step
}

export default TaskStep
