import React from "react";
import { Box, Text } from "../../user-interfaces";

type ChatEndedBubbleMobileProps = {
  endedBy: string;
};
export function ChatEndedBubbleDesktop(props: ChatEndedBubbleMobileProps) {
  return (
    <Box mx={7} mt={4}>
      {props.endedBy == "time-out" ? (
        <Text
          height="34px"
          background="paleBlue.500"
          borderRadius="200px"
          fontSize="xs"
          color="charcoalGrey"
          textAlign="center"
          width="full"
          py={2}
          border="1px solid"
          borderColor="main.500"
        >
          Waktu konsultasi telah berakhir
        </Text>
      ) : (
        <Text
          height="34px"
          background="paleBlue.500"
          borderRadius="200px"
          fontSize="xs"
          color="charcoalGrey"
          textAlign="center"
          width="full"
          py={2}
          border="1px solid"
          borderColor="main.500"
          fontWeight="semibold"
        >
          {props.endedBy == "user" ? "Kamu" : "Dokter"}{" "}
          <Text as="span" d="inline" fontWeight="normal">
            telah mengakhiri chat
          </Text>
        </Text>
      )}
    </Box>
  );
}
