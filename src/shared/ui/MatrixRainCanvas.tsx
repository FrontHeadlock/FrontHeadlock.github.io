import { useMatrixRain } from '../hooks/useMatrixRain'

export function MatrixRainCanvas() {
  const canvasRef = useMatrixRain()

  return <canvas ref={canvasRef} className="matrix-layer -z-10" aria-hidden="true" />
}
