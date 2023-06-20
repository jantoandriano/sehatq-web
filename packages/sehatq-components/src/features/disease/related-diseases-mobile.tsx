import React from "react";
import { Flex, Box } from "../../user-interfaces";
import {
  DiseaseCard,
  DiseaseCardProps,
  DiseaseCardSkeleton,
} from "./disease-card";

export interface RelatedDiseasesMobileProps {
  diseases: DiseaseCardProps[];
  isLoading: boolean;
}

export function RelatedDiseasesMobile({
  diseases,
  isLoading,
}: RelatedDiseasesMobileProps) {
  return (
    <Flex>
      {diseases.length
        ? diseases.map((disease, index) => (
            <Box
              key={disease.slug}
              minWidth="244px"
              marginLeft={index === 0 ? 0 : 4}
              flex="1"
            >
              <DiseaseCard {...disease} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(3).keys()).map((id, index) => (
            <Box
              key={id}
              minWidth="244px"
              marginLeft={index === 0 ? 0 : 4}
              flex="1"
            >
              <DiseaseCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </Flex>
  );
}
