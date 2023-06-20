import React from "react";
import { CC3dsDesktop } from "./cc-3ds-desktop";
import { CC3dsMobile } from "./cc-3ds-mobile";

export type ModalIFrameProps = {
  isMobile: boolean;
  iframeUrl?: string | string[] | null;
  coNumber?: string | string[] | null;
};

export function CC3ds(props: ModalIFrameProps) {
  if (props.isMobile) {
    return <CC3dsMobile {...props} />;
  }
  return <CC3dsDesktop {...props} />;
}
