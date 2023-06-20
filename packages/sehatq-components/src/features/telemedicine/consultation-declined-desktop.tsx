import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import { VStack, HStack, Text, Link } from "../../user-interfaces";
import { Fallback } from "../general";

export type ConsultationDeclinedDesktopProps = {
  isPaidChat: boolean;
  changeScheduleHref: string;
};

export function ConsultationDeclinedDesktop(
  props: ConsultationDeclinedDesktopProps
) {
  const { isPaidChat, changeScheduleHref } = props;
  const ASSETS = useAssets(["ILLUSTRATION_DOCTOR_BUSY"]);
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={10} width="100%">
      <Fallback
        image={{
          src: ASSETS.ILLUSTRATION_DOCTOR_BUSY,
          width: 520,
          height: 520,
        }}
        layout="vertical"
        title="Dokter Belum Bisa Melayanimu"
        description={
          <Text
            color="charcoalGrey"
            fontSize="lg"
            fontFamily="openSans"
            textAlign="center"
            width="545px"
          >
            {isPaidChat
              ? "Tenang, customer care kami bisa mencarikan jadwal lain dari dokter pilihanmu"
              : "Silakan ulangi 5-10 menit lagi atau coba konsultasi dengan dokter spesialis"}
          </Text>
        }
      />
      {isPaidChat ? (
        <HStack spacing={6} width="100%">
          <Navigate name="HOME">
            <Link
              variant="outline"
              fontWeight="semibold"
              color="sea.500"
              borderColor="main.500"
              flex="1"
              size="md"
              borderRadius="base"
            >
              Kembali ke Home
            </Link>
          </Navigate>
          <Link
            variant="solid"
            fontWeight="semibold"
            colorScheme="main"
            flex="1"
            size="md"
            borderRadius="base"
            href={changeScheduleHref}
          >
            Ubah Jadwal
          </Link>
        </HStack>
      ) : (
        <Navigate name="HOME">
          <Link
            variant="solid"
            fontWeight="semibold"
            colorScheme="main"
            width="425px"
            size="md"
            borderRadius="base"
            boxShadow="lg"
            margin="0 auto"
          >
            Kembali
          </Link>
        </Navigate>
      )}
    </VStack>
  );
}
