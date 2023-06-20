import React from "react";
import {
  Text,
  SkeletonText,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "../../user-interfaces";
import { Content } from "../layout";

export type DiseaseReferenceDesktopProps = {
  references: string;
};

export function DiseaseReferenceDesktop(props: DiseaseReferenceDesktopProps) {
  const { references } = props;
  return references ? (
    <Accordion allowMultiple border="none">
      <AccordionItem border="none">
        <AccordionButton
          p={0}
          _focus={{ outline: "none" }}
          _hover={{ bg: "none" }}
        >
          <Text fontSize="sm" fontWeight="semibold" textAlign="left">
            Referensi
          </Text>
          <AccordionIcon marginLeft={2} />
        </AccordionButton>
        <AccordionPanel p={0}>
          <Content>{references}</Content>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : null;
}

export function DiseaseReferenceDesktopSkeleton() {
  return <SkeletonText />;
}
