import React from "react";
import {
  Box,
  AdSlot,
  SehatQFooter,
  GridBlock,
  GridBlockItem,
  HealthToolHeadline,
  StartHealthToolSurvey,
  HealthToolContent,
} from "@sehatq/components";
import { HealthToolHead } from "@components/head";
import { HealthToolGPTProvider } from "@components/gpt-provider/health-tool";
import { type HealthToolProps } from "./health-tool";

type HealthToolDesktopProps = {
  slug: string;
  container: React.MutableRefObject<HTMLDivElement | null>;
} & HealthToolProps;

export function HealthToolDesktop(props: HealthToolDesktopProps) {
  const { slug, container, onStartSurvey } = props;

  return (
    <>
      <HealthToolHead />
      <HealthToolGPTProvider slug={slug}>
        <>
          <HealthToolHeadline isMobile={false} slug={slug} />
          <GridBlock my={5} isReverse mb={10}>
            <GridBlockItem>
              <StartHealthToolSurvey
                isMobile={false}
                slug={slug}
                onStartSurvey={onStartSurvey}
              />
              <div ref={container} />
              <Box mt="60px">
                <HealthToolContent slug={slug} />
              </Box>
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <AdSlot divId="div-gpt-ad-mr1" />
              </Box>
            </GridBlockItem>
          </GridBlock>
          <SehatQFooter isMobile={false} />
        </>
      </HealthToolGPTProvider>
    </>
  );
}
