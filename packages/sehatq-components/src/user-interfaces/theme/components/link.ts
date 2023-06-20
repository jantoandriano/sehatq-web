import { Button } from "./button";
import type { SystemStyleObject } from "@chakra-ui/theme-tools";

const { baseStyle: buttonBaseStyle, variants, sizes } = Button;

const baseStyle: SystemStyleObject = {
  ...buttonBaseStyle,
  lineHeight: "1.2",
  display: "inline-flex",
  textDecoration: "none",
  alignItems: "center",
  justifyContent: "center",
  _hover: {
    textDecoration: "none",
  },
};

export const Link = {
  variants,
  sizes,
  baseStyle,
  defaultProps: {
    variant: "link",
    size: "md",
    colorScheme: "sea",
  },
};
