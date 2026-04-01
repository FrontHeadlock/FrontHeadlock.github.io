import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

class MockIntersectionObserver implements IntersectionObserver {
  private readonly callback: IntersectionObserverCallback
  private readonly elements = new Set<Element>()
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    ;(globalThis as { __mockIntersectionObservers?: MockIntersectionObserver[] }).__mockIntersectionObservers ??= []
    ;(globalThis as { __mockIntersectionObservers?: MockIntersectionObserver[] }).__mockIntersectionObservers?.push(this)
  }

  disconnect() {
    this.elements.clear()
  }

  observe(element: Element) {
    this.elements.add(element)
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  trigger(isIntersecting: boolean) {
    const targets = this.elements.size > 0 ? [...this.elements] : [document.body]
    const entries = targets.map(
      (element) =>
        ({
          isIntersecting,
          target: element,
          intersectionRatio: isIntersecting ? 1 : 0,
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRect: element.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        }) satisfies IntersectionObserverEntry,
    )

    this.callback(entries, this)
  }

  unobserve(element: Element) {
    this.elements.delete(element)
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  configurable: true,
  value: () => ({
    fillRect: () => undefined,
    fillText: () => undefined,
    clearRect: () => undefined,
    setTransform: () => undefined,
    font: '',
    fillStyle: '',
  }),
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

vi.mock('framer-motion', () => {
  const stripMotionProps = (props: Record<string, unknown>) => {
    const {
      animate,
      exit,
      initial,
      layout,
      layoutId,
      transition,
      viewport,
      whileHover,
      whileInView,
      ...rest
    } = props

    return rest
  }

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) =>
          React.createElement(tag, { ...stripMotionProps(props), ref }, children),
        ),
    },
  )

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion,
  }
})
