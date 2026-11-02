import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"Pretendard Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // 터미널 라벨 토큰. 흩어져 있던 10~11px / 0.12~0.28em 임의값을 세 단계 크기(xs: 헤더 보조 라벨 전용)와 세 단계 자간으로 묶는다.
      fontSize: {
        'label-xs': ['10px', { lineHeight: '0.875rem' }],
        'label-sm': ['11px', { lineHeight: '1rem' }],
        label: ['12px', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        'label-tight': '0.1em',
        label: '0.2em',
        'label-wide': '0.28em',
      },
      // 카드(프레임·카드·패널)와 카드 내부 요소(행·블록·메트릭) 두 단계. 알약형(full)은 칩·내비 전용.
      borderRadius: {
        card: '1.25rem',
        inner: '0.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config
