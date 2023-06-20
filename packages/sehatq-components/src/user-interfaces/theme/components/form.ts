import { formAnatomy as parts } from "@chakra-ui/anatomy";
import type { PartsStyleFunction } from "@chakra-ui/theme-tools";

const variantFloating: PartsStyleFunction<typeof parts> = (props) => {
  const { size } = props;
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)",
    color: "charcoalGrey",
  };
  return {
    container: {
      _focusWithin: {
        label: {
          ...activeLabelStyles,
        },
      },
      "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, input + div + label":
        {
          ...activeLabelStyles,
        },
      "textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
        {
          ...activeLabelStyles,
        },
      "button[value]:not(:empty) + div + label": {
        ...activeLabelStyles,
      },
      "button[value]:not(:empty) + label": {
        ...activeLabelStyles,
      },
      "form[value]:not(:empty) + div + label": {
        ...activeLabelStyles,
      },
      "form[value]:not(:empty) + label": {
        ...activeLabelStyles,
      },
      label: {
        color: "veryLightPink",
        top: 0,
        left: 0,
        zIndex: 2,
        position: "absolute",
        backgroundColor: "white",
        pointerEvents: "none",
        mx: 3,
        px: 1,
        my: size == "small" ? 3 : 2,
        transformOrigin: "left top",
      },
    },
  };
};

const variantAlwaysFloating: PartsStyleFunction<typeof parts> = (props) => {
  const { size } = props;
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)",
    color: "charcoalGrey",
  };
  return {
    container: {
      ".chakra-select__wrapper + label": {
        ...activeLabelStyles,
      },
      label: {
        ...activeLabelStyles,
        color: "brownGrey.500",
        top: 0,
        left: 0,
        zIndex: 2,
        position: "absolute",
        backgroundColor: "white",
        pointerEvents: "none",
        mx: 3,
        px: 1,
        my: size == "small" ? 3.5 : 2,
        transformOrigin: "left top",
      },
    },
  };
};

const variants = {
  floating: variantFloating,
  alwaysFloating: variantAlwaysFloating,
};

export const Form = {
  parts: parts.keys,
  variants,
};
