import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Link, Text, VStack } from "../../user-interfaces";
import { Fallback } from "../general";

export function MyEmptyBookedTelemedicineListDesktop() {
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={6}>
      <Fallback
        title="Buat Jadwal Chat Dokter, Yuk!"
        description={
          <Text textAlign="center" width="334px">
            Jadwalkan konsultasimu dengan dokter dan detailnya dapat kamu lihat
            di sini.
          </Text>
        }
        image={{
          src: ASSETS.EMPTY_BOOKING_DOCTOR,
          width: 330,
          height: 341,
        }}
      />
      <Navigate name="TELEMED_HCPS">
        <Link variant="solid" width="328px" height="46px" background="main.500">
          Buat Jadwal Chat
        </Link>
      </Navigate>
    </VStack>
  );
}
