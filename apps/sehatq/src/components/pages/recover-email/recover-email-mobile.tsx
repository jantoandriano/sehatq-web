import React from "react";

import { Box, RecoverEmailForm, Text } from "@sehatq/components";

interface Props {
  token: string;
}

export function RecoverEmailMobile({ token }: Props) {
  return (
    <>
      <Text fontWeight="bold" fontFamily="Poppins" fontSize="md" padding="6">
        Ubah Password
      </Text>
      <Box px="6">
        <RecoverEmailForm isMobile token={token} />
      </Box>
    </>
  );
}
