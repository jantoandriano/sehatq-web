import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const articlePathnameMatcher =
  match<{ slugs?: string[] }>("/artikel/:slugs*");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

async function getCategoryDetail(categorySlug: string) {
  return await fetch(
    `${ENV.API}/content-service/sehatq/article-categories/${categorySlug}`
  )
    .then((response) => response.json())
    .then((response) => response.data);
}

export async function articleMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.includes("/amp")) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }
  const params = getParams(url.pathname, articlePathnameMatcher);
  const slugs = params?.slugs ?? [];
  if (slugs.length > 1) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }
  const [slug] = slugs;
  let isList = !slug;
  if (slug) {
    const categoryDetail = await getCategoryDetail(slug);
    isList = Boolean(categoryDetail);
  }
  if (isList) {
    return NextResponse.next();
  }
  url.pathname = `/artikel/_detail/${slug}`;
  return NextResponse.rewrite(url);
}
