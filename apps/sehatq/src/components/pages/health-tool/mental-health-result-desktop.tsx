import React from "react";
import { Text, Image, Flex, Link } from "@sehatq/components";
import { useAssets, useNavigation } from "@sehatq/utils";
import { MentalHealthFormHead } from "@components/head";

export type MentalHealthResultDesktopProps = {
  isMobile: boolean;
  isLogin: boolean;
  specialitySlug?: string | string[];
  specialityId?: string | string[];
  userId?: number;
};

export function MentalHealthResultDesktop(
  props: MentalHealthResultDesktopProps
) {
  const { isLogin, specialitySlug, specialityId, userId } = props;
  const ASSETS = useAssets(["THUMBS_UP"]);
  const { Navigate } = useNavigation();
  return (
    <>
      <MentalHealthFormHead />
      <Flex
        background="iceBlue.500"
        width="100%"
        minHeight="100vh"
        align="center"
        justify="center"
        direction="column"
        textAlign="center"
      >
        <Image
          src={ASSETS.THUMBS_UP}
          alt="Tes Telah Selesai"
          width={145}
          height={150}
          priority={true}
          marginBottom={8}
        />
        <Text
          fontFamily="poppins"
          fontSize="xl"
          fontWeight="semibold"
          marginBottom={3}
        >
          {isLogin ? "Hasil Tes Berhasil Disimpan" : "Tes Telah Selesai"}
        </Text>
        <Text maxW={440} fontSize="lg" paddingX={4} marginBottom={10}>
          {isLogin
            ? "Catatan kesehatan mental akan diperbarui. Pantau kesehatan lebih optimal dengan konsultasi ke Chat Dokter"
            : "Pantau kesehatan lebih optimal dengan konsultasi ke Chat Dokter"}
        </Text>
        <Navigate
          name="TELEMED_HCPS"
          query={{
            slugs:
              typeof specialitySlug === "string" ? [specialitySlug] : undefined,
            specialityId,
          }}
        >
          <Link
            variant="solid"
            colorScheme="main"
            maxW={440}
            width="100%"
            marginBottom={3}
          >
            Lanjutkan ke chat dokter
          </Link>
        </Navigate>
        {isLogin ? (
          <Navigate
            name="MY_MENTAL_RECORDS"
            query={{
              userId,
            }}
          >
            <Link maxW={440} width="100%" colorScheme="sea" variant="ghost">
              Lihat Catatan Kesehatan Mental
            </Link>
          </Navigate>
        ) : null}
      </Flex>
    </>
  );
}
