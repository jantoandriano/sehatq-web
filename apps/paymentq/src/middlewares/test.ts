import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";

export const testPathnameMatcher =
  match<{ slugs?: string[] }>("/v1/test/:slugs*");

export async function testMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  url.pathname = "/404";
  return NextResponse.rewrite(url);
}
