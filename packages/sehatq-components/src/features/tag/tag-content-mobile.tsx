import React from "react";
import { Box } from "../../user-interfaces";
import { Content } from "../layout";

export interface TagContentMobileProps {
  contentTitle: string;
  contentDescription: string;
}

export function TagContentMobile(props: TagContentMobileProps) {
  const { contentTitle, contentDescription } = props;

  return (
    <>
      <Box mb={3}>
        <Content isMobile={true}>{contentTitle}</Content>
      </Box>
      <Content isMobile={true}>{contentDescription}</Content>
    </>
  );
}
