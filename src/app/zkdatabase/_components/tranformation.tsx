import { pipeline } from '@/images/zkdatabase'
import Image from 'next/image'

const Transformation = () => {
  return (
    <section className='h-fit w-full bg-gradient-to-b from-white to-blue-100 py-10 lg:flex lg:py-20'>
      <div className='mx-w-[1440px] z-10 flex w-full flex-col items-center justify-center gap-6 rounded-40 px-5 lg:gap-10'>
        <div className='z-10 flex flex-col items-center'>
          <h2 className='w-full text-center text-23 font-semibold md:text-35'>
            The Transformation From Data <br /> To PROVABLE DATA
          </h2>
          <p className='my-6 text-center text-14 text-neutral-600 md:text-18'>
            We bring the ultimate value to the market powered by Zero-Knowledge
            Proof
          </p>
        </div>
        <div className='lg:mr-20'>
          <Image
            alt='pipeline'
            src={pipeline.default.src}
            width={800}
            height={650}
            className='object-contain'
          />
        </div>
      </div>
    </section>
  )
}

export default Transformation
