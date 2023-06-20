import CoookieBrowser from "js-cookie";

export const parseJwt = (token: string) => {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getParseToken = () => {
  const cookies = CoookieBrowser.get();
  if (cookies) {
    const { token } = cookies;
    const parseToken = parseJwt(token);

    return parseToken.data ? JSON.parse(parseToken.data) : {};
  } else {
    return {};
  }
};
