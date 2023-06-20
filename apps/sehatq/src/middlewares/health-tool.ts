import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { getParams } from "src/utils";

export const healthToolPathnameMatcher = match<{ slug?: string }>(
  "/tes-kesehatan/:slug"
);

const oldSehatqDomain =
  process.env.NODE_ENV === "production"
    ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
    : ENV.OLD_SEHATQ_DOMAIN;

export async function healthToolMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const params = getParams(url.pathname, healthToolPathnameMatcher);
  const slug = params?.slug ?? "";
  if (
    [
      "pilih-kipi",
      "kipi-result",
      "kalkulator-bmi",
      "cek-risiko-diabetes",
      "kalkulator-kehamilan",
      "cek-syarat-vaksin-covid-19",
      "cek-risiko-penyakit-jantung",
      "cek-kipi-efek-samping-vaksin",
    ].includes(slug)
  ) {
    url.href = `${oldSehatqDomain}/${url.pathname}${url.search}`;
    return NextResponse.rewrite(url);
  }
}
