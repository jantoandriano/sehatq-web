import React from "react";
import {
  MyDoctorAppointments as _MyDoctorAppointments,
  MyDoctorAppointmentsFilters as _MyDoctorAppointmentsFilters,
  Flex,
  Box,
  Text,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
} from "@sehatq/components";
import { withQuery } from "src/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import {
  MyDoctorAppointmentsQuery,
  MyDoctorAppointmentsParams,
} from "@get-props";

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

export function MyDoctorAppointmentsDesktop() {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Flex bgColor="white" align="center" justify="space-between">
            <Box>
              <Text fontSize="5xl" fontWeight="semibold" fontFamily="poppins">
                Aktivitas
              </Text>
              <Text fontSize="md">Catatan semua aktivitasmu.</Text>
            </Box>
            <FamilyMemberMenu
              isMobile={false}
              navigationValue={{ name: "MY_BOOKING_DOCTORS" }}
            />
          </Flex>
          <Box
            border="0.5px solid"
            borderColor="veryLightPink"
            borderRadius="xl"
            overflow="hidden"
            mt={5}
          >
            <Box borderBottom="1px solid" borderColor="veryLightPink">
              <ActivityLinks
                isMobile={false}
                activeLink="MY_DOCTOR_APPOINTMENTS"
              />
            </Box>
            <Box background="iceBlue.500" px={5} py={4}>
              <MyDoctorAppointmentsFilters isMobile={false} />
              <Box mt={6}>
                <MyDoctorAppointments isMobile={false} />
              </Box>
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
