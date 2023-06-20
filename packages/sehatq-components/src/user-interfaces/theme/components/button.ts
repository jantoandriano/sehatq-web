import type {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  return {
    color: `${c}.500`,
    bg: "transparent",
    _hover: {
      bg: `${c}.50`,
    },
    _active: {
      bg: `${c}.100`,
    },
  };
};

const variantTab: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  const activeBorderColorMap: Record<string, string> = {
    sea: "main",
  };

  const activeStyle = {
    color: `${c}.500`,
    fontWeight: "semibold",
    borderBottom: "3px solid",
    borderBottomColor: `${activeBorderColorMap[c] ?? c}.500`,
  };

  return {
    bg: "transparent",
    borderRadius: 0,
    fontWeight: "normal",
    _hover: {
      color: `${c}.500`,
    },
    ...(props.isActive ? activeStyle : null),
  };
};

const variantChip: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  const activeColorMap: Record<string, string> = {
    paleBlue: "sea",
  };

  const activeBorderColorMap: Record<string, string> = {
    paleBlue: "main",
  };

  const activeBackgroundColorMap: Record<string, string> = {
    paleBlue: "white",
  };

  const activeStyle = {
    backgroundColor: activeBackgroundColorMap[c] ?? "transparent",
    color: `${activeColorMap[c] ?? c}.500`,
    borderColor: `${activeBorderColorMap[c] ?? c}.500`,
  };

  return {
    color: "brownGrey.500",
    backgroundColor: `${c}.500`,
    border: "1.5px solid",
    borderColor: `${c}.500`,
    borderRadius: "full",
    fontWeight: "normal",
    ...(props.isActive ? activeStyle : null),
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = `${c}.500`;
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...variantGhost(props),
  };
};

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  return {
    bg,
    color,
    _hover: {
      bg: hoverBg,
      _disabled: {
        bg,
      },
    },
    _active: { bg: activeBg },
  };
};

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    fontWeight: "normal",
    verticalAlign: "baseline",
    color: `${c}.500`,
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: `${c}.700`,
    },
  };
};

const variantFit: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 1,
    minW: "auto",
    height: "auto",
    lineHeight: "inherit",
    fontWeight: "normal",
    color: `${c}.500`,
    _active: {
      color: `${c}.700`,
    },
  };
};

const variantUnstyled: SystemStyleObject = {
  bg: "none",
  color: "inherit",
  lineHeight: "inherit",
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
  fit: variantFit,
  tab: variantTab,
  chip: variantChip,
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    h: "30px",
    minW: 8,
    fontSize: "xs",
    px: 3,
  },
  xxs: {
    h: "24px",
    minW: 6,
    fontSize: "xxs",
    px: 2,
  },
};

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "main",
};

export const Button = {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
