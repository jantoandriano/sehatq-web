import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function InternistClinicArticleDesktop() {
  return (
    <ClinicArticle
      isMobile={false}
      perPage="3"
      tagSlug="spesialis-penyakit-dalam"
      articlesNavigation={{
        name: "TAG",
        query: { slug: "spesialis-penyakit-dalam" },
      }}
      title={
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontFamily="poppins"
          lineHeight="48px"
          w="766px"
        >
          Informasi Seputar Penyakit Dalam, Pencegahan, dan Perawatan
        </Text>
      }
    />
  );
}
