import React from "react";
import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
  GridItem as ChakraGridItem,
  GridItemProps as ChakraGridItemProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type GridProps = ChakraGridProps;

export const Grid = forwardRef<GridProps, "div">((props: GridProps, ref) => {
  return <ChakraGrid {...props} ref={ref} />;
});

Grid.displayName = "Grid";

export type GridItemProps = StripChakraProps<ChakraGridItemProps>;

export const GridItem = forwardRef<GridItemProps, "div">(
  (props: GridItemProps, ref) => {
    return <ChakraGridItem {...props} ref={ref} />;
  }
);

GridItem.displayName = "GridItem";
