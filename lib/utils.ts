export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatXAF(n: number): string {
  return n.toLocaleString("en-US");
}
