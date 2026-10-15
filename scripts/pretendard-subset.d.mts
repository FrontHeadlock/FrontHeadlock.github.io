export type PretendardSubsetResult = {
  outFile: string
  chars: number
  hangul: number
  bytes: number
  changed: boolean
}

export function buildPretendardSubset(options?: { root?: string; announce?: boolean }): Promise<PretendardSubsetResult>
export function describeSubset(result: PretendardSubsetResult): string
