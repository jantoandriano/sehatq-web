import { NextRequest, NextResponse } from "next/server";
import { isMobileDevice } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const doctorPathnameMatcher =
  match<{ slugs?: string[] }>("/dokter/:slugs*");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

async function isDoctorDetail(doctorSlug: string) {
  return await fetch(
    `${ENV.API}/content-service/sehatq/slug-translators/feature/dokter/slug/${doctorSlug}`
  ).then((response) => response.status === 204);
}

export async function doctorMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.includes("/amp")) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }

  const params = getParams(url.pathname, doctorPathnameMatcher);

  const slugs = params?.slugs ?? [];

  if (slugs.length == 1) {
    const [slug] = slugs;
    if (await isDoctorDetail(slug)) {
      const isMobile = isMobileDevice(req.headers.get("user-agent") ?? "");
      if (isMobile) {
        url.pathname = `/dokter/_detail/${slug}/_mobile`;
      } else {
        url.pathname = `/dokter/_detail/${slug}`;
      }
      return NextResponse.rewrite(url);
    }
  }

  if (slugs.length > 4) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }
}
