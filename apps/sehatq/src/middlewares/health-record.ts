import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const healthRecordPathnameMatcher = match<{
  slug?: string;
  scoreId?: string;
}>("/profil/:userId/health-record/:slug/:scoreId");

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

export async function healthRecordMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const params = getParams(url.pathname, healthRecordPathnameMatcher);
  const slug = params?.slug || "";

  if (
    [
      "kalkulator-bmi",
      "cek-kipi-efek-samping-vaksin",
      "kalkulator-kehamilan",
    ].includes(slug)
  ) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }
}
