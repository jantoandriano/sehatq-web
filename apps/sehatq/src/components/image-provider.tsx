import React, { ReactElement, useEffect, useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { ImageProvider, Box, BoxProps } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { imageLoader } from "@utils";

interface ImageProps extends Omit<NextImageProps, "loader"> {
  wrapperProps?: BoxProps;
  errorSrc?: string;
}

function Image(props: ImageProps) {
  const { wrapperProps, layout, src, errorSrc, ...restProps } = props;
  const [hasError, setHasError] = useState(false);
  const ASSETS = useAssets(["NO_IMAGE"]);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <Box
      as="span"
      display={layout === "responsive" ? "block" : "inherit"}
      position="relative"
      {...wrapperProps}
    >
      <NextImage
        {...restProps}
        src={hasError ? errorSrc ?? ASSETS.NO_IMAGE : src}
        layout={layout}
        loader={imageLoader}
        onError={() => setHasError(true)}
      />
    </Box>
  );
}

export function SehatQImageProvider({ children }: { children: ReactElement }) {
  return <ImageProvider value={Image}>{children}</ImageProvider>;
}
