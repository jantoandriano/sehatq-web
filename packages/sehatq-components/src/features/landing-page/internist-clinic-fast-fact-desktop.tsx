import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
} from "../../user-interfaces";

export function InternistClinicFastFactDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_FAST_FACT"]);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          priority
          src={ASSETS.ILLUSTRATION_FAST_FACT}
          alt="Fakta Cepat Penyakit Dalam"
          height={446}
          width={467}
          layout="fixed"
        />

        <Box>
          <Text
            fontSize="xl"
            fontFamily="poppins"
            fontWeight="medium"
            color="sea.500"
            mb={3}
          >
            KAMU WAJIB TAU, NIH!
          </Text>
          <Text
            fontSize="7xl"
            fontFamily="poppins"
            fontWeight="bold"
            color="charcoalGrey"
            mb={2}
            w="570px"
          >
            Perokok Dewasa Bertambah Banyak Dalam 1 Dekade!
          </Text>
          <Text fontSize="sm" color="#728797" mb={2} lineHeight={11} w="570px">
            Dalam kurun waktu 10 tahun, perokok dewasa bertambah 8,8 juta orang
            dewasa. Dari 60,3 juta pada 2011, menjadi 69,1 juta pada 2021.
            Padahal, merokok merupakan salah satu faktor risiko penyakit paru.
          </Text>
          <Text fontSize="md" color="charcoalGrey" fontStyle="italic">
            (Global Adult Tobacco Survey-GATS. 2021)
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export function InternistClinicFastFactSkeletonDesktop() {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Skeleton width="467px" height="446px" borderRadius="lg" />
      <Box>
        <VStack spacing={7}>
          <SkeletonText w="570px" />
          <SkeletonText w="570px" />
          <SkeletonText w="570px" />
        </VStack>
      </Box>
    </Flex>
  );
}
