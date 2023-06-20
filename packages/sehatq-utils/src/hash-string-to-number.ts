export function hashStringToNumber(str: string) {
  const sortedString = str.split("").sort().join("");
  let hash = 5381,
    i = sortedString.length;

  while (i) {
    hash = (hash * 33) ^ sortedString.charCodeAt(--i);
  }

  return hash >>> 0;
}
