import React from "react";
import { Box, SimpleGrid } from "../../user-interfaces";
import {
  DiseaseCard,
  DiseaseCardProps,
  DiseaseCardSkeleton,
} from "./disease-card";

export interface RelatedDiseasesDesktopProps {
  diseases: DiseaseCardProps[];
  isLoading: boolean;
}

export function RelatedDiseasesDesktop({
  diseases,
  isLoading,
}: RelatedDiseasesDesktopProps) {
  return (
    <SimpleGrid mt={5} spacing={5} columns={2}>
      {diseases.length
        ? diseases.map((disease) => (
            <Box key={disease.slug}>
              <DiseaseCard {...disease} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(4).keys()).map((id) => (
            <Box key={id}>
              <DiseaseCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </SimpleGrid>
  );
}
