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

type HealthCareProfessionalFAQProps = {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
};

type HealthCareProfessionalFaqDesktopProps = {
  content: HealthCareProfessionalFAQProps[];
};

export function HealthCareProfessionalFaqDesktop(
  props: HealthCareProfessionalFaqDesktopProps
) {
  const { content } = props;
  return (
    <Box backgroundColor="white" w="100%">
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="3xl"
        marginBottom={2}
      >
        FAQ
      </Text>
      <Accordion allowMultiple width="100%">
        {content.map((item: HealthCareProfessionalFAQProps) => (
          <AccordionItem
            key={item.id}
            borderBottomColor="veryLightPink"
            borderBottomWidth="0.5px"
          >
            <AccordionButton px={0} py={4}>
              <Box flex="1" textAlign="left">
                <Text fontFamily="poppins" fontWeight="semibold">
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon width={4} height={4} />
            </AccordionButton>
            <AccordionPanel px={0} py={1} mb={3}>
              <Text as="p">{item.content}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
