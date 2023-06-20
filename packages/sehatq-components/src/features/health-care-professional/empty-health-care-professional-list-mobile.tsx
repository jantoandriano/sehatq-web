import { useAssets } from "@sehatq/utils";
import React from "react";
import { Box, Text } from "../../user-interfaces";
import { Fallback } from "../general";
import { RecommendedHealthCareFacilities } from "../health-care-facility";
import { RecommendedHealthCareProfessionals } from "./recommended-health-care-professionals";

export type EmptyHealthCareProfessionalListMobileProps = {
  userLat?: string;
  userLong?: string;
};

export function EmptyHealthCareProfessionalListMobile(
  props: EmptyHealthCareProfessionalListMobileProps
) {
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <>
      <Fallback
        isMobile
        image={{
          src: ASSETS.EMPTY_HCP_LIST,
          width: 220,
          height: 226,
        }}
        title=" Halaman yang Kamu Cari Tidak Ditemukan"
        description={
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontFamily="openSans"
            textAlign="center"
          >
            Kamu bisa coba cek rekomendasi berikut ini
          </Text>
        }
      />
      <Box mt="10" mb="1">
        <RecommendedHealthCareProfessionals isMobile {...props} />
      </Box>
      <Box mt="10" mb="20">
        <RecommendedHealthCareFacilities isMobile {...props} />
      </Box>
    </>
  );
}
