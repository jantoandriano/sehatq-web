import React from "react";
import { useImage } from "../../user-interfaces";

export type ImageBubbleMobileProps = {
  width?: number;
  height?: number;
  imageUrl: string;
  imageName: string;
  onImageClick: () => void;
};

export function ImageBubbleMobile(props: ImageBubbleMobileProps) {
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
        width: `min(265px, ${width}px)`,
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
        width: "265px",
        height: "160px",
        borderRadius: "md",
        overflow: "hidden",
        position: "relative",
        onClick: onImageClick,
      }}
    />
  );
}
