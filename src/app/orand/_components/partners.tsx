import Image from "next/image"

export default function Partners() {
  return (
    <section className="container pb-10 pt-20">
      <div className="flex flex-col gap-14 container-fluid">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col flex-wrap items-center justify-between gap-x-10 gap-y-14 md:flex-row"
          >
            {data[rowIndex].map((logo, index) => (
              <div key={index}>
                <Image
                  loading="lazy"
                  src={`/images/partners/${logo}`}
                  alt="partner logo"
                  className="h-10 w-auto animate-pulse object-cover"
                  style={{
                    ...(rowIndex % 2 === 0 && [1, 3].includes(index)
                      ? { animationDelay: '2s' }
                      : {}),
                    ...(rowIndex % 2 !== 0 && [0, 2].includes(index)
                      ? { animationDelay: '2s' }
                      : {}),
                  }}
                  width={0}
                  height={0}
                  sizes='100%'
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

const data = [
  ['binance-chain.png', 'moonbean.png', 'sei-2.png', 'ancient8-2.png'],
  ['unicorn-ultra-2.png', 'koroma.png', '2kfair.png', 'zicuit.png'],
  ['polygon-2.png', 'nibiru.png', 'saakuru.png', 'layer.png'],
]
