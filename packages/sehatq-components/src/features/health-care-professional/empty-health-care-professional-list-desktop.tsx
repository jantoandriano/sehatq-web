import { useAssets } from "@sehatq/utils";
import React from "react";
import { Box, Text } from "../../user-interfaces";
import { Fallback } from "../general";
import { RecommendedHealthCareFacilities } from "../health-care-facility";
import { RecommendedHealthCareProfessionals } from "./recommended-health-care-professionals";

export type EmptyHealthCareProfessionalListDesktopProps = {
  userLat?: string;
  userLong?: string;
};

export function EmptyHealthCareProfessionalListDesktop(
  props: EmptyHealthCareProfessionalListDesktopProps
) {
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  return (
    <>
      <Fallback
        image={{
          src: ASSETS.EMPTY_HCP_LIST,
          width: 281,
          height: 290,
        }}
        layout="horizontal"
        title="Halaman yang Kamu Cari Tidak Ditemukan"
        description={
          <Text color="charcoalGrey" fontSize="lg" fontFamily="openSans">
            Kamu bisa coba cek rekomendasi berikut ini
          </Text>
        }
      />
      <Box mt="10" mb="1">
        <RecommendedHealthCareProfessionals {...props} />
      </Box>
      <Box mt="10">
        <RecommendedHealthCareFacilities {...props} />
      </Box>
    </>
  );
}
