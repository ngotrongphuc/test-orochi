'use client'
import { useRef } from 'react'

import { Tab, Tabs } from './layout/Tabs'
import { VideoPlayer } from './layout/VideoPlayer'

export const Guide = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className='grid gap-10 bg-neutral-100 py-32' ref={containerRef}>
      <div className='m-auto flex max-w-[1088px] flex-col gap-4 lg:max-h-[145px] lg:gap-6'>
        <h4 className='mx-auto max-w-[953px] text-center text-2xl font-semibold text-neutral-800 lg:text-3xl'>
          Start Now:
          <br className='flex md:hidden' /> Follow This Guide
        </h4>
        <p className='mx-auto w-full max-w-[300px] text-center text-16 text-neutral-600 md:max-w-[936px] lg:text-md'>
          Feeling overwhelmed by all the information? Don&apos;t worry!
          We&apos;ve created a straightforward tutorial to help you complete the
          campaign in just four easy steps.
        </p>
      </div>

      <div className='m-auto'>
        <Tabs>
          <Tab label='How to Log In'>
            <div>
              <VideoPlayer
                video={videoData.login.url}
                stepsData={steps1}
                videoSteps={videoData.login.step}
              />
            </div>
          </Tab>
          <Tab label='How to Get XORO'>
            <div>
              <VideoPlayer
                video={videoData.getXORO.url}
                stepsData={steps2}
                videoSteps={videoData.getXORO.step}
              />
            </div>
          </Tab>
          <Tab label='How to Claim XORO' isComingSoon>
            <div>
              <VideoPlayer
                video={videoData.claimXORO.url}
                stepsData={steps3}
                videoSteps={videoData.claimXORO.step}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

const steps1 = [
  {
    title: 'Visit Website and Log In',
    description: 'Visit ‘Contribute to Earn’ Page\nto log in.',
  },
  {
    title: 'Access Your Account',
    description: 'Choose your log in method:\nDiscord/Google/Wallet.',
  },
  {
    title: 'Setup Your Profile',
    description: 'Choose your username and\nadd an avatar (optional).',
  },
  {
    title: 'Log In Successfully',
    description: 'Continue to connect other\naccounts.',
  },
]

const steps2 = [
  {
    title: 'Go to Quest Bank',
    description: 'Scroll down to the Quest Bank\nand dive in.',
  },
  {
    title: 'Interact with Task',
    description: 'Choose the task and have fun\nin our Quest Bank.',
  },
  {
    title: 'Task Verification Process',
    description: 'Wait 5 seconds for the system\nto verify your process.',
  },
  {
    title: 'Claim XORO',
    description: 'Claim XORO [Beta token] into\nyour balance.',
  },
]

const steps3 = [
  {
    title: 'Visit Crypto Wallet Profile',
    description: 'Visit user profile and click\nCrypto Wallet tab. ',
  },
  {
    title: 'Connect Wallet',
    description: 'Select your preferred\nWeb3 wallet.',
  },
  {
    title: 'Choose Network',
    description: 'Select your preferred Network\nto claim XORO.',
  },
  {
    title: 'Claim XORO',
    description: 'Choose XORO amount to\nclaim into your Web3 wallet.',
  },
]

const videoData = {
  login: {
    url: 'https://orochi-storage.sgp1.cdn.digitaloceanspaces.com/video/how-to-login-retro.mp4',
    step: [0, 3, 11, 19],
  },
  getXORO: {
    url: 'https://orochi-storage.sgp1.cdn.digitaloceanspaces.com/video/how-to-get-retro.mp4',
    step: [0, 7, 14, 22],
  },
  claimXORO: {
    url: '',
    step: [0, 6, 13, 22],
  },
}
