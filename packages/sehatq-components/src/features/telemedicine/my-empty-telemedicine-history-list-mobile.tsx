import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Link, VStack } from "../../user-interfaces";
import { Fallback } from "../general";

export function MyEmptyTelemedicineHistoryListMobile() {
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={6}>
      <Fallback
        title="Coba Chat Dokter, Yuk!"
        description="Konsultasikan kesehatanmu dan dapatkan rekomendasi pola hidup sehat."
        image={{
          src: ASSETS.EMPTY_TELEMED_HISTORY_LIST,
          width: 232,
          height: 240,
        }}
        isMobile
      />
      <Navigate name="TELEMEDICINES">
        <Link variant="solid" width="full" background="main.500">
          Mulai Chat
        </Link>
      </Navigate>
    </VStack>
  );
}
