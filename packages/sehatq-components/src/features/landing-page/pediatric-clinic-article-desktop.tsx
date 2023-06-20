import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function PediatricClinicArticleDesktop() {
  return (
    <ClinicArticle
      isMobile={false}
      perPage="12"
      tagSlug="spesialis-anak"
      articlesNavigation={{
        name: "ARTICLE",
        query: {
          slugs: ["parenting"],
        },
      }}
      title={
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontFamily="poppins"
          lineHeight="48px"
          w="766px"
        >
          Informasi Seputar Tumbuh Kembang, Kesehatan & Tips Lainnya
        </Text>
      }
    />
  );
}
