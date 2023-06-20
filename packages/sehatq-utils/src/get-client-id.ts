import CoookieBrowser from "js-cookie";
import CoookieNode from "cookie";

export function getClientIdFromBrowser() {
  return CoookieBrowser.get("clientId");
}

export function getClientIdFromNode(cookie: string) {
  const { clientId } = CoookieNode.parse(cookie);
  return clientId;
}
