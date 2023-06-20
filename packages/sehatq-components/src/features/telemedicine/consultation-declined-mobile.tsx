import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import { Flex, VStack, Link, Text } from "../../user-interfaces";
import { Fallback } from "../general";

export type ConsultationDeclinedMobileProps = {
  isPaidChat: boolean;
  changeScheduleHref: string;
};

export function ConsultationDeclinedMobile(
  props: ConsultationDeclinedMobileProps
) {
  const { isPaidChat, changeScheduleHref } = props;
  const ASSETS = useAssets(["ILLUSTRATION_DOCTOR_BUSY"]);
  const { Navigate } = useNavigation();
  return (
    <Flex
      flex="1"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      width="100%"
    >
      <Fallback
        image={{
          src: ASSETS.ILLUSTRATION_DOCTOR_BUSY,
          width: 300,
          height: 300,
        }}
        layout="vertical"
        title="Dokter Belum Bisa Melayanimu"
        description={
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontFamily="openSans"
            textAlign="center"
            width={isPaidChat ? "328px" : "260px"}
          >
            {isPaidChat
              ? "Tenang, customer care kami bisa mencarikan jadwal lain dari dokter pilihanmu"
              : "Silakan ulangi 5-10 menit lagi atau coba konsultasi dengan dokter spesialis"}
          </Text>
        }
        isMobile
        isFullWidth
      />
      <VStack spacing={4}>
        {isPaidChat ? (
          <>
            <Link
              variant="solid"
              fontWeight="semibold"
              fontFamily="poppins"
              colorScheme="main"
              width="full"
              height="40px"
              size="md"
              borderRadius="base"
              href={changeScheduleHref}
            >
              Ubah Jadwal
            </Link>
            <Navigate name="HOME">
              <Link
                variant="outline"
                fontWeight="semibold"
                fontFamily="poppins"
                color="sea.500"
                borderColor="main.500"
                width="full"
                height="40px"
                size="md"
                borderRadius="base"
              >
                Kembali ke Home
              </Link>
            </Navigate>
          </>
        ) : (
          <Navigate name="HOME">
            <Link
              variant="solid"
              fontWeight="semibold"
              colorScheme="main"
              width="full"
              height="40px"
              size="md"
              borderRadius="base"
              boxShadow="lg"
            >
              Kembali
            </Link>
          </Navigate>
        )}
      </VStack>
    </Flex>
  );
}
