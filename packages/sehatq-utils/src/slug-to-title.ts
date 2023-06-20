/**
 * Return the name of the slug.
 * Capitalize the first letter.
 * ex:
 *    slug : sehat-selalu
 *    return : Sehat Selalu
 * @param {string} slug The string to be convert
 * @return {string} The title string.
 */
export function slugToName(slug: string): string {
  if (slug) {
    const words = slug.split("-");

    return words
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  } else {
    return "";
  }
}
