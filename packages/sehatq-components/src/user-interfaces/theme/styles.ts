import { Styles, SystemStyleFunction } from "@chakra-ui/theme-tools";

import * as externals from "./externals";

const externalsStyles: SystemStyleFunction = (props) =>
  Object.values(externals).reduce(
    (acc, cur) => ({
      ...acc,
      ...(typeof cur === "function" ? cur(props) : cur),
    }),
    {}
  );

export const styles: Styles = {
  global: (props) => ({
    html: {
      bg: "inherit",
    },
    body: {
      bg: "#ffffff",
      color: "charcoalGrey",
    },
    ...externalsStyles(props),
  }),
};
