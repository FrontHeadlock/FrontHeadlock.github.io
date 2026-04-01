import { About } from './about/About'
import { ExperienceTimeline } from './experience/ExperienceTimeline'
import { Header } from './header/Header'
import { Hero } from './hero/Hero'
import { ProjectsSection } from './projects/ProjectsSection'
import { MatrixRainCanvas } from '../shared/ui/MatrixRainCanvas'
import '../shared/styles/matrix-effects.css'

function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text-main)]">
      <MatrixRainCanvas />
      <a href="#main-content" className="sr-only focus:not-sr-only">
        본문으로 건너뛰기
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

export default App
