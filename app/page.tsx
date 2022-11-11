import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import "../styles/globals.css"
import Hero from '../ui/Hero'
import WavyNav from '../ui/WavyNav'

export default function Home() {
  return (
    <div>
      <Hero />
      <WavyNav />
      <main>
        Home page
      </main>

      <footer>
        <p>A concept</p>
      </footer>
    </div>
  )
}
