import { Hero } from '@/sections/Hero'
import { TechStrip } from '@/sections/TechStrip'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Services } from '@/sections/Services'
import { Process } from '@/sections/Process'
import { FreelanceCTA } from '@/sections/FreelanceCTA'
import { Contact } from '@/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Process />
      <FreelanceCTA />
      <Contact />
    </>
  )
}
