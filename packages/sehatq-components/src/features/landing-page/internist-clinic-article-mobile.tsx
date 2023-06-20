import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function InternistClinicArticleMobile() {
  return (
    <ClinicArticle
      isMobile
      perPage="3"
      tagSlug="spesialis-penyakit-dalam"
      title={
        <Text
          fontWeight="bold"
          fontSize="3xl"
          fontFamily="poppins"
          lineHeight={13}
        >
          Informasi Seputar Penyakit Dalam, Pencegahan, dan Perawatan
        </Text>
      }
    />
  );
}
