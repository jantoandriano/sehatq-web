import React from "react";

import {
  Box,
  SehatQFooter,
  HealthToolHeadline,
  StartHealthToolSurvey,
  HealthToolContent,
} from "@sehatq/components";
import { HealthToolHead } from "@components/head";
import { type HealthToolProps } from "./health-tool";

type HealthToolPropsMobile = {
  slug: string;
  container: React.MutableRefObject<HTMLDivElement | null>;
} & HealthToolProps;

export function HealthToolMobile(props: HealthToolPropsMobile) {
  return (
    <>
      <HealthToolHead />
      <HealthToolHeadline isMobile slug={props.slug}>
        <Box pt={10} mx={5}>
          <StartHealthToolSurvey
            isMobile
            slug={props.slug}
            onStartSurvey={props.onStartSurvey}
          />
        </Box>
      </HealthToolHeadline>
      <div ref={props.container} />
      <Box mt="30px" marginBottom="40px" px={4}>
        <HealthToolContent isMobile slug={props.slug} />
      </Box>
      <Box px={4}>
        <SehatQFooter isMobile />
      </Box>
    </>
  );
}
