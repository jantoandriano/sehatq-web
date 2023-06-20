import { NextRequest } from "next/server";

import { ENV } from "@sehatq/constants";
import { testMiddleware, testPathnameMatcher } from "./middlewares";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (ENV.ENVIRONMENT === "PRODUCTION" && testPathnameMatcher(pathname)) {
    return testMiddleware(req);
  }
}

export const config = {
  matcher: ["/v1/test:slugs*"],
};
