import React from "react";
import {
  SendbirdHeaderDesktop,
  SendbirdHeaderDesktopProps,
} from "./sendbird-header-desktop";
import {
  SendbirdHeaderMobile,
  SendbirdHeaderMobileProps,
} from "./sendbird-header-mobile";

export type SendbirdHeaderProps =
  | ({ isMobile: true } & SendbirdHeaderMobileProps)
  | ({ isMobile?: false } & SendbirdHeaderDesktopProps);

export function SendbirdHeader(props: SendbirdHeaderProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <SendbirdHeaderMobile {...otherProps} />;
  }
  return <SendbirdHeaderDesktop {...otherProps} />;
}
