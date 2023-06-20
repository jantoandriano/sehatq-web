import { useAssets } from "@sehatq/utils";
import React from "react";
import { Box, Text, VStack } from "../../user-interfaces";
import { Fallback } from "../general";
import { RecommendedHealthCareProfessionals } from "../health-care-professional";
import { RecommendedHealthCareFacilities } from "./recommended-health-care-facilities";

export function EmptyHealthCareFacilityListDesktop() {
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <VStack width="100%" spacing={8} paddingX={3} paddingY={8}>
      <Fallback
        image={{
          src: ASSETS.EMPTY_HCP_LIST,
          width: 280,
          height: 280,
        }}
        title={`Pencarian "Rumah Sehat" Tidak Ditemukan`}
        description={
          <Text textAlign="left" fontSize="md" color="charcoalGrey">
            Coba kata kunci lain atau ulangi pencarian.
          </Text>
        }
        layout="horizontal"
        isFullWidth
      />
      <Box width="100%">
        <RecommendedHealthCareFacilities />
      </Box>
      <Box width="100%">
        <RecommendedHealthCareProfessionals />
      </Box>
    </VStack>
  );
}
