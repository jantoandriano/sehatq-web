import React from "react";

import { SimpleSehatQFooterMobile } from "./simple-sehatq-footer-mobile";
import { SimpleSehatQFooterDesktop } from "./simple-sehatq-footer-desktop";

export type SimpleSehatQFooterProps = {
  isMobile?: boolean;
};

export function SimpleSehatQFooter(props: SimpleSehatQFooterProps) {
  if (props.isMobile) {
    return <SimpleSehatQFooterMobile />;
  }
  return <SimpleSehatQFooterDesktop />;
}
