import React from 'react'
import { SpinnerGap } from '@phosphor-icons/react/dist/ssr'

export const Loading = () => {
  return (
    <div className="container flex flex-col gap-10 rounded-3xl bg-blue-100 p-6">
      <h6 className='text-center lg:text-lg text-md'>Loading...</h6>
      <SpinnerGap size={50} className='animate-spin mx-auto' fill='hsla(6,98%,60%,1)'/>
    </div>
  )
}
