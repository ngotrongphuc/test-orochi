import { Button } from '@/components/ui/button'

export default function Research() {
  return (
    <section className="container py-6">
      <div className="rounded-40 bg-blue-200 px-4 py-14">
        <h2 className="text-28 md:text-35 lg:text-55 text-center font-semibold">
          Orand Research
        </h2>
        <p className="text-14 md:text-18 mt-6 text-center text-neutral-700">
          Everything is built up toward to the vision of Decentralized Random
          Number Generator.
        </p>
        <Button
          asLink
          href="https://docsend.com/view/5y7rc5cww2juudzn"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-10 flex w-max"
        >
          Orand PAPER
        </Button>
      </div>
    </section>
  )
}
