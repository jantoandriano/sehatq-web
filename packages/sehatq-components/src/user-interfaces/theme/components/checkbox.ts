import { SystemStyleFunction } from "@chakra-ui/theme-tools";

const parts = ["control"];

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    control: {
      _checked: {
        _disabled: {
          opacity: 0.4,
          backgroundColor: `${c}.500`,
          borderColor: `${c}.500`,
        },
      },
    },
  };
};

export const Checkbox = {
  baseStyle,
  defaultProps: {
    colorScheme: "sea",
  },
  parts,
};
