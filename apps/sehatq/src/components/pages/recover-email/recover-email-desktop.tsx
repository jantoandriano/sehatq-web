import React from "react";

import { RecoverEmailForm } from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

interface Props {
  token: string;
}

export function RecoverEmailDesktop({ token }: Props) {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <RecoverEmailForm isMobile={false} token={token} />
    </>
  );
}
