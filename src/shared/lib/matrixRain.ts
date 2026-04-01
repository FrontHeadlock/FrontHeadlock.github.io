type AdvanceColumnOptions = {
  position: number
  canvasHeight: number
  speed: number
  resetOffset: number
  variance: number
  random?: () => number
}

export function advanceColumn({
  position,
  canvasHeight,
  speed,
  resetOffset,
  variance,
  random = Math.random,
}: AdvanceColumnOptions) {
  const threshold = canvasHeight + variance

  if (position > threshold) {
    return -(random() * resetOffset)
  }

  return position + speed
}
