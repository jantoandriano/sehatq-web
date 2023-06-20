import React from "react";
import {
  Flex,
  Text,
  Box,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
  MyPrescriptions as _MyPrescriptions,
  MyPrescriptionsFilters as _MyPrescriptionsFilters,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { MyPrescriptionsQuery, MyPrescriptionsParams } from "@get-props";
import { withQuery } from "@utils";

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

export function MyPrescriptionsDesktop() {
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
                Riwayat Resep
              </Text>
              <Text fontSize="md">Catatan semua riwayat resepmu.</Text>
            </Box>
          </Flex>
          <Box
            border="1px solid"
            borderColor="veryLightPink"
            borderRadius="3xl"
            my={5}
          >
            <Box
              borderBottom="1px solid"
              borderColor="veryLightPink"
              px={7}
              py={5}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
                lineHeight="5"
              >
                Daftar Resep
              </Text>
            </Box>
            <Box
              background="iceBlue.500"
              borderBottomRadius="3xl"
              pt={3.5}
              px={5}
              justifyContent="center"
              pb={9}
            >
              <Box pb="5">
                <MyPrescriptionsFilters />
              </Box>
              <MyPrescriptions />
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
