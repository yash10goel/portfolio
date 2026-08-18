import { useMemo, useState } from 'react'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { projects } from '@/data/projects'

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeProject = useMemo(() => projects.find((project) => project.id === activeId) ?? null, [activeId])

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Enterprise applications, shipped."
          description="A selection of the systems I've built full-stack or led on the frontend — from identity platforms to CRM tooling."
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={(index % 3) * 90} onOpen={setActiveId} />
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
    </section>
  )
}
