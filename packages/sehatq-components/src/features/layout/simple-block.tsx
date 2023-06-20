import React from "react";
import { Container, ContainerProps } from "../../user-interfaces";

type SimpleBlockProps = Omit<ContainerProps, "width">;

export function SimpleBlock({ children, ...restProps }: SimpleBlockProps) {
  return (
    <Container
      width="1090px"
      maxWidth="1090px"
      paddingInline={0}
      {...restProps}
    >
      {children}
    </Container>
  );
}
