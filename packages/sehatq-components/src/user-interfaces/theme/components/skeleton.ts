import { keyframes } from "@chakra-ui/system";
import { getColor } from "@chakra-ui/theme-tools";
import type { SystemStyleFunction } from "@chakra-ui/theme-tools";

const fade = (startColor: string, endColor: string) =>
  keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  });

const baseStyle: SystemStyleFunction = (props) => {
  const {
    startColor = "gray.500",
    endColor = "gray.700",
    speed,
    theme,
  } = props;

  const start = getColor(theme, startColor);
  const end = getColor(theme, endColor);

  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: `${speed}s linear infinite alternate ${fade(start, end)}`,
  };
};

export const Skeleton = {
  baseStyle,
};
