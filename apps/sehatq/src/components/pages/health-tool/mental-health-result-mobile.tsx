import React from "react";
import { Text, Image, Flex, Link, Box } from "@sehatq/components";
import { useAssets, useNavigation } from "@sehatq/utils";
import { MentalHealthFormHead } from "@components/head";
import { SehatQHeader } from "@components/ui/sehatq-header";

export type MentalHealthResultMobileProps = {
  isMobile: boolean;
  isLogin: boolean;
  specialitySlug?: string | string[];
  specialityId?: string | string[];
  userId?: number;
};

export function MentalHealthResultMobile(props: MentalHealthResultMobileProps) {
  const { isLogin, specialitySlug, specialityId, userId } = props;
  const ASSETS = useAssets(["THUMBS_UP"]);
  const { Navigate } = useNavigation();
  return (
    <>
      <MentalHealthFormHead />
      <SehatQHeader
        variant="text"
        text="Hasil Cek Kesehatan Mental"
        backNavigate={{ name: "HEALTH_TOOLS" }}
      />
      <Flex
        background="iceBlue.500"
        width="100%"
        minHeight="calc(100vh - 56px)"
        align="center"
        justify="space-between"
        direction="column"
        textAlign="center"
      >
        <Flex align="center" direction="column" paddingTop="12vh">
          <Image
            src={ASSETS.THUMBS_UP}
            alt="Tes Telah Selesai"
            width={144}
            height={150}
            priority={true}
            marginBottom={8}
          />
          <Text
            fontFamily="poppins"
            fontSize="md"
            fontWeight="semibold"
            marginBottom={2}
          >
            {isLogin ? "Hasil Tes Berhasil Disimpan" : "Tes Telah Selesai"}
          </Text>
          <Text maxW={300} fontSize="sm">
            {isLogin
              ? "Catatan kesehatan mental akan diperbarui. Pantau kesehatan lebih optimal dengan konsultasi ke Chat Dokter"
              : "Pantau kesehatan lebih optimal dengan konsultasi ke Chat Dokter"}
          </Text>
        </Flex>
        <Box paddingX={10}>
          <Navigate
            name="TELEMED_HCPS"
            query={{
              slugs:
                typeof specialitySlug === "string"
                  ? [specialitySlug]
                  : undefined,
              specialityId,
            }}
          >
            <Link
              variant="solid"
              colorScheme="main"
              width="100%"
              marginBottom={1}
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
              <Link
                width="100%"
                colorScheme="sea"
                variant="ghost"
                marginBottom={3}
              >
                Lihat Catatan Kesehatan Mental
              </Link>
            </Navigate>
          ) : null}
        </Box>
      </Flex>
    </>
  );
}
