'use client'
import WaveComponent from './ui/wave/wave'

const ENJOY_ZKP_IFRAME_URL =
  'https://stackblitz.com/edit/zkdatabase-example?embed=1&file=src%2Fpiglet-bank.ts&theme=dark&view=editor'

const EnjoyZKP = () => {
  return (
    <section className='relative px-2 py-10 lg:px-10 lg:py-20'>
      <div className='relative z-10 overflow-hidden rounded-40 bg-blue-tint-10 py-10 lg:py-20'>
        <div className='absolute inset-0 mt-50 flex overflow-hidden'>
          <WaveComponent wavesNumber={3} className='h-full w-full absolute' />
          <WaveComponent wavesNumber={3} className='h-full w-full rotate-180'/>
        </div>
        <div className='relative z-20 mx-auto max-w-[776px] px-6 lg:max-w-full'>
          <h2 className='w-full text-center text-23 font-semibold md:text-35'>
            Enjoy ZKP Utilities <br />
            Without Being a ZK Expert
          </h2>
          <p className='mt-6 text-center text-14 text-neutral-600 md:text-18'>
            Our graphical user interface streamlines data management, offering
            visual representation for <br />
            efficient data administration, analysis, and collaboration with
            accuracy.
          </p>
        </div>
        <div className='relative z-20 mt-10 px-4 container-fluid lg:px-6'>
          <iframe
            loading='lazy'
            title='zkdatabase live demo'
            src={ENJOY_ZKP_IFRAME_URL}
            className='h-[calc(80vh-85px-32px)] w-full overflow-hidden rounded-2xl lg:aspect-[1088/593] lg:h-[calc(100vh-300px)] 4k:h-[calc(100vh-700px)]'
          />
        </div>
      </div>
    </section>
  )
}

export default EnjoyZKP
