import React from "react";
import {
  Box,
  SehatQFooter,
  HealthToolList,
  HealthToolListContent,
} from "@sehatq/components";
import { HealthToolListHead } from "@components/head";
import { SehatQHeader } from "@components/ui/sehatq-header";

export function HealthToolListMobile() {
  return (
    <>
      <HealthToolListHead />
      <SehatQHeader variant="text" text="Tes Kesehatan" />
      <Box px={6} my={6} width="full">
        <HealthToolList isMobile />
      </Box>
      <Box px={4}>
        <HealthToolListContent isMobile />
      </Box>
      <Box background="white" p={4}>
        <SehatQFooter isMobile />
      </Box>
    </>
  );
}
