import React from "react";
import {
  Flex,
  Box,
  Text,
  ProfileSideMenu,
  FamilyMemberMenu as _FamilyMemberMenu,
  GridBlock,
  GridBlockItem,
  MyHealthServiceAppointment,
} from "@sehatq/components";
import { withQuery } from "@utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { MyHealthServiceAppointmentParams } from "@get-props";

export interface MyHealthServiceAppointmentDesktopProps {
  id: string;
}

const FamilyMemberMenu = withQuery(
  _FamilyMemberMenu,
  (query: MyHealthServiceAppointmentParams) => ({
    activeFamily: query.userId,
  })
);

export function MyHealthServiceAppointmentDesktop(
  props: MyHealthServiceAppointmentDesktopProps
) {
  const { id } = props;
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
            overflow="hidden"
            my={5}
          >
            <Box
              borderBottom="1px solid"
              borderColor="veryLightPink"
              paddingLeft={9}
              paddingY={3}
            >
              <Text fontWeight="semibold" fontSize="lg">
                Detail Layanan Pemeriksaan
              </Text>
            </Box>
            <Box
              background="iceBlue.500"
              pt={3.5}
              px={5}
              justifyContent="center"
              pb={9}
            >
              <MyHealthServiceAppointment bookingId={id} isMobile={false} />
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
