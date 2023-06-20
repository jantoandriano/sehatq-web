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

export function PublicMentalHealthToolFaqMobile() {
  return (
    <Accordion allowMultiple bg="white" w="100%">
      {MENTAL_HEALTH_TOOL_FAQ({ isMobile: true }).map(
        (item: MentalHealthToolFAQProps) => (
          <AccordionItem key={item.id}>
            <AccordionButton
              borderBottomColor="veryLightPink"
              borderBottomWidth="1px"
              py={4}
              px={0}
            >
              <Box flex="1" textAlign="left">
                <Text fontFamily="poppins" fontWeight="semibold">
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon width="20px" height="20px" />
            </AccordionButton>
            <AccordionPanel py={4} px={0}>
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}
