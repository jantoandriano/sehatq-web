import React from "react";

import { useRouter } from "next/router";
import { RecoverEmailDesktop } from "./recover-email-desktop";
import { RecoverEmailMobile } from "./recover-email-mobile";

interface Props {
  isMobile: boolean;
}

export function RecoverEmail({ isMobile }: Props) {
  const { query } = useRouter();
  const token: string = query.token as string;

  if (isMobile) return <RecoverEmailMobile token={token} />;
  return <RecoverEmailDesktop token={token} />;
}
