import { NextRequest, NextResponse } from "next/server";
import { ENV, DISEASE_CATEGORIES } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const diseasePathnameMatcher =
  match<{ slugs?: string[] }>("/penyakit/:slugs*");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

export async function diseaseMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.includes("/amp")) {
    url.href = `${oldSehatqDomain}/${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  const params = getParams(url.pathname, diseasePathnameMatcher);
  const slugs = params?.slugs ?? [];
  if (slugs.length === 1) {
    const [slug] = slugs;
    if (
      !DISEASE_CATEGORIES.some(
        (diseaseCategory) => diseaseCategory.slug === slug
      ) &&
      !/^[a-zA-Z]$/.test(slug)
    ) {
      url.pathname = `/penyakit/_detail/${slug}`;
      return NextResponse.rewrite(url);
    }
  }
  if (slugs.length > 2) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  // Redirect 301 Uppercase slug params
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }
}
