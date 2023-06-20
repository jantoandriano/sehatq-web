export function insertHTMLContent(
  content: string,
  tagName: string,
  position: number,
  newContent: string,
  isAfter = false
) {
  const subStr = isAfter ? `</${tagName}>` : `<${tagName}>`;
  if (content.includes(subStr)) {
    let index = content.split(subStr, position).join(subStr).length;
    index = isAfter ? index + subStr.length : index;
    return content.slice(0, index) + newContent + content.slice(index);
  }
  return content;
}
