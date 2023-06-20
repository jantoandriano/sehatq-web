import Cookies from "js-cookie";

export function logout() {
  const domain = ".sehatq.com";
  Cookies.remove("token", { path: "/", domain });
  Cookies.remove("sbtoken", { path: "/", domain });
  Cookies.remove("activeLocation", { path: "/", domain });
  Cookies.remove("idc", { path: "/", domain });
  Cookies.remove("__uid2_advertising_token", { path: "/", domain });
  localStorage.removeItem("activeLocation");
  localStorage.removeItem("locationDate");
  localStorage.removeItem("searchHistories");
  window.location.href = "/";
}
