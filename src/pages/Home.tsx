import { Hero } from '@/sections/Hero'
import { TechStrip } from '@/sections/TechStrip'
import { Packages } from '@/sections/Packages'
import { WebsiteExamples } from '@/sections/WebsiteExamples'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Services } from '@/sections/Services'
import { WhyWorkWithMe } from '@/sections/WhyWorkWithMe'
import { Process } from '@/sections/Process'
import { Quote } from '@/sections/Quote'
import { FreelanceCTA } from '@/sections/FreelanceCTA'

export function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <Packages />
      <WebsiteExamples />
      <Projects />
      <Process />
      <Quote />
      <WhyWorkWithMe />
      <About />
      <Services />
      <Skills />
      <Experience />
      <FreelanceCTA />
    </>
  )
}
