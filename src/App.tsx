import { useEffect, useState } from 'react'
import PcbDisplay from './components/PcbDisplay'
import Projects from './components/Projects'
import AboutMe from './components/AboutMe'
import './App.css'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 3.4 3 11.13v9.47h6.3v-5.95h5.4v5.95H21v-9.47L12 3.4Zm7.2 15.4h-2.7v-5.95H7.5v5.95H4.8V11.95L12 5.78l7.2 6.17v6.85Z"
      />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.32 1.08 2.88.82.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.65 9.65 0 0 1 5.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.67.93.67 1.88v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.55A1.95 1.95 0 0 0 5.2 3a1.95 1.95 0 0 0 0 3.9 1.95 1.95 0 0 0 1.96-1.95ZM20.5 13.39c0-3.04-1.62-4.46-3.78-4.46-1.74 0-2.52.96-2.96 1.63V8.5h-3.38V20h3.38v-6.41c0-.34.02-.67.13-.91.27-.67.89-1.37 1.93-1.37 1.36 0 1.9 1.03 1.9 2.55V20h3.38v-6.61Z"
      />
    </svg>
  )
}

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', onScroll, { passive: true })

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleSectionNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) return

    const nav = event.currentTarget.closest('.pill-nav') as HTMLElement | null
    const navHeight = nav?.offsetHeight ?? 0
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 10

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })
  }

  return (
    <>
      <header className="pill-nav" aria-label="Primary">
        <nav className="pill-nav-track">
          <a
            className="pill-nav-link pill-nav-icon-link"
            href="#top"
            onClick={(event) => handleSectionNavClick(event, 'top')}
            aria-label="Back to top"
            title="Home"
          >
            <HomeIcon />
          </a>
          <a className="pill-nav-link" href="#projects" onClick={(event) => handleSectionNavClick(event, 'projects')}>
            Projects
          </a>
          <a className="pill-nav-link" href="#about" onClick={(event) => handleSectionNavClick(event, 'about')}>
            About Me
          </a>
          <a
            className="pill-nav-link pill-nav-icon-link"
            href="https://github.com/ivan-yung"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            className="pill-nav-link pill-nav-icon-link"
            href="https://www.linkedin.com/in/ikyung"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </nav>
      </header>

      <main className="app-shell" id="top">
        <section className="canvas-wrap">
          <PcbDisplay scrollY={scrollY} />
        </section>

        <section className="scroll-space" aria-hidden="true" />
      </main>

      <Projects />
      <AboutMe />
    </>
  )
}

export default App
