import Image from 'next/image'
import {Heading} from "@core/typography";
import {Navbar} from "@core/common/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
        <Navbar />
        <Heading className={'mt-32'} variant="h1">Rock Paper Scissors</Heading>
    </main>
  )
}
