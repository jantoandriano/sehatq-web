import { useAssets } from "@sehatq/utils";
import React from "react";
import { Box, VStack } from "../../user-interfaces";
import { Fallback } from "../general";
import { RecommendedHealthCareProfessionals } from "../health-care-professional";
import { RecommendedHealthCareFacilities } from "./recommended-health-care-facilities";

export function EmptyHealthCareFacilityListMobile() {
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <VStack width="100%" spacing={8} paddingX={3} paddingY={8}>
      <Fallback
        isMobile
        image={{
          src: ASSETS.EMPTY_HCP_LIST,
          width: 260,
          height: 260,
        }}
        title={`Pencarian "Rumah Sehat" Tidak Ditemukan`}
        description="Coba kata kunci lain atau ulangi pencarian."
      />
      <Box width="100%">
        <RecommendedHealthCareFacilities isMobile />
      </Box>
      <Box width="100%">
        <RecommendedHealthCareProfessionals isMobile />
      </Box>
    </VStack>
  );
}
