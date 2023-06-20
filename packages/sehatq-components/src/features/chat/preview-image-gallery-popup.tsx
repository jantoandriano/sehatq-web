import React from "react";
import { PreviewImageGalleryPopupDesktop } from "./preview-image-gallery-popup-desktop";
import {
  PreviewImageGalleryPopupMobile,
  PreviewImageGalleryPopupMobileProps,
} from "./preview-image-gallery-popup-mobile";

export type PreviewImageGalleryPopupProps =
  | { isMobile?: boolean } & PreviewImageGalleryPopupMobileProps;

export function PreviewImageGalleryPopup(props: PreviewImageGalleryPopupProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <PreviewImageGalleryPopupMobile {...otherProps} />;
  }
  return <PreviewImageGalleryPopupDesktop {...otherProps} />;
}
