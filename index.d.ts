export class IconIpsum {
  constructor(
    options?: Partial<{
      width: number
      height: number
      stroke: string
      strokeWidth: number
    }>
  )
  seed(seed: number): IconIpsum
  icon(templateName?: string): string
  iconDataUri(templateName?: string): string
}
