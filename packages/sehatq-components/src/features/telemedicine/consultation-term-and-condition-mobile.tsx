import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Box, Link, Text } from "../../user-interfaces";

export function ConsultationTermAndConditionMobile() {
  const { Navigate } = useNavigation();
  return (
    <Box
      borderRadius="base"
      background="paleBlue.500"
      border="0.5px solid"
      borderColor="sea.500"
      p={3}
    >
      <Text fontSize="xs" color="charcoalGrey">
        Dengan melanjutkan, saya telah menyetujui
      </Text>
      <Navigate name="TNC">
        <Link fontSize="xs" color="sea.500" fontWeight="semibold">
          Syarat dan Ketentuan SehatQ
        </Link>
      </Navigate>
    </Box>
  );
}
