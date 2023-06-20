import { NextResponse } from "next/server";
import { URLS } from "@sehatq/constants";
import { match } from "path-to-regexp";
import type { NextRequest } from "next/server";

export const profilePathnameMatcher =
  match<{ path?: string[] }>("/profil/:path*");

export const activityPathnameMatcher = match<{ path?: string[] }>(
  "/profil/:path*/aktivitas"
);

export function profileMiddleware(req: NextRequest) {
  if (req.cookies.get("token")) {
    const { pathname } = req.nextUrl;
    if (activityPathnameMatcher(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = `${url.pathname}/booking`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(URLS.EXTERNAL_LOGIN);
}
