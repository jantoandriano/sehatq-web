import { NextRequest, NextResponse } from "next/server";
import { isMobileDevice } from "@sehatq/utils";

export function middleware(req: NextRequest) {
  if (req.nextUrl.searchParams.get("merchantId")) {
    req.nextUrl.pathname = `${req.nextUrl.pathname}/ssr`;
    return NextResponse.rewrite(req.nextUrl);
  }
  const isMobile = isMobileDevice(req?.ua?.ua);
  if (isMobile) {
    req.nextUrl.pathname = `${req.nextUrl.pathname}/mobile`;
    return NextResponse.rewrite(req.nextUrl);
  }
  return NextResponse.next();
}
