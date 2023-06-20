export const concatString = (strings: string[], separator = ", ") => {
  const stringRange: string[] = [];
  strings.forEach((str: string) => {
    if (str && str != " ") {
      if (stringRange?.length > 0) {
        stringRange.push(separator);
      }
      stringRange.push(str);
    }
  });
  return stringRange.join("");
};
