import React from "react";
import { Box } from "../../user-interfaces";
import { Content } from "../layout";

export interface HCFContentDesktopProps {
  contentTitle: string;
  contentDescription: string;
}

export function HCFContentDesktop(props: HCFContentDesktopProps) {
  const { contentTitle, contentDescription } = props;

  return (
    <>
      <Box mb={3}>
        <Content>{contentTitle}</Content>
      </Box>
      <Content>{contentDescription}</Content>
    </>
  );
}
