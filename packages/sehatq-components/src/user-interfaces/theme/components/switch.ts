import { switchAnatomy as parts } from "@chakra-ui/anatomy";
import type { PartsStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: PartsStyleObject<typeof parts> = {
  track: {
    bg: "#FFFFFF",
    border: "1px solid #C3C7CA",
    _checked: {
      bg: "#70CBCF",
      border: "1px solid #70CBCF",
    },
    _focus: {
      boxShadow: "none",
    },
  },
  thumb: {
    boxShadow: "0px 2px 4px rgb(54 69 79 / 30%)",
  },
};

export const Switch = {
  baseStyle,
};
