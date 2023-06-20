import CoookieBrowser from "js-cookie";
import CoookieNode from "cookie";

function getCurrentLocationFromBrowser() {
  return new Promise<{ lat: string; long: string }>((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude.toString();
        const long = pos.coords.longitude.toString();
        const domain = ".sehatq.com";
        CoookieBrowser.set("lat", lat, { path: "/", domain });
        CoookieBrowser.set("long", long, { path: "/", domain });
        resolve({
          lat,
          long,
        });
      }, reject);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getLocationFromBrowser() {
  const { lat, long } = CoookieBrowser.get();
  if (lat && long) {
    return {
      lat,
      long,
    };
  }
  return await getCurrentLocationFromBrowser();
}

export function getLocationFromNode(cookie: string) {
  const { lat, long } = CoookieNode.parse(cookie);
  if (lat && long) {
    return {
      lat,
      long,
    };
  }
}
