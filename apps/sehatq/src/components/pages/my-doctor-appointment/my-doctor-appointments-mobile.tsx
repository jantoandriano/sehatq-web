import React from "react";
import {
  MyDoctorAppointments as _MyDoctorAppointments,
  MyDoctorAppointmentsFilters as _MyDoctorAppointmentsFilters,
  Flex,
  Box,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
} from "@sehatq/components";
import { withQuery } from "src/utils";
import {
  MyDoctorAppointmentsQuery,
  MyDoctorAppointmentsParams,
} from "@get-props";
import { SehatQHeader } from "@components/ui/sehatq-header";

const FamilyMemberMenu = withQuery(
  _FamilyMemberMenu,
  (query: MyDoctorAppointmentsParams) => ({
    activeFamily: query.userId,
  })
);

const ActivityLinks = withQuery(
  _ActivityLinks,
  (query: MyDoctorAppointmentsParams) => ({
    userId: query.userId,
  })
);

const MyDoctorAppointments = withQuery(
  _MyDoctorAppointments,
  (query: MyDoctorAppointmentsParams & MyDoctorAppointmentsQuery) => ({
    userId: query.userId,
    status: query.status,
  })
);
const MyDoctorAppointmentsFilters = withQuery(
  _MyDoctorAppointmentsFilters,
  (query: MyDoctorAppointmentsParams & MyDoctorAppointmentsQuery) => ({
    userId: query.userId,
    status: query.status,
  })
);

export function MyDoctorAppointmentsMobile() {
  return (
    <>
      <SehatQHeader
        variant="text"
        text="Aktivitas"
        leftElement={
          <FamilyMemberMenu
            isMobile
            navigationValue={{ name: "MY_BOOKING_DOCTORS" }}
          />
        }
      />
      <Box borderBottom="1px solid" borderColor="veryLightPink" pt={1}>
        <ActivityLinks isMobile activeLink="MY_DOCTOR_APPOINTMENTS" />
      </Box>
      <Box background="iceBlue.500">
        <Box py="3">
          <MyDoctorAppointmentsFilters isMobile />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          p={2.5}
          minHeight="calc(100vh - 141px)"
        >
          <MyDoctorAppointments isMobile />
        </Flex>
      </Box>
    </>
  );
}
