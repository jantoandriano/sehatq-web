import { NextRequest, NextResponse } from "next/server";
import {
  articleMiddleware,
  articlePathnameMatcher,
  doctorMiddleware,
  doctorPathnameMatcher,
  diseaseMiddleware,
  diseasePathnameMatcher,
  mentalHealthToolMiddleware,
  mentalHealthToolPathnameMatcher,
  forumMiddleware,
  forumPathnameMatcher,
  profileMiddleware,
  profilePathnameMatcher,
  faskesMiddleware,
  faskesPathnameMatcher,
  healthToolMiddleware,
  healthToolPathnameMatcher,
  healthRecordMiddleware,
  healthRecordPathnameMatcher,
  telemedicineHcfsMiddleware,
  telemedicineHcfsPathnameMatcher,
  prescriptionFormMiddleware,
  prescriptionFormPathnameMatcher,
  healthToolScoreListPathnameMatcher,
  healthToolScoreListMiddleware,
} from "./middlewares";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    ["_mobile", "_ssr", "_detail", "_not-found"].some((key) =>
      req.nextUrl.pathname.includes(`/${key}`)
    )
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }
  if (articlePathnameMatcher(pathname)) {
    return articleMiddleware(req);
  }
  if (doctorPathnameMatcher(pathname)) {
    return doctorMiddleware(req);
  }
  if (forumPathnameMatcher(pathname)) {
    return forumMiddleware(req);
  }
  if (mentalHealthToolPathnameMatcher(pathname)) {
    return mentalHealthToolMiddleware(req);
  }
  if (healthToolPathnameMatcher(pathname)) {
    return healthToolMiddleware(req);
  }
  if (healthRecordPathnameMatcher(pathname)) {
    return healthRecordMiddleware(req);
  }
  if (healthToolScoreListPathnameMatcher(pathname)) {
    return healthToolScoreListMiddleware(req);
  }
  if (profilePathnameMatcher(pathname)) {
    return profileMiddleware(req);
  }
  if (faskesPathnameMatcher(pathname)) {
    return faskesMiddleware(req);
  }
  if (diseasePathnameMatcher(pathname)) {
    return diseaseMiddleware(req);
  }
  if (telemedicineHcfsPathnameMatcher(pathname)) {
    return telemedicineHcfsMiddleware(req);
  }
  if (prescriptionFormPathnameMatcher(pathname)) {
    return prescriptionFormMiddleware(req);
  }
}

export const config = {
  matcher: [
    "/artikel/:slugs*",
    "/dokter/:slugs*",
    "/forum/:slugs*",
    "/tes-kesehatan/:path*",
    "/profil/:path*",
    "/telemed/faskes/:path*",
    "/faskes/:slugs*",
    "/penyakit/:slugs*",
  ],
};
