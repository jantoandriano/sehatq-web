import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function CardiacClinicArticleDesktop() {
  return (
    <ClinicArticle
      isMobile={false}
      perPage="3"
      tagSlug="spesialis-jantung"
      articlesNavigation={{
        name: "TAG",
        query: { slug: "spesialis-jantung" },
      }}
      title={
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontFamily="poppins"
          lineHeight="48px"
          w="766px"
        >
          Informasi Seputar Penyakit Jantung, Pencegahan, dan Perawatan
        </Text>
      }
    />
  );
}
