import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Link, Text, VStack } from "../../user-interfaces";
import { Fallback } from "../general";

export function MyEmptyTelemedicineHistoryListDesktop() {
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={6}>
      <Fallback
        title="Coba Chat Dokter, Yuk!"
        description={
          <Text textAlign="center" width="334px">
            Konsultasikan kesehatanmu dan dapatkan rekomendasi pola hidup sehat.
          </Text>
        }
        image={{
          src: ASSETS.EMPTY_TELEMED_HISTORY_LIST,
          width: 330,
          height: 342,
        }}
      />
      <Navigate name="TELEMEDICINES">
        <Link variant="solid" width="328px" height="46px" background="main.500">
          Mulai Chat
        </Link>
      </Navigate>
    </VStack>
  );
}
