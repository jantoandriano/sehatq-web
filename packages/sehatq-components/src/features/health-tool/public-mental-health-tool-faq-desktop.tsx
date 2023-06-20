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
import { MENTAL_HEALTH_TOOL_FAQ } from "./mental-health-tool-constants";

type MentalHealthToolFAQProps = {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
};

export function PublicMentalHealthToolFaqDesktop() {
  return (
    <Accordion allowMultiple bg="white" w="100%">
      {MENTAL_HEALTH_TOOL_FAQ({ isMobile: false }).map(
        (item: MentalHealthToolFAQProps) => (
          <AccordionItem key={item.id}>
            <AccordionButton
              borderBottomColor="veryLightPink"
              borderBottomWidth="1px"
              py={4}
            >
              <Box flex="1" textAlign="left">
                <Text fontSize="4xl" fontFamily="poppins" fontWeight="semibold">
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon width="30px" height="30px" />
            </AccordionButton>
            <AccordionPanel py={4}>{item.content}</AccordionPanel>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}
