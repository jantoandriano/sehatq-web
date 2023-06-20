import React from "react";
import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type ImageProps = StripChakraProps<ChakraImageProps>;

export const Image = forwardRef<ImageProps, "div">((props: ImageProps, ref) => {
  return (
    <ChakraImage
      fallbackSrc="https://www.sehatq.com/public/assets/img/no-image.jpg"
      {...props}
      ref={ref}
    />
  );
});

Image.displayName = "Image";
