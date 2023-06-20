import { NextResponse } from "next/server";
import { ENV, URLS } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";
import type { NextRequest } from "next/server";

export const healthToolScoreListPathnameMatcher = match<{
  userId?: string;
  htSlug?: string;
}>("/profil/:userId/health-record/:htSlug");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

export function healthToolScoreListMiddleware(req: NextRequest) {
  if (req.cookies.get("token")) {
    const url = req.nextUrl.clone();
    const params = getParams(url.pathname, healthToolScoreListPathnameMatcher);
    const htSlug = params?.htSlug ?? "";
    if (
      [
        "kalkulator-bmi",
        "cek-kipi-efek-samping-vaksin",
        "kalkulator-kehamilan",
      ].includes(htSlug)
    ) {
      url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }
  return NextResponse.redirect(URLS.EXTERNAL_LOGIN);
}
