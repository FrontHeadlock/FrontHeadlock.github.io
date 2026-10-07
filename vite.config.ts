import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// 히어로 ASCII 샘플링(useAsciiHero)이 JetBrains Mono 로드를 기다리므로, 빌드 시 해시된 라틴 서브셋을
// HTML <head>에서 preload해 React 렌더 전에 폰트가 도착하게 한다. 개발 서버(bundle 없음)에서는 생략한다.
function preloadHeroFont(): Plugin {
  return {
    name: 'preload-hero-font',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        // tsconfig.node.json의 lib가 ES5 수준이라 Array.prototype.find 대신 filter를 쓴다.
        const [asset] = Object.keys(ctx.bundle ?? {}).filter((name) => /jetbrains-mono-latin-wght-normal-.*\.woff2$/.test(name))
        if (!asset) {
          return []
        }

        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: true, href: `/${asset}` },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadHeroFont()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/shared/test/setup.ts',
    css: true,
    globals: true,
  },
})
