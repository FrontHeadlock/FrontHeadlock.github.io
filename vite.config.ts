import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { buildPretendardSubset } from './scripts/pretendard-subset.mjs'

// 첫 그리기에 필요한 두 글꼴을 HTML <head>에서 preload해 CSS 파싱을 기다리지 않고 받기 시작한다.
// - JetBrains Mono 라틴: 히어로 ASCII 샘플링(useAsciiHero)이 이 글꼴 로드를 기다린다.
// - Pretendard 사이트 서브셋: 본문 글꼴. LCP 요소(히어로 요약 문단)가 이 글꼴로 그려진다.
// 개발 서버(bundle 없음)에서는 생략한다.
const PRELOADED_FONTS = [/jetbrains-mono-latin-wght-normal-.*\.woff2$/, /PretendardVariable\.site-.*\.woff2$/]

function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((name) => PRELOADED_FONTS.some((pattern) => pattern.test(name)))
          .map((asset) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: true, href: `/${asset}` },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

// 본문 글꼴 서브셋을 빌드·개발 서버·테스트 시작 시 생성한다. 이유와 방식은 scripts/pretendard-subset.mjs 머리말 참고.
function pretendardSubset(): Plugin {
  return {
    name: 'pretendard-subset',
    async buildStart() {
      await buildPretendardSubset({ announce: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), pretendardSubset(), preloadFonts()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/shared/test/setup.ts',
    css: true,
    globals: true,
  },
})
