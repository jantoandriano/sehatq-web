import React from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  LinkBox as ChakraLinkBox,
  LinkBoxProps as ChakraLinkBoxProps,
  LinkOverlay as ChakraLinkOverlay,
  LinkOverlayProps as ChakraLinkOverlayProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type LinkProps = StripChakraProps<ChakraLinkProps>;

export const Link = forwardRef<LinkProps, "div">((props: LinkProps, ref) => {
  return <ChakraLink {...props} ref={ref} />;
});

Link.displayName = "Link";

export type LinkBoxProps = StripChakraProps<ChakraLinkBoxProps>;

export const LinkBox = forwardRef<LinkBoxProps, "div">(
  (props: LinkBoxProps, ref) => {
    return (
      <ChakraLinkBox
        {...props}
        ref={ref}
        sx={{
          "& a[href]:not(.chakra-linkbox__overlay)": {
            zIndex: 2,
          },
        }}
      />
    );
  }
);

LinkBox.displayName = "Link Box";

export type LinkOverlayProps = StripChakraProps<ChakraLinkOverlayProps>;

export const LinkOverlay = forwardRef<LinkOverlayProps, "div">(
  (props: LinkOverlayProps, ref) => {
    return <ChakraLinkOverlay {...props} ref={ref} _before={{ zIndex: 1 }} />;
  }
);

LinkOverlay.displayName = "Link Overlay";
