import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";

export function InternistClinicFastFactMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_FAST_FACT_MOBILE"]);

  return (
    <Box>
      <Image
        priority
        src={ASSETS.ILLUSTRATION_FAST_FACT_MOBILE}
        alt="Fakta Cepat Penyakit Dalam"
        height={315}
        width={329}
        layout="responsive"
        wrapperProps={{ mb: 8 }}
      />
      <Text
        fontSize="sm"
        fontFamily="poppins"
        fontWeight="medium"
        color="sea.500"
        mb={2}
      >
        KAMU WAJIB TAU, NIH!
      </Text>
      <Text
        fontSize="3xl"
        fontFamily="poppins"
        fontWeight="bold"
        color="charcoalGrey"
        lineHeight={12}
        mb={4}
      >
        Perokok Dewasa Bertambah Banyak Dalam 1 Dekade!
      </Text>
      <Text fontSize="sm" color="charcoalGrey" lineHeight={7}>
        Dalam kurun waktu 10 tahun, perokok dewasa bertambah 8,8 juta orang
        dewasa. Dari 60,3 juta pada 2011, menjadi 69,1 juta pada 2021. Padahal,
        merokok merupakan salah satu faktor risiko penyakit paru.
      </Text>
    </Box>
  );
}

export function InternistClinicFastFactSkeletonMobile() {
  return (
    <Box>
      <Skeleton height="315px" />
      <SkeletonText mt={5} />
      <SkeletonText mt={5} />
    </Box>
  );
}
