import { NextRequest, NextResponse } from "next/server";
import { isMobileDevice } from "@sehatq/utils";
import { match } from "path-to-regexp";

export const mentalHealthToolPathnameMatcher = match<{ path?: string[] }>(
  "/tes-kesehatan/tes-kesehatan-mental/:path*"
);

export function mentalHealthToolMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isMobile = isMobileDevice(req.headers.get("user-agent") ?? "");
  if (isMobile) {
    if (url.pathname.includes("/mulai")) {
      url.pathname = `/tes-kesehatan/tes-kesehatan-mental/mulai/_mobile`;
      return NextResponse.rewrite(url);
    }
    if (url.pathname.includes("/hasil")) {
      url.pathname = `/tes-kesehatan/tes-kesehatan-mental/hasil/_mobile`;
      return NextResponse.rewrite(url);
    }

    url.pathname = `/tes-kesehatan/tes-kesehatan-mental/_mobile`;
    return NextResponse.rewrite(url);
  }
}
