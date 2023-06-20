import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const telemedicineHcfsPathnameMatcher = match<{
  hospitalSlug: string;
  slugs?: string[];
}>("/telemed/faskes/:hospitalSlug/:slugs*");

export async function telemedicineHcfsMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const params = getParams(url.pathname, telemedicineHcfsPathnameMatcher);
  const slugs = params?.slugs ?? [];
  if (slugs.length > 1) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }
  const hospitalSlug = params?.hospitalSlug ?? "";
  if (slugs.length == 1) {
    const [slug] = slugs;
    if (slug === "dokter") {
      url.pathname = `/telemed/faskes/${hospitalSlug}`;
      return NextResponse.rewrite(url);
    }
  }
}
