/**
 * 사이트에 실제 쓰이는 글자만 담은 Pretendard 서브셋을 만든다.
 *
 * 왜: Pretendard 동적 서브셋 CSS는 한글을 빈도순 파일 90여 개로 쪼개 두고 페이지에 등장한 글자만큼 내려받는다.
 * 이 포트폴리오의 한국어 본문은 그중 15개(약 441KB)를 끌어와 첫 그리기 경로를 막았다(Lighthouse 성능 0.94 → 0.80).
 * 본문 글자는 800자 안팎이므로, 그 글자와 실제 쓰는 굵기(400–700)만 남기면 파일 1개 약 105KB로 끝난다.
 *
 * 어떻게: src/**\/*.ts(x)와 index.html에서 비ASCII 글자를 모은다(주석 줄은 제외). 여기에 ASCII·라틴-1·일반 문장부호·
 * 화살표·한글 호환 자모를 항상 더해, 커맨드 팔레트 입력처럼 원고 밖 글자도 어느 정도 받아낸다.
 * 원고(entities/*\/data.ts)를 고치면 다음 빌드·개발 서버·테스트 시작 때 자동으로 다시 만들어진다(vite.config.ts 플러그인).
 *
 * 단독 실행: node scripts/pretendard-subset.mjs
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const SOURCE_FONT = 'node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2'
const OUT_FILE = 'src/shared/styles/fonts/PretendardVariable.site.woff2'
const WEIGHT_RANGE = { min: 400, max: 700 }

// 원고에 없어도 항상 포함하는 범위: ASCII, 라틴-1 보충, 일반 문장부호(– — ‘ ’ “ ” … ‰ ′ ″ ‹ ›), 화살표, 한글 호환 자모.
const ALWAYS_INCLUDED_RANGES = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2027],
  [0x2030, 0x203a],
  [0x2190, 0x2199],
  [0x3131, 0x3163],
]

const COMMENT_LINE = /^\s*(\/\/|\/\*|\*\s|\*\/)/
const HTML_COMMENT = /<!--[\s\S]*?-->/g

async function listSourceFiles(root) {
  const entries = await readdir(path.join(root, 'src'), { recursive: true, withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath ?? entry.path, entry.name))
    .filter((file) => !file.includes(`${path.sep}test${path.sep}`))
  files.push(path.join(root, 'index.html'))
  return files.sort()
}

async function collectCharacters(root) {
  const characters = new Set()
  for (const [from, to] of ALWAYS_INCLUDED_RANGES) {
    for (let codePoint = from; codePoint <= to; codePoint += 1) {
      characters.add(String.fromCodePoint(codePoint))
    }
  }

  for (const file of await listSourceFiles(root)) {
    const source = await readFile(file, 'utf8')
    const text = source
      .split('\n')
      .filter((line) => !COMMENT_LINE.test(line))
      .join('\n')
      .replace(HTML_COMMENT, '')
    for (const character of text) {
      if (character.codePointAt(0) > 0x7f) {
        characters.add(character)
      }
    }
  }

  return [...characters].sort()
}

export async function buildPretendardSubset({
  root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  announce = false,
} = {}) {
  const characters = await collectCharacters(root)
  const text = characters.join('')
  const hangul = characters.filter((character) => character >= '가' && character <= '힣').length

  const source = await readFile(path.join(root, SOURCE_FONT))
  const subset = await subsetFont(source, text, { targetFormat: 'woff2', variationAxes: { wght: WEIGHT_RANGE } })

  const outFile = path.join(root, OUT_FILE)
  let changed = true
  try {
    changed = !(await readFile(outFile)).equals(subset)
  } catch {
    // 아직 생성된 적 없음
  }
  if (changed) {
    await mkdir(path.dirname(outFile), { recursive: true })
    await writeFile(outFile, subset)
  }

  const result = { outFile, chars: characters.length, hangul, bytes: subset.length, changed }
  if (announce && changed) {
    console.log(`[pretendard-subset] ${describeSubset(result)}`)
  }
  return result
}

export function describeSubset(result) {
  return `Pretendard 서브셋: ${result.chars}자(한글 ${result.hangul}자), ${result.bytes.toLocaleString('en-US')}B${result.changed ? '' : ' (변경 없음)'}`
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await buildPretendardSubset()
  console.log(`${describeSubset(result)} → ${path.relative(process.cwd(), result.outFile)}`)
}
