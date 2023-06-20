import React from "react";
import {
  Flex,
  Box,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
  MyTelemedicines as _MyTelemedicines,
} from "@sehatq/components";
import { MyTelemedicinesParams } from "@get-props";
import { withQuery } from "@utils";
import { SehatQHeader } from "@components/ui/sehatq-header";

const FamilyMemberMenu = withQuery(
  _FamilyMemberMenu,
  (query: MyTelemedicinesParams) => ({
    activeFamily: query.userId,
  })
);

const ActivityLinks = withQuery(
  _ActivityLinks,
  (query: MyTelemedicinesParams) => ({
    userId: query.userId,
  })
);

const MyTelemedicines = withQuery(
  _MyTelemedicines,
  (query: MyTelemedicinesParams) => ({
    userId: query.userId,
  })
);

export function MyTelemedicinesMobile() {
  return (
    <>
      <SehatQHeader
        variant="text"
        text="Aktivitas"
        leftElement={<FamilyMemberMenu isMobile />}
      />
      <Box borderBottom="1px solid" borderColor="veryLightPink" pt={1}>
        <ActivityLinks isMobile activeLink={"MY_TELEMEDICINES" as const} />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        background="iceBlue.500"
        minHeight="calc(100vh - 86px)"
        p={2.5}
      >
        <MyTelemedicines isMobile />
      </Flex>
    </>
  );
}
