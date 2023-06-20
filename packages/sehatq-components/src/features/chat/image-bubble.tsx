import React from "react";
import { ImageBubbleDesktop } from "./image-bubble-desktop";
import { ImageBubbleMobile } from "./image-bubble-mobile";

export type ImageBubbleProps = {
  isMobile?: boolean;
  width?: number;
  height?: number;
  imageUrl: string;
  imageName: string;
  plainImageUrl: string;
};

export function ImageBubble(props: ImageBubbleProps) {
  const { isMobile, plainImageUrl, ...otherProps } = props;

  function onImageClick() {
    window.open(plainImageUrl);
  }

  if (isMobile) {
    return <ImageBubbleMobile {...otherProps} onImageClick={onImageClick} />;
  }

  return <ImageBubbleDesktop {...otherProps} onImageClick={onImageClick} />;
}
