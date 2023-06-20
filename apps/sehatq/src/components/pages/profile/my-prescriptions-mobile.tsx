import React from "react";
import {
  Flex,
  Box,
  MyPrescriptions as _MyPrescriptions,
  MyPrescriptionsFilters as _MyPrescriptionsFilters,
} from "@sehatq/components";
import { MyPrescriptionsParams, MyPrescriptionsQuery } from "@get-props";
import { withQuery } from "@utils";
import { SehatQHeader } from "@components/ui/sehatq-header";

const MyPrescriptions = withQuery(
  _MyPrescriptions,
  (query: MyPrescriptionsQuery) => ({
    statusFlag: query.statusFlag,
  })
);

const MyPrescriptionsFilters = withQuery(
  _MyPrescriptionsFilters,
  (query: MyPrescriptionsQuery & MyPrescriptionsParams) => ({
    statusFlag: query.statusFlag,
  })
);

export function MyPrescriptionsMobile() {
  return (
    <>
      <SehatQHeader
        variant="text"
        text="Resep"
        backNavigate={{ name: "PROFILE" }}
      />
      <Flex
        flexDirection="column"
        background="iceBlue.500"
        minHeight="calc(100vh - 86px)"
        px={4}
        py={3}
      >
        <Box mb={4}>
          <MyPrescriptionsFilters isMobile />
        </Box>
        <MyPrescriptions isMobile />
      </Flex>
    </>
  );
}
