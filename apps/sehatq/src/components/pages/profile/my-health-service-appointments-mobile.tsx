import React from "react";
import {
  Flex,
  Box,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
  MyHealthServiceAppointments as _MyHealthServiceAppointments,
  MyHealthServiceAppointmentStatusFilters as _MyHealthServiceAppointmentStatusFilters,
} from "@sehatq/components";
import {
  MyHealthServiceAppointmentsQuery,
  MyHealthServiceAppointmentsParams,
} from "@get-props";
import { withQuery } from "@utils";
import { SehatQHeader } from "@components/ui/sehatq-header";

const FamilyMemberMenu = withQuery(
  _FamilyMemberMenu,
  (query: MyHealthServiceAppointmentsParams) => ({
    activeFamily: query.userId,
  })
);

const ActivityLinks = withQuery(
  _ActivityLinks,
  (query: MyHealthServiceAppointmentsParams) => ({
    userId: query.userId,
  })
);

const MyHealthServiceAppointments = withQuery(
  _MyHealthServiceAppointments,
  (
    query: MyHealthServiceAppointmentsParams & MyHealthServiceAppointmentsQuery
  ) => ({
    userId: query.userId,
    status: query.status,
  })
);

const MyHealthServiceAppointmentStatusFilters = withQuery(
  _MyHealthServiceAppointmentStatusFilters,
  (
    query: MyHealthServiceAppointmentsParams & MyHealthServiceAppointmentsQuery
  ) => ({
    userId: query.userId,
    status: query.status,
  })
);

export function MyHealthServiceAppointmentsMobile() {
  return (
    <>
      <SehatQHeader
        variant="text"
        text="Aktivitas"
        leftElement={
          <FamilyMemberMenu
            isMobile
            navigationValue={{ name: "MY_HEALTH_SERVICES" }}
          />
        }
      />
      <Box borderBottom="1px solid" borderColor="veryLightPink" pt={1}>
        <ActivityLinks isMobile activeLink={"MY_HEALTH_SERVICES" as const} />
      </Box>
      <Box background="iceBlue.500" minHeight="calc(100vh - 86px)">
        <Box pt={3}>
          <MyHealthServiceAppointmentStatusFilters isMobile />
        </Box>
        <Flex flexDirection="column" justifyContent="space-between" p={4}>
          <MyHealthServiceAppointments isMobile />
        </Flex>
      </Box>
    </>
  );
}
