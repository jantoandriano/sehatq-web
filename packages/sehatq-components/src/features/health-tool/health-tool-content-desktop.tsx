import React from "react";
import {
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "../../user-interfaces";
import { Content } from "../layout";

type HealthToolContentDesktopProps = {
  contents: {
    title: string;
    description: string;
  }[];
};

export function HealthToolContentDesktop(props: HealthToolContentDesktopProps) {
  return props.contents.length > 0 ? (
    <Accordion allowMultiple bg="white" w="100%">
      {props.contents.map((content) => (
        <AccordionItem key={content.title}>
          <AccordionButton
            borderBottomColor="veryLightPink"
            borderBottomWidth="1px"
            py={4}
          >
            <Box flex="1" textAlign="left">
              <Text fontSize="2xl" fontFamily="poppins" fontWeight="semibold">
                {content.title}
              </Text>
            </Box>
            <AccordionIcon width="20px" height="20px" />
          </AccordionButton>
          <AccordionPanel py={4}>
            <Content>{content.description}</Content>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ) : null;
}
