import React, { useRef } from "react";
import { createPopup } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";

import { useRouter } from "next/router";
import { ENV } from "@sehatq/constants";
import { MentalHealthFormMobile } from "./mental-health-form-mobile";
import { MentalHealthFormDesktop } from "./mental-health-form-desktop";

export type MentalHealthFormPageProps = {
  isMobile: boolean;
};

export function MentalHealthFormPage(props: MentalHealthFormPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { uuid1, uuid2 } = router.query as { uuid1: string; uuid2: string };
  const container = useRef<HTMLDivElement | null>(null);

  function handleOpenTypeform() {
    if (container.current) {
      const formId = ENV.ENVIRONMENT == "PRODUCTION" ? "EwYEa9MV" : "u9BFBgbm";
      const iframeProps =
        ENV.ENVIRONMENT == "PRODUCTION"
          ? { title: "Mental Health Tool" }
          : { title: "Gun - Mental Health Tool (DEV)" };
      const { toggle } = createPopup(formId, {
        container: container.current,
        hideHeaders: true,
        hideFooter: true,
        medium: "snippet",
        iframeProps,
        hidden: {
          uuid1,
          uuid2,
        },
      });
      toggle();
    }
  }

  const newProps = {
    isMobile,
    container,
    handleOpenTypeform,
  };

  if (isMobile) {
    return <MentalHealthFormMobile {...newProps} />;
  }
  return <MentalHealthFormDesktop {...newProps} />;
}
