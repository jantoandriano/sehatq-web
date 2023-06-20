import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Box, Link, Text } from "../../user-interfaces";

export function ConsultationTermAndConditionDesktop() {
  const { Navigate } = useNavigation();
  return (
    <Box>
      <Text fontSize="sm" color="charcoalGrey">
        Dengan melakukan Booking, saya telah menyetujui
      </Text>
      <Navigate name="TNC">
        <Link fontSize="sm" color="sea.500">
          Syarat dan Ketentuan SehatQ
        </Link>
      </Navigate>
    </Box>
  );
}
