import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function CardiacClinicArticleMobile() {
  return (
    <ClinicArticle
      isMobile
      perPage="3"
      tagSlug="spesialis-jantung"
      title={
        <Text
          fontWeight="bold"
          fontSize="3xl"
          fontFamily="poppins"
          lineHeight={13}
        >
          Informasi Seputar Penyakit Jantung, Pencegahan, dan Perawatan
        </Text>
      }
    />
  );
}
