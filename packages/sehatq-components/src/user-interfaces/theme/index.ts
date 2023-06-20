import { extendTheme } from "@chakra-ui/react";

import { config } from "./config";
import { styles } from "./styles";
import { foundations } from "./foundations";
import * as components from "./components";

export const theme = extendTheme({
  config,
  styles,
  ...foundations,
  components: { ...components },
});
