import React from "react";
import { useImage } from "../../user-interfaces";

export type ImageBubbleDesktopProps = {
  width?: number;
  height?: number;
  imageUrl: string;
  imageName: string;
  onImageClick: () => void;
};

export function ImageBubbleDesktop(props: ImageBubbleDesktopProps) {
  const { width, height, imageUrl, imageName, onImageClick } = props;
  const Image = useImage();

  return width && height ? (
    <Image
      alt={imageName}
      src={imageUrl}
      width={width}
      height={height}
      wrapperProps={{
        display: "block",
        borderRadius: "md",
        overflow: "hidden",
        width: `min(360px, ${width}px)`,
        cursor: "pointer",
        onClick: onImageClick,
      }}
      layout="responsive"
    />
  ) : (
    <Image
      alt={imageName}
      src={imageUrl}
      layout="fill"
      objectFit="cover"
      wrapperProps={{
        width: "360px",
        height: "220px",
        borderRadius: "md",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        onClick: onImageClick,
      }}
    />
  );
}
