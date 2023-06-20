import React from "react";
import {
  Flex,
  Box,
  Text,
  ProfileSideMenu,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
  MyHealthServiceAppointments as _MyHealthServiceAppointments,
  MyHealthServiceAppointmentStatusFilters as _MyHealthServiceAppointmentStatusFilters,
  GridBlock,
  GridBlockItem,
} from "@sehatq/components";
import { withQuery } from "@utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import {
  MyHealthServiceAppointmentsQuery,
  MyHealthServiceAppointmentsParams,
} from "@get-props";

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

export function MyHealthServiceAppointmentsDesktop() {
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
              navigationValue={{ name: "MY_HEALTH_SERVICES" }}
            />
          </Flex>
          <Box
            border="0.5px solid"
            borderColor="veryLightPink"
            borderRadius="xl"
            my={5}
          >
            <Box borderBottom="1px solid" borderColor="veryLightPink">
              <ActivityLinks isMobile={false} activeLink="MY_HEALTH_SERVICES" />
            </Box>
            <Box
              background="iceBlue.500"
              pt={3.5}
              px={5}
              justifyContent="center"
              pb={9}
            >
              <MyHealthServiceAppointmentStatusFilters isMobile={false} />
              <Box mt={6}>
                <MyHealthServiceAppointments />
              </Box>
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
