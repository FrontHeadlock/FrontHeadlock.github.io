import { prepareWithSegments } from '@chenglou/pretext'
import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SkipButton } from './SkipButton'
import {
  KOREA_PENINSULA_BOUNDS,
  NORTH_KOREA_MAINLAND_LONLAT,
  SOUTH_KOREA_MAINLAND_LONLAT,
} from './koreaPeninsulaCoords'
import '../../shared/styles/onboarding.css'

const CODE_RAIN_CHARSET = 'アイウエオカキクケコ0123456789{}[]<>/\\+-=*&#$'
const GLYPH_SOURCE = '01{}[]<>/\\|+-=*#%ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const HERO_DECODE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{}<>/\\|'
const HERO_SPRING = 0.042
const HERO_DAMPING = 0.88
const HERO_MOUSE_RADIUS = 94
const HERO_MOUSE_FORCE = 3.2
const CODE_POOL = [
  'func (s *GatewayService) SyncReplica(ctx context.Context, nodeID string) error {',
  'payload, err := json.Marshal(frame)',
  'if err != nil { return fmt.Errorf("marshal frame: %w", err) }',
  'defer tx.Rollback()',
  'rows, err := db.QueryContext(ctx, stmt, args...)',
  'if err := repo.UpsertBatch(ctx, models); err != nil { return err }',
  'private final ConcurrentHashMap<String, RouteEntry> routeTable = new ConcurrentHashMap<>();',
  'CompletableFuture<Result> future = executor.submit(() -> handler.execute(command));',
  'if (Objects.isNull(token) || token.isBlank()) throw new UnauthorizedException("invalid token");',
  'for (int i = 0; i < buffer.length; i++) { checksum ^= (buffer[i] & 0xff); }',
  'builder.setRetryPolicy(new ExponentialBackoffPolicy(3, Duration.ofMillis(120)));',
  'func hashMix(x uint32) uint32 { x ^= x >> 16; x *= 0x7feb352d; return x ^ (x >> 15) }',
  'if err := kafkaWriter.WriteMessages(ctx, msg); err != nil { return err }',
  'log.Printf("trace request_id=%s latency_ms=%d", requestID, latency.Milliseconds())',
  'var wg sync.WaitGroup',
  'public record SlotRange(int start, int end) {}',
  'if err := validator.Struct(req); err != nil { return fiber.NewError(fiber.StatusBadRequest) }',
  'final var merged = left.stream().collect(Collectors.toMap(Key::id, Function.identity()));',
  'ctx, cancel := context.WithTimeout(ctx, 2*time.Second)',
  'result = repository.findByUserIdAndStatus(userId, Status.ACTIVE);',
]

const JAVA_CODE_BLOCK_TEMPLATES = [
  [
    'func (s *RouteService) ReconcileFrame(ctx context.Context, req ReconcileRequest) error {',
    '  frame, err := s.repo.AllocFrame(ctx, req.NodeID)',
    '  if err != nil { return fmt.Errorf("alloc frame: %w", err) }',
    '  if err := s.repo.BindPage(ctx, req.VirtualAddr, frame.PhysicalAddr); err != nil {',
    '    return fmt.Errorf("bind page: %w", err)',
    '  }',
    '  return s.flushTLB(ctx, req.CoreID, frame)',
    '}',
  ],
  [
    'public int hashMix(int value) {',
    '  int x = value;',
    '  x ^= (x >>> 16);',
    '  x *= 0x7feb352d;',
    '  x ^= (x >>> 15);',
    '  x *= 0x846ca68b;',
    '  return x ^ (x >>> 16) ^ 0xA5A5A5A5;',
    '}',
  ],
  [
    'public CompletionStage<Void> syncReplica(Node node) {',
    '  return socket.readAsync(buffer)',
    '    .thenApply(packet -> auth.verify(packet.token(), node.scope()))',
    '    .thenCompose(valid -> decryptor.decryptAsync(valid.payload(), node.key()))',
    '    .thenCompose(frame -> checkpointService.store(node.id(), frame.sequence()))',
    '    .thenCompose(v -> commitService.commit(node.id()))',
    '    .exceptionally(ex -> { throw new ReplicaSyncException(ex); });',
    '}',
  ],
  [
    'for i := 0; i < len(ring); i++ {',
    '  signal := (seed*1664525 + 1013904223) & 0xffffffff',
    '  ring[i] = uint16(signal & 0xffff)',
    '  jitter := int((ring[i] ^ uint16(i)) & 0x7f)',
    '  entropy += jitter',
    '  if (ring[i] & 0x3f) == 0 { break }',
    '  if entropy > threshold { seed ^= uint32(entropy) }',
    '}',
  ],
]

const GO_CODE_BLOCK_TEMPLATES = [
  [
    'func checksum(frame *Frame, seed uint32) uint32 {',
    '  crc := ^uint32(0)',
    '  for _, b := range frame.Payload {',
    '    crc ^= uint32(b)',
    '    for i := 0; i < 8; i++ {',
    '      if crc&1 == 1 {',
    '        crc = (crc >> 1) ^ 0xEDB88320',
    '      } else {',
    '        crc >>= 1',
    '      }',
    '    }',
    '  }',
    '  return ^crc',
  ].map((line) => ` ${line}`),
  [
    'func routeEvent(ctx context.Context, payload MessagePayload) error {',
    '  if err := validator.Struct(payload); err != nil {',
    '    return fmt.Errorf("invalid payload: %w", err)',
    '  }',
    '  return bus.Dispatch(ctx, Event{',
    '    Name: payload.Name,',
    '    Value: payload.Value,',
    '    Meta: payload.Meta,',
    '  })',
  ].map((line) => ` ${line}`),
  [
    'func connectNode(node string) (*grpc.ClientConn, error) {',
    '  conn, err := grpc.Dial(node, grpc.WithTransportCredentials(insecure.NewCredentials()))',
    '  if err != nil {',
    '    return nil, err',
    '  }',
    '  return conn, nil',
  ].map((line) => ` ${line}`),
]

const CODE_BLOCK_LINE_PLAN: number[] = [13, 13, 9, 11, 11, 12, 13, 9]

const LEFT_BLOCK_COUNT = 4
const CENTER_BLOCK_COUNT = 2
const RIGHT_BLOCK_COUNT = 0

type MatrixOnboardingProps = {
  onComplete: () => void
}

type RainColumn = {
  x: number
  y: number
  speed: number
  alpha: number
  size: number
  depth: number
  charShift: number
}

type CodeBlock = {
  id: number
  text: string
  lines: string[]
  font: string
  fontSize: number
  charAdvance: number
  lineHeight: number
  x: number
  y: number
  width: number
  height: number
  angle: number
  driftX: number
  driftY: number
  phase: number
  jitter: number
}

type DotNode = {
  x: number
  y: number
  phase: number
  flashPhase: number
  flashSpeed: number
}

type MapLayer = {
  dots: DotNode[]
  centerX: number
  centerY: number
  radiusX: number
  radiusY: number
}

type CodeGlyphParticle = {
  localX: number
  localY: number
  x: number
  y: number
  vx: number
  vy: number
  char: string
  finalChar: string
  phase: number
  revealDelay: number
}

type WireHub = {
  centerX: number
  centerY: number
  radiusX: number
  radiusY: number
}

type HoverTarget =
  | { kind: 'none'; group: 0 }
  | { kind: 'block'; group: 1; centerX: number; centerY: number; blockId: number }
  | { kind: 'hub'; group: 2; centerX: number; centerY: number }
  | { kind: 'map'; group: 3; centerX: number; centerY: number }

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function pointInPolygon(x: number, y: number, polygon: Array<[number, number]>) {
  let inside = false
  for (let index = 0, prev = polygon.length - 1; index < polygon.length; prev = index, index += 1) {
    const [x1, y1] = polygon[index]!
    const [x2, y2] = polygon[prev]!
    const intersects = (y1 > y) !== (y2 > y) && x < ((x2 - x1) * (y - y1)) / ((y2 - y1) || 1e-4) + x1
    if (intersects) {
      inside = !inside
    }
  }
  return inside
}

function createGlyphPalette(font: string, targetWidth: number) {
  const ranked = GLYPH_SOURCE.split('').map((char) => {
    const prepared = prepareWithSegments(char, font)
    const width = prepared.widths[0] ?? 0
    return { char, width }
  })

  return ranked
    .sort((left, right) => Math.abs(left.width - targetWidth) - Math.abs(right.width - targetWidth))
    .slice(0, Math.max(10, Math.floor(ranked.length * 0.5)))
    .map((entry) => entry.char)
}

function createRainColumns(width: number, height: number) {
  const tiers = [
    { size: 10, speed: 40, alpha: 0.16, depth: 0.16, spacing: 15 },
    { size: 12, speed: 62, alpha: 0.2, depth: 0.3, spacing: 18 },
    { size: 14, speed: 92, alpha: 0.27, depth: 0.46, spacing: 22 },
    { size: 17, speed: 130, alpha: 0.36, depth: 0.62, spacing: 28 },
  ]

  const columns: RainColumn[] = []

  for (let tierIndex = 0; tierIndex < tiers.length; tierIndex += 1) {
    const tier = tiers[tierIndex]!
    for (let x = -tier.spacing; x < width + tier.spacing; x += tier.spacing) {
      columns.push({
        x: x + (Math.random() - 0.5) * tier.spacing * 0.8,
        y: Math.random() * -height,
        speed: tier.speed * (0.85 + Math.random() * 0.4),
        alpha: tier.alpha * (0.8 + Math.random() * 0.4),
        size: tier.size,
        depth: tier.depth,
        charShift: Math.random() * CODE_RAIN_CHARSET.length,
      })
    }
  }

  return columns
}

function createCodeBlocks(width: number, height: number) {
  const count = LEFT_BLOCK_COUNT + CENTER_BLOCK_COUNT + RIGHT_BLOCK_COUNT
  const blocks: CodeBlock[] = []
  const blockRects: Array<{ left: number; top: number; right: number; bottom: number }> = []
  const leftBoundary = 0.03
  const leftLimit = 0.46
  const centerLimit = 0.84
  const rightLimit = 0.46

  const anchors: Array<[number, number]> = [
    [0.06, 0.14],
    [0.12, 0.24],
    [0.14, 0.46],
    [0.12, 0.62],
    [0.66, 0.2],
    [0.58, 0.36],
    [0.63, 0.31],
    [0.67, 0.60],
  ]

  const leftSkew = (idx: number) => {
    if (idx % 2 === 0) {
      return (Math.random() - 0.5) * 0.02
    }
    if (idx % 3 === 0) {
      return (Math.random() - 0.5) * 0.04
    }
    return 0
  }

  const lineLengthBias: Array<number> = [0, 1, 2, 3, 0, 1, 2, 3, 4]
  const jitterX = (Math.random() - 0.5) * width * 0.008
  const jitterY = (Math.random() - 0.5) * height * 0.008

  const hasOverlap = (
    rect: { left: number; top: number; right: number; bottom: number },
    margin: number,
    others: Array<{ left: number; top: number; right: number; bottom: number }>,
  ) => {
    const expandedTop = rect.top - margin
    const expandedBottom = rect.bottom + margin
    const expandedLeft = rect.left - margin
    const expandedRight = rect.right + margin
    return others.some(
      (other) =>
        expandedLeft < other.right &&
        expandedRight > other.left &&
        expandedTop < other.bottom &&
        expandedBottom > other.top,
    )
  }

  const resolveBlockRect = (
    baseX: number,
    baseY: number,
    blockW: number,
    blockH: number,
    margin: number,
    zoneRight: number,
    maxY: number,
  ) => {
    const minX = leftBoundary + 2
    const maxX = Math.max(minX, zoneRight - blockW - 8)
    let x = clamp(baseX, minX, maxX)
    let rect = { left: x, top: baseY, right: x + blockW, bottom: baseY + blockH }

    if (!hasOverlap(rect, margin, blockRects)) {
      return rect
    }

    const maxAttempts = 48
    const baseStep = Math.max(height * 0.045, 10)
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const direction = attempt % 2 === 0 ? 1 : -1
      const step = Math.floor(attempt / 2) + 1
      const candidateY = clamp(baseY + direction * step * baseStep, 8, maxY)
      const candidateX = clamp(baseX + direction * (step % 3) * 6 + (Math.sin(attempt * 0.5) * 8), minX, maxX)
      const candidate = {
        left: candidateX,
        top: candidateY,
        right: candidateX + blockW,
        bottom: candidateY + blockH,
      }
      if (!hasOverlap(candidate, margin, blockRects)) {
        return candidate
      }
      rect = candidate
    }

    const fallbackY = clamp(baseY + Math.max(24, height * 0.08), 8, maxY)
    const fallback: { left: number; top: number; right: number; bottom: number } = {
      left: x,
      top: fallbackY,
      right: x + blockW,
      bottom: fallbackY + blockH,
    }
    return fallback
  }

  const normalizeCodeLine = (line: string, maxChars: number) => {
    const sanitized = line.replace(/\t/g, '  ').trimEnd()
    if (sanitized.length <= maxChars) {
      return sanitized
    }
    const hardLimit = Math.max(24, maxChars)
    const sliced = sanitized.slice(0, hardLimit)
    const breakpoints = [' ', ',', ')', '{', '}', '.', ':']
    let cutIndex = -1
    for (let index = 0; index < breakpoints.length; index += 1) {
      cutIndex = Math.max(cutIndex, sliced.lastIndexOf(breakpoints[index]!))
    }
    const minNaturalCut = Math.floor(maxChars * 0.58)
    return cutIndex >= minNaturalCut ? sliced.slice(0, cutIndex).trimEnd() : sliced.trimEnd()
  }

  for (let index = 0; index < count; index += 1) {
    const isLeftBlock = index < LEFT_BLOCK_COUNT
    const isCenterBlock = index >= LEFT_BLOCK_COUNT && index < LEFT_BLOCK_COUNT + CENTER_BLOCK_COUNT
    const isRightBlock = !isLeftBlock && !isCenterBlock
    const maxChars = isLeftBlock ? 72 : isCenterBlock ? 78 : 82
    const templatePool = isRightBlock ? GO_CODE_BLOCK_TEMPLATES : JAVA_CODE_BLOCK_TEMPLATES
    const template = templatePool[Math.floor(Math.random() * templatePool.length)]!
    const targetLines = CODE_BLOCK_LINE_PLAN[index] ?? 8
    const injected = template.map((line, lineIndex) => {
      if (lineIndex === 0 && Math.random() > 0.5) {
        return line.replace('(', `_${Math.floor(Math.random() * 90 + 10)}(`)
      }
      if (Math.random() > 0.74) {
        return `${line} // trace`
      }
      return line
    })
    const lines = injected.slice(0, targetLines)
    for (let lineIndex = lines.length; lineIndex < targetLines; lineIndex += 1) {
      const poolLine = CODE_POOL[(lineIndex + index * 3) % CODE_POOL.length] ?? 'NOP_OP'
      lines.push(poolLine.replace(/\s+/g, ' ').trim())
    }

    const maxAllowedLines = targetLines + 3
    const finalLines = lines
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .map((line) => normalizeCodeLine(line, maxChars))
      .slice(0, maxAllowedLines)
    while (finalLines.length < targetLines) {
      finalLines.push('// sync()')
    }

    const widthJitter = 1 - (index % 3) * 0.03
    const fontSize = clamp(Math.round(isLeftBlock ? 11 + Math.random() * 3 : 12 + Math.random() * 5), isLeftBlock ? 11 : 12, isLeftBlock ? 14 : 17)
    const lineHeight = Math.round(fontSize * 1.2)
    const zoneLimit = isLeftBlock ? leftLimit : isCenterBlock ? centerLimit : rightLimit
    const maxLineWidth = clamp(
      width * (isLeftBlock ? 0.24 + Math.random() * 0.06 : isCenterBlock ? 0.27 + Math.random() * 0.06 : 0.3 + Math.random() * 0.08) -
        widthJitter * 3,
      isLeftBlock ? 250 : isCenterBlock ? 280 : 320,
      isLeftBlock ? 420 : isCenterBlock ? 460 : 520,
    )
    const fontWeight = Math.random() > 0.56 ? 600 : 500
    const font = `${fontWeight} ${fontSize}px "JetBrains Mono", "SF Mono", monospace`
    const variant = finalLines.join('\n')
    const widthEstimate = clamp(Math.max(...finalLines.map((line) => line.length * fontSize * 0.57), 170), 170, maxLineWidth)
    const blockWidth = widthEstimate + 10
    const blockHeight = finalLines.length * lineHeight + 8
    const [ax, ay] = anchors[index % anchors.length] ?? [Math.random(), Math.random()]
    const skew = leftSkew(index)
    const targetX = width * (ax + skew) - blockWidth * 0.5 + jitterX
    const targetY = height * (ay - 0.03) - blockHeight * 0.45 + jitterY
    const rect = resolveBlockRect(
      targetX,
      targetY,
      blockWidth,
      blockHeight,
      isLeftBlock ? 9 : 11,
      width * zoneLimit,
      height - blockHeight - 8,
    )

    const nextBlock = {
      id: index,
      text: variant,
      lines: finalLines,
      font,
      fontSize,
      charAdvance: fontSize * 0.58,
      lineHeight,
      x: rect.left,
      y: rect.top,
      width: blockWidth,
      height: blockHeight,
      angle: index >= 7 ? ((Math.random() * 10 - 5) * Math.PI) / 180 : ((Math.random() * 18 - 10) * Math.PI) / 180,
      driftX: (Math.random() - 0.5) * 6,
      driftY: (Math.random() - 0.5) * 6,
      phase: (index % 6) * 0.38 + Math.random() * 0.3,
      jitter: 0.35 + lineLengthBias[index % lineLengthBias.length] * 0.05 + Math.random() * 0.45,
    }

    blocks.push(nextBlock)
    blockRects.push({
      left: nextBlock.x,
      top: nextBlock.y,
      right: nextBlock.x + nextBlock.width,
      bottom: nextBlock.y + nextBlock.height,
    })
  }

  return blocks
}

function createMapLayer(width: number, height: number): MapLayer {
  const mapWidth = width * 0.35
  const mapHeight = height * 0.35
  const anchorX = width * 0.65
  const anchorY = height * 0.7
  const spacing = clamp(Math.floor(mapWidth / 42), 6, 10)
  const dots: DotNode[] = []

  for (let y = spacing; y < mapHeight - spacing; y += spacing) {
    for (let x = spacing; x < mapWidth - spacing; x += spacing) {
      const nx = x / mapWidth
      const ny = y / mapHeight
      const lon = KOREA_PENINSULA_BOUNDS.minLon + nx * (KOREA_PENINSULA_BOUNDS.maxLon - KOREA_PENINSULA_BOUNDS.minLon)
      const lat = KOREA_PENINSULA_BOUNDS.maxLat - ny * (KOREA_PENINSULA_BOUNDS.maxLat - KOREA_PENINSULA_BOUNDS.minLat)
      const inSouth = pointInPolygon(lon, lat, SOUTH_KOREA_MAINLAND_LONLAT)
      const inNorth = pointInPolygon(lon, lat, NORTH_KOREA_MAINLAND_LONLAT)
      if (!inSouth && !inNorth) {
        continue
      }
      dots.push({
        x: anchorX + x,
        y: anchorY - mapHeight * 0.5 + y,
        phase: Math.random() * Math.PI * 2,
        flashPhase: Math.random() * Math.PI * 2,
        flashSpeed: 0.0009 + Math.random() * 0.0022,
      })
    }
  }

  return {
    dots,
    centerX: anchorX,
    centerY: anchorY,
    radiusX: mapWidth * 0.5,
    radiusY: mapHeight * 0.5,
  }
}

function createWireHub(width: number, height: number): WireHub {
  return {
    centerX: width * 0.86,
    centerY: height * 0.2,
    radiusX: Math.min(width, height) * 0.17,
    radiusY: Math.min(width, height) * 0.14,
  }
}
function createCodeGlyphParticles(block: CodeBlock, width: number, height: number): CodeGlyphParticle[] {
  const particles: CodeGlyphParticle[] = []
  const maxLineLength = Math.max(1, ...block.lines.map((line) => line.length))

  for (let lineIndex = 0; lineIndex < block.lines.length; lineIndex += 1) {
    const line = block.lines[lineIndex]!
    const charStride = line.length > 84 ? 2 : 1
    for (let charIndex = 0; charIndex < line.length; charIndex += charStride) {
      const finalChar = line[charIndex] ?? ' '
      if (finalChar === ' ' || finalChar === '\t') {
        continue
      }

      const localX = -block.width * 0.5 + 2 + charIndex * block.charAdvance
      const localY = -block.height * 0.5 + 4 + lineIndex * block.lineHeight + block.lineHeight * 0.5
      const startX = block.x + (Math.random() - 0.5) * width * 0.42
      const startY = block.y + (Math.random() - 0.5) * height * 1.8
      particles.push({
        localX,
        localY,
        x: startX,
        y: startY,
        vx: 0,
        vy: 0,
        char: HERO_DECODE_CHARSET[Math.floor(Math.random() * HERO_DECODE_CHARSET.length)] ?? '0',
        finalChar,
        phase: Math.random() * Math.PI * 2,
        revealDelay: (charIndex / maxLineLength) * 0.9 + Math.random() * 0.16 + block.id * 0.03,
      })
    }
  }

  return particles
}

function drawWireHub(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  hub: WireHub,
  rotation: number,
  hoverActive: boolean,
  parallaxX: number,
  parallaxY: number,
) {
  const centerX = hub.centerX + parallaxX
  const centerY = hub.centerY + parallaxY
  const baseAlpha = hoverActive ? 0.5 : 0.84
  const radius = Math.min(hub.radiusX, hub.radiusY) * 1.03

  context.save()
  context.lineWidth = 1
  context.strokeStyle = `rgba(66, 255, 118, ${baseAlpha})`
  context.shadowColor = 'rgba(60, 255, 130, 0.58)'
  context.shadowBlur = hoverActive ? 20 : 12

  for (let lat = -70; lat <= 70; lat += 14) {
    const latRad = (lat * Math.PI) / 180
    context.beginPath()
    for (let lon = 0; lon <= 360; lon += 8) {
      const lonRad = ((lon + (rotation * 180) / Math.PI) * Math.PI) / 180
      const px = Math.cos(latRad) * Math.cos(lonRad)
      const py = Math.sin(latRad)
      const pz = Math.cos(latRad) * Math.sin(lonRad)
      const perspective = 0.66 + (pz + 1) * 0.24
      const sx = centerX + px * radius * perspective
      const sy = centerY + py * radius
      if (lon === 0) {
        context.moveTo(sx, sy)
      } else {
        context.lineTo(sx, sy)
      }
    }
    context.stroke()
  }

  for (let lon = 0; lon < 180; lon += 12) {
    const lonRad = ((lon + (rotation * 180) / Math.PI) * Math.PI) / 180
    context.beginPath()
    for (let lat = -86; lat <= 86; lat += 6) {
      const latRad = (lat * Math.PI) / 180
      const px = Math.cos(latRad) * Math.cos(lonRad)
      const py = Math.sin(latRad)
      const pz = Math.cos(latRad) * Math.sin(lonRad)
      const perspective = 0.66 + (pz + 1) * 0.24
      const sx = centerX + px * radius * perspective
      const sy = centerY + py * radius
      if (lat === -86) {
        context.moveTo(sx, sy)
      } else {
        context.lineTo(sx, sy)
      }
    }
    context.stroke()
  }

  context.shadowBlur = 0
  context.restore()
}

export function MatrixOnboarding({ onComplete }: MatrixOnboardingProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const completeRef = useRef(false)
  const interactionMsRef = useRef(0)
  const finishTimeoutRef = useRef<number | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [accessVisible, setAccessVisible] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const finish = useCallback(() => {
    if (completeRef.current) {
      return
    }

    completeRef.current = true
    setIsExiting(true)

    finishTimeoutRef.current = window.setTimeout(() => {
      onComplete()
    }, 420)
  }, [onComplete])

  useEffect(() => {
    const showAccessTimer = window.setTimeout(() => {
      setAccessVisible(true)
    }, 5000)

    const loadingStart = performance.now()
    const loadingTicker = window.setInterval(() => {
      const elapsed = performance.now() - loadingStart
      const progress = clamp(elapsed / 5000, 0, 1)
      setLoadingProgress(progress)
      if (progress >= 1) {
        window.clearInterval(loadingTicker)
      }
    }, 50)

    return () => {
      window.clearTimeout(showAccessTimer)
      window.clearInterval(loadingTicker)
      if (finishTimeoutRef.current !== null) {
        window.clearTimeout(finishTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (stage === null || canvas === null) {
      return
    }

    const screenContext = canvas.getContext('2d')
    if (screenContext === null) {
      return
    }

    const sceneSurface: OffscreenCanvas | HTMLCanvasElement =
      typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(1, 1) : document.createElement('canvas')
    const maskSurface: OffscreenCanvas | HTMLCanvasElement =
      typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(1, 1) : document.createElement('canvas')
    const sceneContext = sceneSurface.getContext('2d')
    const maskContext = maskSurface.getContext('2d')
    if (sceneContext === null || maskContext === null) {
      return
    }

    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0
    let lastFrameTime = performance.now()
    const sceneStartedAt = performance.now()
    let rainColumns: RainColumn[] = []
    let codeBlocks: CodeBlock[] = []
    let codeGlyphByBlock: CodeGlyphParticle[][] = []
    let mapLayer: MapLayer = { dots: [], centerX: 0, centerY: 0, radiusX: 0, radiusY: 0 }
    let wireHub: WireHub = { centerX: 0, centerY: 0, radiusX: 0, radiusY: 0 }
    let wireRotation = 0
    let baseGradient: CanvasGradient | null = null
    let vignetteGradient: CanvasGradient | null = null
    let qualityLevel = window.innerWidth < 900 ? 1 : 0
    let framePressure = 0
    let particleDrawStep = 1
    let maskDrawStep = 2
    let rainColumnStep = 1
    let mapDotStep = 1
    let mapMotionStep = 1
    let codeParticleStep = 1
    let blockHoverIntensity = 0
    let hubHoverIntensity = 0
    let mapHoverIntensity = 0
    let mapOffsetX = new Float32Array(0)
    let mapOffsetY = new Float32Array(0)
    let mapVelocityX = new Float32Array(0)
    let mapVelocityY = new Float32Array(0)

    const pointer = { x: 0, y: 0 }
    const smoothPointer = { x: 0, y: 0 }
    let hasPointerMoved = false
    const toPointerX = gsap.quickTo(smoothPointer, 'x', { duration: 0.22, ease: 'power2.out' })
    const toPointerY = gsap.quickTo(smoothPointer, 'y', { duration: 0.22, ease: 'power2.out' })

    const viewportArea = Math.max(1, window.innerWidth * window.innerHeight)
    const particleCount = Math.floor(
      clamp(
        viewportArea / 420,
        window.innerWidth < 900 ? 1700 : 2300,
        window.innerWidth < 900 ? 2500 : 3600,
      ),
    )
    const particleX = new Float32Array(particleCount)
    const particleY = new Float32Array(particleCount)
    const particleHomeX = new Float32Array(particleCount)
    const particleHomeY = new Float32Array(particleCount)
    const particleVX = new Float32Array(particleCount)
    const particleVY = new Float32Array(particleCount)
    const particleGlyph = new Uint8Array(particleCount)
    const particleGroup = new Uint8Array(particleCount)
    const particlePhase = new Float32Array(particleCount)
    let glyphPalette: string[] = ['0', '1', '#', '{', '}']

    const applyQualityLevel = (level: number) => {
      qualityLevel = level
      if (qualityLevel <= 0) {
        particleDrawStep = 1
        maskDrawStep = 2
        rainColumnStep = 1
        mapDotStep = 1
        mapMotionStep = 1
        codeParticleStep = 1
        return
      }
      if (qualityLevel === 1) {
        particleDrawStep = 2
        maskDrawStep = 3
        rainColumnStep = 1
        mapDotStep = 1
        mapMotionStep = 2
        codeParticleStep = 2
        return
      }
      particleDrawStep = 3
      maskDrawStep = 4
      rainColumnStep = 2
      mapDotStep = 2
      mapMotionStep = 2
      codeParticleStep = 2
    }

    const tuneQuality = (deltaMs: number) => {
      framePressure += deltaMs > 21 ? 1 : -0.55
      framePressure = clamp(framePressure, 0, 60)
      const targetLevel = framePressure > 36 ? 2 : framePressure > 15 ? 1 : 0
      if (targetLevel !== qualityLevel) {
        applyQualityLevel(targetLevel)
      }
    }

    const resizeSurface = (surface: OffscreenCanvas | HTMLCanvasElement, targetWidth: number, targetHeight: number) => {
      surface.width = Math.max(1, Math.floor(targetWidth * dpr))
      surface.height = Math.max(1, Math.floor(targetHeight * dpr))
    }

    const reseedParticles = () => {
      const blockPoints: Array<{ x: number; y: number }> = []
      for (let blockIndex = 0; blockIndex < codeBlocks.length; blockIndex += 1) {
        const block = codeBlocks[blockIndex]!
        const sampleCount = clamp(Math.floor((block.width * block.height) / 1800), 18, 44)
        for (let sample = 0; sample < sampleCount; sample += 1) {
          blockPoints.push({
            x: block.x + Math.random() * block.width,
            y: block.y + Math.random() * block.height,
          })
        }
      }

      const hubPoints: Array<{ x: number; y: number }> = []
      for (let index = 0; index < 900; index += 1) {
        const angle = (index / 900) * Math.PI * 2
        const radius = 0.26 + (Math.sin(index * 0.12) + 1) * 0.33
        hubPoints.push({
          x: wireHub.centerX + Math.cos(angle) * wireHub.radiusX * radius,
          y: wireHub.centerY + Math.sin(angle * 1.11) * wireHub.radiusY * radius,
        })
      }

      const mapPoints: Array<{ x: number; y: number }> = []
      for (let index = 0; index < mapLayer.dots.length; index += 1) {
        const dot = mapLayer.dots[index]!
        mapPoints.push({ x: dot.x, y: dot.y })
      }

      const blockSplit = Math.floor(particleCount * 0.52)
      const hubSplit = blockSplit + Math.floor(particleCount * 0.28)
      for (let index = 0; index < particleCount; index += 1) {
        const isBlockGroup = index < blockSplit
        const isHubGroup = index >= blockSplit && index < hubSplit
        const source = isBlockGroup
          ? blockPoints[Math.floor(Math.random() * blockPoints.length)] ?? { x: width * 0.4, y: height * 0.4 }
          : isHubGroup
            ? hubPoints[Math.floor(Math.random() * hubPoints.length)] ?? { x: wireHub.centerX, y: wireHub.centerY }
            : mapPoints[Math.floor(Math.random() * mapPoints.length)] ?? { x: mapLayer.centerX, y: mapLayer.centerY }

        particleHomeX[index] = source.x
        particleHomeY[index] = source.y
        particleX[index] = source.x
        particleY[index] = source.y
        particleVX[index] = 0
        particleVY[index] = 0
        particleGroup[index] = isBlockGroup ? 1 : isHubGroup ? 2 : 3
        particleGlyph[index] = Math.floor(Math.random() * glyphPalette.length)
        particlePhase[index] = Math.random() * Math.PI * 2
      }
    }

    const layoutScene = () => {
      rainColumns = createRainColumns(width, height)
      codeBlocks = createCodeBlocks(width, height)
      codeGlyphByBlock = codeBlocks.map((block) => createCodeGlyphParticles(block, width, height))
      mapLayer = createMapLayer(width, height)
      wireHub = createWireHub(width, height)
      glyphPalette = createGlyphPalette('600 10px "JetBrains Mono", monospace', clamp(width * 0.011, 8, 11))
      if (glyphPalette.length === 0) {
        glyphPalette = ['0', '1', '#', '{', '}']
      }
      mapOffsetX = new Float32Array(mapLayer.dots.length)
      mapOffsetY = new Float32Array(mapLayer.dots.length)
      mapVelocityX = new Float32Array(mapLayer.dots.length)
      mapVelocityY = new Float32Array(mapLayer.dots.length)
      reseedParticles()
    }

    const resize = () => {
      width = stage.clientWidth
      height = stage.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 900 ? 1.22 : 1.62)

      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      resizeSurface(sceneSurface, width, height)
      resizeSurface(maskSurface, width, height)

      screenContext.setTransform(dpr, 0, 0, dpr, 0, 0)
      sceneContext.setTransform(dpr, 0, 0, dpr, 0, 0)
      maskContext.setTransform(dpr, 0, 0, dpr, 0, 0)

      pointer.x = width * 0.5
      pointer.y = height * 0.5
      smoothPointer.x = pointer.x
      smoothPointer.y = pointer.y

      const sceneGradient = sceneContext.createLinearGradient(0, 0, 0, height)
      sceneGradient.addColorStop(0, 'rgba(0, 16, 4, 0.14)')
      sceneGradient.addColorStop(0.48, 'rgba(0, 5, 0, 0.02)')
      sceneGradient.addColorStop(1, 'rgba(0, 14, 3, 0.18)')
      baseGradient = sceneGradient

      const edgeGradient = screenContext.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.12,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.68,
      )
      edgeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      edgeGradient.addColorStop(1, 'rgba(0, 0, 0, 0.34)')
      vignetteGradient = edgeGradient

      layoutScene()
      maskContext.clearRect(0, 0, width, height)
      applyQualityLevel(window.innerWidth < 900 ? 1 : 0)
    }

    const detectHoverTarget = (x: number, y: number, parallaxX: number, parallaxY: number): HoverTarget => {
      for (let index = 0; index < codeBlocks.length; index += 1) {
        const block = codeBlocks[index]!
        const pad = 18
        if (
          x >= block.x - pad &&
          x <= block.x + block.width + pad &&
          y >= block.y - pad &&
          y <= block.y + block.height + pad
        ) {
          return { kind: 'block', group: 1, centerX: block.x + block.width * 0.5, centerY: block.y + block.height * 0.5, blockId: block.id }
        }
      }

      const mapCenterX = mapLayer.centerX + parallaxX * 0.75
      const mapCenterY = mapLayer.centerY + parallaxY * 0.75
      const mapDx = x - mapCenterX
      const mapDy = y - mapCenterY
      const mapHit = (mapDx * mapDx) / ((mapLayer.radiusX * 0.8) ** 2) + (mapDy * mapDy) / ((mapLayer.radiusY * 0.92) ** 2)
      if (mapHit <= 1.05) {
        return { kind: 'map', group: 3, centerX: mapCenterX, centerY: mapCenterY }
      }

      const hubCenterX = wireHub.centerX + parallaxX * 0.92
      const hubCenterY = wireHub.centerY + parallaxY * 0.92
      const dx = x - hubCenterX
      const dy = y - hubCenterY
      const normalized = (dx * dx) / ((wireHub.radiusX * 0.95) ** 2) + (dy * dy) / ((wireHub.radiusY * 0.95) ** 2)
      if (normalized <= 1.18) {
        return { kind: 'hub', group: 2, centerX: hubCenterX, centerY: hubCenterY }
      }

      return { kind: 'none', group: 0 }
    }

    const drawRain = (timeMs: number, deltaMs: number, parallaxX: number, parallaxY: number) => {
      let cachedSize = -1
      const charsetLength = CODE_RAIN_CHARSET.length

      for (let index = 0; index < rainColumns.length; index += rainColumnStep) {
        const column = rainColumns[index]!
        column.y += column.speed * (deltaMs / 1000)
        column.charShift = (column.charShift + (deltaMs * column.speed) / 540) % charsetLength
        if (column.y > height + column.size * 10) {
          column.y = -Math.random() * height * 0.6
        }

        if (cachedSize !== column.size) {
          cachedSize = column.size
          sceneContext.font = `500 ${column.size}px "JetBrains Mono", "SF Mono", monospace`
          sceneContext.shadowColor = 'rgba(62, 255, 128, 0.4)'
          sceneContext.shadowBlur = column.size < 12 ? 6 : 10
        }

        const x = column.x + parallaxX * column.depth
        const y = column.y + parallaxY * column.depth
        const tailLength = clamp(Math.floor(7 + column.depth * 10), 6, 14)
        const baseCharIndex = Math.floor(column.charShift + timeMs * 0.002 * (0.8 + column.depth))

        for (let tail = 0; tail < tailLength; tail += 1) {
          const char = CODE_RAIN_CHARSET[(baseCharIndex + tail * 3 + index) % charsetLength]!
          const localAlpha = clamp(column.alpha - tail * 0.03, 0.05, column.alpha)
          sceneContext.fillStyle = `rgba(20, 255, 84, ${localAlpha})`
          sceneContext.fillText(char, x, y - tail * (column.size + 2))
        }
      }
    }

    const updateHeroLikeFieldMotion = (deltaMs: number, pointerX: number, pointerY: number) => {
      const dt = deltaMs / 16.6667
      const mapSpring = HERO_SPRING
      const mapDamping = HERO_DAMPING
      const mapRadius = 118
      const mapForce = 2.7

      for (let index = 0; index < mapLayer.dots.length; index += mapMotionStep) {
        const dot = mapLayer.dots[index]!
        const currentX = dot.x + mapOffsetX[index]!
        const currentY = dot.y + mapOffsetY[index]!
        let ax = -mapOffsetX[index]! * mapSpring
        let ay = -mapOffsetY[index]! * mapSpring
        const dx = currentX - pointerX
        const dy = currentY - pointerY
        const distance = Math.hypot(dx, dy)
        if (distance < mapRadius && distance > 0.001) {
          const force = ((1 - distance / mapRadius) ** 2) * mapForce
          ax += (dx / distance) * force
          ay += (dy / distance) * force
        }

        mapVelocityX[index] = (mapVelocityX[index]! + ax * dt) * mapDamping
        mapVelocityY[index] = (mapVelocityY[index]! + ay * dt) * mapDamping
        mapOffsetX[index] += mapVelocityX[index]! * dt
        mapOffsetY[index] += mapVelocityY[index]! * dt
      }
    }

    const drawCodeBlocks = (
      timeMs: number,
      parallaxX: number,
      parallaxY: number,
      hoverTarget: HoverTarget,
      hoverIntensity: number,
    ) => {
      const elapsed = (timeMs - sceneStartedAt) / 1000
      for (let index = 0; index < codeBlocks.length; index += 1) {
        const block = codeBlocks[index]!
        const driftX = Math.sin(timeMs * 0.00044 + block.phase) * block.driftX
        const driftY = Math.cos(timeMs * 0.00036 + block.phase * 1.2) * block.driftY
        const jitter = Math.sin(timeMs * 0.003 + block.phase * 2.1) * block.jitter
        const isHoveredBlock = hoverTarget.kind === 'block' && hoverTarget.blockId === block.id
        const localHover = isHoveredBlock ? hoverIntensity : hoverIntensity * 0.28
        const liftY = -6 * localHover
        const centerX = block.x + driftX + parallaxX * 0.4 + block.width * 0.5
        const centerY = block.y + driftY + parallaxY * 0.4 + liftY + block.height * 0.5
        const rotation = block.angle + jitter * 0.002 + localHover * 0.005
        const cos = Math.cos(rotation)
        const sin = Math.sin(rotation)

        const particles = codeGlyphByBlock[index] ?? []
        sceneContext.save()
        sceneContext.font = block.font
        sceneContext.textAlign = 'center'
        sceneContext.textBaseline = 'middle'
        sceneContext.shadowColor = `rgba(54, 255, 118, ${0.34 + localHover * 0.22})`
        const codeBlurEnabled = (Math.floor(timeMs / 34) + index) % 10 !== 0
        sceneContext.shadowBlur = codeBlurEnabled ? 8 + localHover * 6 : 0
        const particleStep = isHoveredBlock ? 1 : codeParticleStep

        for (let particleIndex = 0; particleIndex < particles.length; particleIndex += particleStep) {
          const particle = particles[particleIndex]!
          const tx = centerX + particle.localX * cos - particle.localY * sin
          const ty = centerY + particle.localX * sin + particle.localY * cos

          particle.vx += (tx - particle.x) * HERO_SPRING
          particle.vy += (ty - particle.y) * HERO_SPRING

          const dx = particle.x - smoothPointer.x
          const dy = particle.y - smoothPointer.y
          const distance = Math.hypot(dx, dy)
          const localRadius = HERO_MOUSE_RADIUS + localHover * 36
          const localForce = HERO_MOUSE_FORCE + localHover * 1.5
          if (distance < localRadius && distance > 0.0001) {
            const force = ((1 - distance / localRadius) ** 2) * localForce
            particle.vx += (dx / distance) * force
            particle.vy += (dy / distance) * force
          }

          particle.vx *= HERO_DAMPING
          particle.vy *= HERO_DAMPING
          particle.x += particle.vx
          particle.y += particle.vy

          const revealed = Math.max(0, elapsed - particle.revealDelay)
          const decodeAlpha = Math.min(1, revealed / 0.16)
          const frameSeed = Math.floor(timeMs * 0.032 + particle.phase * 1000 + particleIndex * 7)
          if (revealed < 0.72) {
            const lookup = frameSeed % HERO_DECODE_CHARSET.length
            particle.char = HERO_DECODE_CHARSET[lookup] ?? '0'
          } else {
            particle.char = particle.finalChar
          }

          const idleJitter = Math.sin(elapsed * 1.2 + particle.phase) * (0.7 + localHover * 0.35)
          sceneContext.globalAlpha = Math.min(0.96, 0.2 + decodeAlpha * 0.72 + localHover * 0.14)
          sceneContext.fillStyle = 'rgba(34, 255, 92, 1)'
          sceneContext.fillText(particle.char, particle.x, particle.y + idleJitter)
          sceneContext.globalAlpha = Math.min(0.45, 0.06 + decodeAlpha * 0.28 + localHover * 0.08)
          sceneContext.fillStyle = 'rgba(32, 190, 255, 1)'
          sceneContext.fillText(particle.char, particle.x - 0.7, particle.y + idleJitter - 0.25)
        }

        sceneContext.globalAlpha = 1
        sceneContext.shadowBlur = 0
        sceneContext.restore()
      }
    }

    const drawMap = (timeMs: number, parallaxX: number, parallaxY: number, hoverIntensity: number) => {
      const anchorX = mapLayer.centerX + parallaxX * 0.45
      const anchorY = mapLayer.centerY + parallaxY * 0.23 - hoverIntensity * 4

      sceneContext.save()
      sceneContext.translate(anchorX, anchorY)
      sceneContext.rotate(-0.26)
      sceneContext.translate(-anchorX, -anchorY)
      sceneContext.textAlign = 'center'
      sceneContext.textBaseline = 'middle'
      sceneContext.font = `${12 + hoverIntensity * 1.8}px "JetBrains Mono", "SF Mono", monospace`
      sceneContext.shadowColor = `rgba(52, 255, 120, ${0.62 + hoverIntensity * 0.24})`
      const mapBlurEnabled = Math.floor(timeMs / 34) % 10 !== 0
      sceneContext.shadowBlur = mapBlurEnabled ? 12 + hoverIntensity * 6 : 0
      for (let index = 0; index < mapLayer.dots.length; index += mapDotStep) {
        const dot = mapLayer.dots[index]!
        const pulse = 0.38 + (Math.sin(timeMs * 0.004 + dot.phase) + 1) * 0.27
        const flashEnvelope = Math.sin(timeMs * dot.flashSpeed + dot.flashPhase)
        const flash = flashEnvelope > 0.985 ? (flashEnvelope - 0.985) * 18 : 0
        sceneContext.globalAlpha = clamp(pulse + flash + hoverIntensity * 0.14, 0.18, 0.98)
        sceneContext.fillStyle = `rgba(70, 255, 118, ${0.92 + hoverIntensity * 0.06})`
        const ox = mapOffsetX[index] ?? 0
        const oy = mapOffsetY[index] ?? 0
        sceneContext.fillText('.', dot.x + ox, dot.y + oy)
      }
      sceneContext.globalAlpha = 1
      sceneContext.shadowBlur = 0
      sceneContext.restore()
    }

    const updateParticles = (
      timeMs: number,
      deltaMs: number,
      target: HoverTarget,
      pointerX: number,
      pointerY: number,
      blockBurstGain: number,
    ) => {
      const dt = deltaMs / 16.6667
      const burstRadius = clamp(Math.min(width, height) * 0.26, 110, 240)
      const interactionActive = hasPointerMoved && target.group !== 0

      if (interactionActive) {
        interactionMsRef.current += deltaMs
      }

      for (let index = 0; index < particleCount; index += 1) {
        const homeDx = particleHomeX[index]! - particleX[index]!
        const homeDy = particleHomeY[index]! - particleY[index]!
        let ax = homeDx * 0.058 - particleVX[index]! * 0.108
        let ay = homeDy * 0.058 - particleVY[index]! * 0.108

        if (interactionActive && particleGroup[index] === target.group) {
          const fromPointerX = particleX[index]! - pointerX
          const fromPointerY = particleY[index]! - pointerY
          const distance = Math.hypot(fromPointerX, fromPointerY) + 0.001
          if (distance < burstRadius) {
            const burstScale = target.group === 1 ? blockBurstGain : 1
            const power = ((burstRadius - distance) / burstRadius) ** 1.9 * 2.3 * burstScale
            ax += (fromPointerX / distance) * power
            ay += (fromPointerY / distance) * power
            ax += Math.sin(timeMs * 0.002 + particlePhase[index]!) * 0.05
            ay += Math.cos(timeMs * 0.0018 + particlePhase[index]!) * 0.05
          }
        }

        particleVX[index] = (particleVX[index]! + ax * dt) * 0.986
        particleVY[index] = (particleVY[index]! + ay * dt) * 0.986
        particleX[index] += particleVX[index]! * dt
        particleY[index] += particleVY[index]! * dt
      }
    }

    const drawParticlesAndMask = (timeMs: number) => {
      const fontSize = clamp(width * 0.0108, 8, 11.5)
      sceneContext.save()
      sceneContext.font = `600 ${fontSize}px "JetBrains Mono", "SF Mono", monospace`
      sceneContext.textBaseline = 'middle'
      sceneContext.shadowColor = 'rgba(80, 255, 132, 0.74)'
      const particleBlurEnabled = Math.floor(timeMs / 34) % 10 !== 0
      sceneContext.shadowBlur = particleBlurEnabled ? 10 : 0

      maskContext.save()
      maskContext.globalCompositeOperation = 'destination-out'
      maskContext.fillStyle = 'rgba(0, 0, 0, 0.06)'
      maskContext.fillRect(0, 0, width, height)
      maskContext.globalCompositeOperation = 'lighter'

      for (let index = 0; index < particleCount; index += particleDrawStep) {
        const dx = particleX[index]! - particleHomeX[index]!
        const dy = particleY[index]! - particleHomeY[index]!
        const displacement = Math.hypot(dx, dy)
        if (displacement < 0.7) {
          continue
        }

        const group = particleGroup[index] ?? 0
        const glyph = group === 3 ? '.' : glyphPalette[particleGlyph[index]!] ?? '0'
        const glow = clamp(0.24 + displacement * 0.024 + Math.sin(timeMs * 0.004 + particlePhase[index]!) * 0.22, 0.18, 0.98)
        sceneContext.fillStyle = group === 3 ? `rgba(116, 255, 154, ${glow})` : `rgba(92, 255, 132, ${glow})`
        sceneContext.fillText(glyph, particleX[index]!, particleY[index]!)

        if (displacement > 2.4 && index % maskDrawStep === 0) {
          const radius = clamp(2 + displacement * 0.18, 2, 14)
          maskContext.globalAlpha = clamp(displacement * 0.026, 0.08, 0.44)
          maskContext.fillStyle = 'rgba(255, 255, 255, 0.45)'
          maskContext.beginPath()
          maskContext.arc(particleX[index]!, particleY[index]!, radius, 0, Math.PI * 2)
          maskContext.fill()
        }
      }

      maskContext.globalAlpha = 1
      maskContext.restore()
      sceneContext.shadowBlur = 0
      sceneContext.restore()
    }

    const compose = (bridgeBlend: number) => {
      sceneContext.save()
      sceneContext.globalCompositeOperation = 'destination-out'
      sceneContext.drawImage(maskSurface as CanvasImageSource, 0, 0, width, height)
      sceneContext.restore()

      screenContext.clearRect(0, 0, width, height)
      screenContext.drawImage(sceneSurface as CanvasImageSource, 0, 0, width, height)

      if (vignetteGradient !== null) {
        screenContext.fillStyle = vignetteGradient
        screenContext.fillRect(0, 0, width, height)
      }

      if (bridgeBlend > 0.001) {
        const alpha = clamp(bridgeBlend * 0.24, 0, 0.24)
        screenContext.fillStyle = `rgba(0, 217, 255, ${alpha})`
        screenContext.fillRect(0, 0, width, height)
      }
    }

    const render = (timeMs: number) => {
      const deltaMs = clamp(timeMs - lastFrameTime, 4, 36)
      lastFrameTime = timeMs
      tuneQuality(deltaMs)

      const parallaxNormX = (smoothPointer.x - width * 0.5) / Math.max(1, width)
      const parallaxNormY = (smoothPointer.y - height * 0.5) / Math.max(1, height)
      const parallaxX = parallaxNormX * 120
      const parallaxY = parallaxNormY * 120

      wireRotation += deltaMs * 0.0002
      const hoverTarget = detectHoverTarget(smoothPointer.x, smoothPointer.y, parallaxX, parallaxY)
      const hoverEase = clamp(deltaMs * 0.012, 0.06, 0.28)
      blockHoverIntensity = lerp(blockHoverIntensity, hoverTarget.kind === 'block' ? 1 : 0, hoverEase)
      hubHoverIntensity = lerp(hubHoverIntensity, hoverTarget.kind === 'hub' ? 1 : 0, hoverEase)
      mapHoverIntensity = lerp(mapHoverIntensity, hoverTarget.kind === 'map' ? 1 : 0, hoverEase)
      updateHeroLikeFieldMotion(deltaMs, smoothPointer.x, smoothPointer.y)

      if (interactionMsRef.current >= 5000 && !completeRef.current) {
        finish()
      }

      sceneContext.clearRect(0, 0, width, height)
      sceneContext.fillStyle = 'rgba(0, 0, 0, 0.95)'
      sceneContext.fillRect(0, 0, width, height)
      if (baseGradient !== null) {
        sceneContext.fillStyle = baseGradient
        sceneContext.fillRect(0, 0, width, height)
      }

      drawRain(timeMs, deltaMs, parallaxX * 0.25, parallaxY * 0.25)
      drawCodeBlocks(timeMs, parallaxX * 0.55, parallaxY * 0.55, hoverTarget, blockHoverIntensity)
      drawMap(timeMs, parallaxX * 0.75, parallaxY * 0.75, mapHoverIntensity)
      drawWireHub(sceneContext, wireHub, wireRotation, hubHoverIntensity > 0.08, parallaxX * 0.92, parallaxY * 0.92)
      const blockBurstGain = clamp((blockHoverIntensity - 0.2) / 0.8, 0, 1)
      updateParticles(timeMs, deltaMs, hoverTarget, smoothPointer.x, smoothPointer.y, blockBurstGain)
      drawParticlesAndMask(timeMs)
      const progressBridge = clamp(interactionMsRef.current / 5000, 0, 1) * 0.2
      const exitBridge = completeRef.current ? 1 : 0
      compose(Math.max(progressBridge, exitBridge))

      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      hasPointerMoved = true
      const rect = stage.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      toPointerX(pointer.x)
      toPointerY(pointer.y)
    }

    resize()
    frameId = window.requestAnimationFrame(render)

    window.addEventListener('resize', resize)
    stage.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      stage.removeEventListener('pointermove', handlePointerMove)
      gsap.killTweensOf(smoothPointer)
    }
  }, [finish])

  return (
    <section ref={stageRef} className={`onboarding-shell ${isExiting ? 'is-exiting' : ''}`} aria-label="Matrix access onboarding">
      <div className="onboarding-underlay" aria-hidden="true">
        <iframe
          className="onboarding-underlay__iframe"
          src="https://frontheadlock.github.io/"
          title="Resume Preview"
          tabIndex={-1}
          loading="eager"
        />
        <div className="onboarding-underlay__veil" />
      </div>
      <canvas ref={canvasRef} className="onboarding-canvas" aria-hidden="true" />
      <div className="onboarding-crt-overlay" aria-hidden="true" />
      <SkipButton visible={accessVisible} onClick={finish} label="[ ACCESS ]" />
      <div
        className="onboarding-loading-bar"
        role="progressbar"
        aria-label="loading"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(loadingProgress * 100)}
      >
        <span className="onboarding-loading-label">Loading</span>
        <div className="onboarding-loading-track">
          <div className="onboarding-loading-track__fill" style={{ transform: `scaleX(${loadingProgress})` }} />
        </div>
      </div>
    </section>
  )
}
