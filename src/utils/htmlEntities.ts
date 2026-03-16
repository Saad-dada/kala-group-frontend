const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntity(entity: string): string {
  if (entity.startsWith("#x") || entity.startsWith("#X")) {
    const codePoint = Number.parseInt(entity.slice(2), 16);
    return Number.isNaN(codePoint) ? `&${entity};` : String.fromCodePoint(codePoint);
  }

  if (entity.startsWith("#")) {
    const codePoint = Number.parseInt(entity.slice(1), 10);
    return Number.isNaN(codePoint) ? `&${entity};` : String.fromCodePoint(codePoint);
  }

  return NAMED_ENTITIES[entity] ?? `&${entity};`;
}

export function decodeHtmlEntities(value: string): string {
  if (!value.includes("&")) {
    return value;
  }

  return value.replace(/&([^;]+);/g, (_, entity: string) => decodeEntity(entity));
}

export function decodeHtmlEntitiesInData<T>(value: T): T {
  if (typeof value === "string") {
    return decodeHtmlEntities(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => decodeHtmlEntitiesInData(item)) as T;
  }

  if (value && typeof value === "object") {
    const decodedObject = Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
      (accumulator, [key, item]) => {
        accumulator[key] = decodeHtmlEntitiesInData(item);
        return accumulator;
      },
      {},
    );

    return decodedObject as T;
  }

  return value;
}