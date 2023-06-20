import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (/^\/.+\/(mobile|ssr)$/.test(req.nextUrl.pathname)) {
    return new Response("Page not found", {
      status: 404,
    });
  }
  return NextResponse.next();
}
