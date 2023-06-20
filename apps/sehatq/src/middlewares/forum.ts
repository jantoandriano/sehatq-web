import { NextRequest, NextResponse } from "next/server";
import { isMobileDevice } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const forumPathnameMatcher =
  match<{ slugs?: string[] }>("/forum/:slugs*");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

async function getCategoryDetail(categorySlug: string) {
  return await fetch(
    `${ENV.API}/content-service/sehatq/forum-categories/${categorySlug}`
  )
    .then((response) => response.json())
    .then((response) => response.data);
}

export async function forumMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.includes("/amp")) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }
  const params = getParams(url.pathname, forumPathnameMatcher);
  const slugs = params?.slugs ?? [];

  if (slugs.length == 1) {
    const [slug] = slugs;
    const categoryDetail = await getCategoryDetail(slug);
    if (!categoryDetail) {
      if (/^\d+$/.test(slug)) {
        url.pathname = "/forum/_not-found";
        return NextResponse.rewrite(url, { status: 410 });
      }
      const isMobile = isMobileDevice(req.headers.get("user-agent") ?? "");
      if (isMobile) {
        url.pathname = `/forum/_detail/${slug}/_mobile`;
      } else {
        url.pathname = `/forum/_detail/${slug}`;
      }

      return NextResponse.rewrite(url);
    }
  }

  if (slugs.length > 1) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
