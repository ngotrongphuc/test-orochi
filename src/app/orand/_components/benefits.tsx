import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Benefits() {
  return (
    <section className="container py-32 md:py-44">
      <div className="container-fluid">
        <h2 className="text-28 md:text-35 lg:text-55 font-semibold">
          Benefits of using Orand
        </h2>
        <p className="text-14 md:text-18 mt-6 max-w-[704px] text-neutral-700">
          Orand guarantees a deterministically verifiable source of randomness
          by leveraging the cryptographic principles of Elliptic Curve
          Verifiable Random Functions (ECVRF)
        </p>
      </div>

      <div className="2xl:grid-cols-2 mt-14 grid gap-4 lg:mt-20">
        <CardMain />

        <Card
          image="/images/orand/benefit-2.webp"
          title="Security"
          content="ECVRF technology guarantees unmanipulable randomness. No administrator can influence the outcome"
        />
        <Card
          image="/images/orand/benefit-3.webp"
          title="Flexibility"
          content="Choose between Self-Submission or Delegated Submission to Orochi Network for automatic feeding or Request Submission"
        />
      </div>
    </section>
  )
}

function CardMain() {
  return (
    <div
      className={cn('rounded-40 2xl:row-span-2 overflow-hidden bg-blue-100')}
    >
      <div className="lg:h-77 md:h-66 rounded-40 h-44 w-full overflow-hidden">
        <Image
          loading="lazy"
          src="/images/orand/benefit-1.webp"
          alt="benefit-1"
          className="h-full w-full object-cover"
          width={0}
          height={0}
          sizes='100%'
        />
      </div>
      <div className="p-6 lg:p-10">
        <span
          className={cn(
            'border border-blue-300',
            'block w-max rounded-full px-6 py-4',
            'text-18 md:text-28 font-medium leading-[20px] text-neutral-800',
          )}
        >
          Verifiability
        </span>
        <p className="text-16 md:text-18 mt-4 text-neutral-700 md:mt-6">
          ECVRF (Elliptic Curve Verifiable Random Function) empowers you to
          generate unpredictable, tamper-proof randomness that can be
          independently verified both outside and within your existing systems
        </p>
      </div>
    </div>
  )
}

function Card({
  image,
  title,
  content,
}: {
  image: string
  title: string
  content: string
}) {
  return (
    <div className={cn('rounded-40 overflow-hidden bg-blue-100 md:flex')}>
      <div className="lg:h-77 md:h-50 rounded-40 h-44 w-full flex-shrink-0 overflow-hidden md:aspect-square md:w-auto">
        <Image
          loading="lazy"
          src={image}
          alt="benefit"
          className="h-full w-full object-cover"
          width={0}
          height={0}
          sizes='100%'
        />
      </div>
      <div className="p-6 lg:p-10">
        <span
          className={cn(
            'border border-blue-300',
            'block w-max rounded-full px-6 py-4',
            'text-18 md:text-28 font-medium leading-[20px] text-neutral-800',
          )}
        >
          {title}
        </span>
        <p className="text-16 md:text-18 mt-4 text-neutral-700 md:mt-6">
          {content}
        </p>
      </div>
    </div>
  )
}
