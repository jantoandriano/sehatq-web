import { NextRequest, NextResponse } from "next/server";
import { isMobileDevice } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const faskesPathnameMatcher =
  match<{ slugs?: string[] }>("/faskes/:slugs*");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

async function isHCFDetail(hcfSlug: string) {
  return await fetch(
    `${ENV.API}/content-service/sehatq/slug-translators/feature/faskes/slug/${hcfSlug}`
  ).then((response) => response.status === 204);
}

export async function faskesMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const legacyPath = ["/amp", "/layanan-pemeriksaan"].filter((f) =>
    url.pathname.includes(f)
  );

  if (legacyPath.length > 0) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }

  const params = getParams(url.pathname, faskesPathnameMatcher);
  const slugs = params?.slugs ?? [];
  if (slugs.length > 4) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  if (slugs.length == 1) {
    const [hcfSlug] = slugs;
    if (await isHCFDetail(hcfSlug)) {
      const isMobile = isMobileDevice(req.headers.get("user-agent") ?? "");
      if (isMobile) {
        url.pathname = `/faskes/_detail/${hcfSlug}/_mobile`;
      } else {
        url.pathname = `/faskes/_detail/${hcfSlug}`;
      }
      return NextResponse.rewrite(url);
    }
  }
}
