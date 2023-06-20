import { NextResponse } from "next/server";
import { URLS } from "@sehatq/constants";
import { match } from "path-to-regexp";
import type { NextRequest } from "next/server";

export const prescriptionFormPathnameMatcher =
  match<{ path?: string[] }>("/buat-resep/:path*");

export function prescriptionFormMiddleware(req: NextRequest) {
  if (req.cookies.get("token")) return NextResponse.next();
  return NextResponse.redirect(URLS.EXTERNAL_LOGIN);
}
