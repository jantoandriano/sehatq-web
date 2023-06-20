import { ImageLoaderProps } from "next/image";
import { ENV } from "@sehatq/constants";

export function imageLoader({ src, width, quality = 90 }: ImageLoaderProps) {
  if (src[0] === "/") {
    if (process.env.NODE_ENV !== "production") {
      return `${src}?width=${width}`;
    }
    const sourceImage = `${ENV.SEHATQ_LOCAL_ASSET_PATH}${src}`;
    return generateNewSrc({
      domain: ENV.STATIC_ASSET_DOMAIN,
      width,
      quality,
      sourceImage,
    });
  }
  try {
    const url = new URL(src);
    const isCDNDomain = ["cms", "static"].some((key) =>
      url.origin.includes(key)
    );
    if (isCDNDomain) {
      const isCDNPathname = url.pathname.includes("/cdn-cgi/image/");
      const sourceImage = isCDNPathname
        ? `/${url.pathname.split("/").slice(4).join("/")}`
        : url.pathname;
      if (sourceImage) {
        return `${url.origin}/cdn-cgi/image/format=auto,width=${width},quality=${quality}${sourceImage}`;
      }
    }
    return `${src}?width=${width}`;
  } catch {
    return `${src}?width=${width}`;
  }
}

interface GenerateNewSrcArgs {
  domain: string;
  width: number;
  quality: number;
  sourceImage: string;
}

function generateNewSrc({
  domain,
  width,
  quality,
  sourceImage,
}: GenerateNewSrcArgs) {
  return sourceImage.endsWith(".svg")
    ? `${domain}${sourceImage}`
    : `${domain}/cdn-cgi/image/format=auto,width=${width},quality=${quality}${sourceImage}`;
}
