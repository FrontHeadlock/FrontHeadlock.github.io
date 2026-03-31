import { About } from './components/About/About'
import { ExperienceTimeline } from './components/Experience/ExperienceTimeline'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { ProjectsSection } from './components/Projects/ProjectsSection'
import { MatrixRainCanvas } from './components/shared/MatrixRainCanvas'
import './styles/matrix-effects.css'

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
