import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Link, VStack } from "../../user-interfaces";
import { Fallback } from "../general";

export function MyEmptyBookedTelemedicineListMobile() {
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={6}>
      <Fallback
        title="Buat Jadwal Chat Dokter, Yuk!"
        description="Jadwalkan konsultasimu dengan dokter dan detailnya dapat kamu lihat di sini."
        image={{
          src: ASSETS.EMPTY_BOOKING_DOCTOR,
          width: 232,
          height: 240,
        }}
        isMobile
      />
      <Navigate name="TELEMED_HCPS">
        <Link variant="solid" width="full" background="main.500">
          Buat Jadwal Chat
        </Link>
      </Navigate>
    </VStack>
  );
}
