import React from "react";
import {
  Flex,
  Text,
  Box,
  FamilyMemberMenu as _FamilyMemberMenu,
  ActivityLinks as _ActivityLinks,
  MyTelemedicines as _MyTelemedicines,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { MyTelemedicinesParams } from "@get-props";
import { withQuery } from "@utils";

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

export function MyTelemedicinesDesktop() {
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
            <FamilyMemberMenu />
          </Flex>
          <Box
            border="0.5px solid"
            borderColor="veryLightPink"
            borderRadius="xl"
            my={5}
          >
            <Box borderBottom="1px solid" borderColor="veryLightPink">
              <ActivityLinks isMobile={false} activeLink="MY_TELEMEDICINES" />
            </Box>
            <Box
              background="iceBlue.500"
              pt={3.5}
              px={5}
              justifyContent="center"
              pb={9}
            >
              <MyTelemedicines />
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
