import type {
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "base",
  fontWeight: "semibold",
  textTransform: "uppercase",
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.500`,
    color: "white",
  };
};

const variantSubtle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.100`,
    color: `${c}.500`,
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  return {
    color: `${c}.500`,
    boxShadow: `inset 0 0 0px 1px ${c}.500`,
  };
};

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
};

const sizes: Record<string, SystemStyleObject> = {
  md: {
    px: 1,
    py: 0.5,
    fontSize: "xs",
  },
  sm: {
    px: 0.5,
    py: 0.5,
    fontSize: "xxs",
  },
};

const defaultProps = {
  variant: "subtle",
  colorScheme: "gray",
  size: "md",
};

export const Badge = {
  baseStyle,
  variants,
  defaultProps,
  sizes,
};
