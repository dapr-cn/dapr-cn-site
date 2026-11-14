// Publication types as Hugo numbered them (publication_types: ["5"]). The legend is Wowchemy's.

const LEGEND: Record<string, string> = {
  '0': 'Uncategorized',
  '1': 'Conference paper',
  '2': 'Journal article',
  '3': 'Preprint / Working Paper',
  '4': 'Report',
  '5': 'Book',
  '6': 'Book section',
  '7': 'Thesis',
  '8': 'Patent',
};

export function publicationTypeName(type: string): string {
  return LEGEND[type] ?? `Type ${type}`;
}

/** The distinct type numbers used by the given publications, in numeric order. */
export function publicationTypes(publications: readonly { data: { publication_types: readonly string[] } }[]): string[] {
  const set = new Set<string>();
  for (const pub of publications) {
    for (const type of pub.data.publication_types) set.add(type);
  }
  return [...set].sort((a, b) => Number(a) - Number(b));
}
