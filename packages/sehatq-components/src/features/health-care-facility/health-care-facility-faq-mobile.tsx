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

type HealthCareFacilityFAQProps = {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
};

type HealthCareFacilityFaqMobileProps = {
  content: HealthCareFacilityFAQProps[];
};

export function HealthCareFacilityFaqMobile(
  props: HealthCareFacilityFaqMobileProps
) {
  const { content } = props;
  return (
    <Box w="full">
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="sm"
        marginBottom={2}
      >
        FAQ
      </Text>
      <Accordion allowMultiple width="full">
        {content.map((item: HealthCareFacilityFAQProps) => (
          <AccordionItem
            key={item.id}
            borderBottomColor="veryLightPink"
            borderBottomWidth="0.5px"
          >
            <AccordionButton px={0} py={2}>
              <Box flex="1" textAlign="left">
                <Text fontFamily="poppins" fontWeight="semibold" fontSize="xs">
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon width={4} height={4} />
            </AccordionButton>
            <AccordionPanel px={0} py={1} mb={3}>
              <Text as="p" fontSize="xs">
                {item.content}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
