import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Flex } from "../../user-interfaces";
import { SimpleBlock, Content } from "../layout";

interface HealthToolListHeadlineDesktopProps {
  title: string;
  content: string;
}

export function HealthToolListHeadlineDesktop(
  props: HealthToolListHeadlineDesktopProps
) {
  const ASSETS = useAssets(["HEALTH_TOOL_HEADLINE"]);
  return (
    <Box>
      <Flex
        backgroundImage={ASSETS.HEALTH_TOOL_HEADLINE}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        alignItems="start"
        w="100%"
        h="300px"
        pt="50px"
      >
        <SimpleBlock>
          <Box mt={1.5} width="582px" cursor="default">
            <Content>{props.title}</Content>
            <Content>{props.content}</Content>
          </Box>
        </SimpleBlock>
      </Flex>
    </Box>
  );
}
