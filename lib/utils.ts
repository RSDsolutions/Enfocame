export function cn(...inputs: (string | undefined | null | boolean | 0)[]): string {
  return inputs.filter(Boolean).join(' ')
}
