import { About } from '../about/About'
import { Contact } from '../contact/Contact'
import { ExperienceTimeline } from '../experience/ExperienceTimeline'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import { Hero } from '../hero/Hero'
import { ProjectsSection } from '../projects/ProjectsSection'
import { MatrixRainCanvas } from '../../shared/ui/MatrixRainCanvas'
import { RainPreferenceProvider } from '../../shared/hooks/useRainPreference'
import { CommandPalette, useCommandPalette } from '../../shared/ui/CommandPalette'
import '../../shared/styles/matrix-effects.css'
import '../../shared/styles/print.css'

export function ResumePage() {
  const { open, setOpen, search, setSearch, selectedIndex, filtered } = useCommandPalette()
  return (
    <RainPreferenceProvider>
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
          <Contact />
        </main>
        <Footer />
        <CommandPalette open={open} onClose={() => setOpen(false)} search={search} onSearchChange={setSearch} selectedIndex={selectedIndex} commands={filtered} onSelect={(cmd) => { cmd.action(); setOpen(false) }} />
      </div>
    </RainPreferenceProvider>
  )
}
