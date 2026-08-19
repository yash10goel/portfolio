import { useMemo, useState } from 'react'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard'
import { FeaturedProjectCard } from '@/components/FeaturedProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { projects } from '@/data/projects'

const spotlightProjects = projects.filter((project) => project.spotlight)
const otherProjects = projects.filter((project) => !project.spotlight)

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeProject = useMemo(() => projects.find((project) => project.id === activeId) ?? null, [activeId])

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Enterprise applications, shipped."
          description="The strongest examples of what I build full-stack or led on the frontend — from identity platforms to a live client site."
          className="mb-16"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {spotlightProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              delay={index * 100}
              onOpenCaseStudy={setActiveId}
            />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-20">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-accent">Other Projects</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={(index % 3) * 90} onOpen={setActiveId} />
              ))}
            </div>
          </div>
        )}
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
    </section>
  )
}
