/**
 * check prefix string
 * @param {String} str
 * @param {Array} prefixs
 * @param {"FIRST" | "LAST"} prefixPosition
 * @returns {Boolean}
 */
export function validatePrefixString(
  str: string,
  prefixs: string[],
  prefixPosition: "FIRST" | "LAST"
) {
  if (prefixPosition == "LAST") {
    return prefixs.some(
      (postfix) => str.indexOf(postfix, str.length - postfix.length) !== -1
    );
  }

  return prefixs.some((prefix) => str.lastIndexOf(prefix, 0) === 0);
}
