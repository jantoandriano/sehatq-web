import React from "react";

import { Text } from "../../user-interfaces";
import { ClinicArticle } from "./clinic-article";

export function PediatricClinicArticleMobile() {
  return (
    <ClinicArticle
      isMobile
      perPage="12"
      tagSlug="spesialis-anak"
      title={
        <Text
          fontWeight="bold"
          fontSize="3xl"
          fontFamily="poppins"
          lineHeight={13}
        >
          Informasi Seputar Tumbuh Kembang, Kesehatan & Tips Lainnya
        </Text>
      }
    />
  );
}
