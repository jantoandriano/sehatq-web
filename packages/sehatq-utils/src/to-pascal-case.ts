export function toPascalCase(text: string) {
  return text
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase().replace(" ", ""))
    .replace(/\s+/g, "");
}
