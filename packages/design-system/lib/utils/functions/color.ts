export function hexToHSL(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function HSLToHex(hsl: string): string {
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number) as [number, number, number];
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
export function isColorDark(color: string): boolean {
  const hsl = hexToHSL(color);
  const values = stripHSL(hsl);

  const lightness = parseInt(values.split(",")[2]!);

  return lightness < 50;
}
export function stripHSL(hslColor: string): string {
  const values = hslColor.slice(
    hslColor.indexOf("(") + 1,
    hslColor.indexOf(")"),
  );
  return values;
}

export function unstripHSL(hslColor: string): `hsl(${string})` {
  const values = hslColor.split(" ");
  return `hsl(${values.join(", ")})`;
}
