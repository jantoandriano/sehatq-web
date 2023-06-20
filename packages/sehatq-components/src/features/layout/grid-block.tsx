import React from "react";
import {
  Grid,
  GridItem,
  GridProps,
  GridItemProps,
} from "../../user-interfaces";

interface GridBlockProps
  extends Omit<
    GridProps,
    "marginLeft" | "marginRight" | "gap" | "width" | "templateColumns"
  > {
  isReverse?: boolean;
}

export function GridBlock({
  children,
  isReverse,
  ...restProps
}: GridBlockProps) {
  return (
    <Grid
      gap={7}
      width="1090px"
      marginLeft="auto"
      marginRight="auto"
      templateColumns={isReverse ? "762px 300px" : "300px 762px"}
      {...restProps}
    >
      {children}
    </Grid>
  );
}

interface GridBlockItemProps {
  children: GridItemProps["children"];
}

export function GridBlockItem({ children }: GridBlockItemProps) {
  return <GridItem>{children}</GridItem>;
}
