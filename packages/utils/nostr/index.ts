export function getTagValues(tags: string[][], key: string): string[][];
export function getTagValues(
  tags: string[][],
  key: string,
  options: { index: number; firstOnly?: false }
): string[];
export function getTagValues(
  tags: string[][],
  key: string,
  options: { index?: undefined; firstOnly: true }
): string[] | undefined;

export function getTagValues(
  tags: string[][],
  key: string,
  options: { index: number; firstOnly: true }
): string | undefined;

export function getTagValues(
  tags: string[][],
  key: string,
  options: { index?: number; firstOnly?: boolean } = {}
): string[][] | string[] | string | undefined {
  const filteredTags = tags.filter((tag) => tag[0] === key);
  if (options.firstOnly) {
    if (options.index !== undefined) {
      return filteredTags[0]?.[options.index];
    }
    return filteredTags[0];
  }
  if (options.index !== undefined) {
    return filteredTags
      .map((tag) => tag[options.index as number])
      .filter(Boolean);
  }
  return filteredTags;
}
