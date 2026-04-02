import { About } from '../about/About'
import { ExperienceTimeline } from '../experience/ExperienceTimeline'
import { Header } from '../header/Header'
import { Hero } from '../hero/Hero'
import { OnboardingGate } from '../onboarding/OnboardingGate'
import { ProjectsSection } from '../projects/ProjectsSection'
import { MatrixRainCanvas } from '../../shared/ui/MatrixRainCanvas'
import '../../shared/styles/matrix-effects.css'

function ResumeScreen() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text-main)]">
      <div className="matrix-backdrop -z-20" aria-hidden="true" />
      <MatrixRainCanvas />
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectsSection />
      </main>
    </div>
  )
}

function App() {
  return (
    <OnboardingGate>
      <ResumeScreen />
    </OnboardingGate>
  )
}

export default App
