import {
  Box,
  FamilyMemberMenu,
  HStack,
  Link,
  MyTelemedicineHistoryList,
  Text,
  TelemedicineNavigation,
} from "@sehatq/components";
import React from "react";
import { useNavigation } from "@sehatq/utils";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { MyTelemedicineHistoryListHead } from "@components/head";

export type MyTelemedicineHistoryListPageMobileProps = {
  page: string;
  perPage: string;
  userId: string;
};

export function MyTelemedicineHistoryListPageMobile(
  props: MyTelemedicineHistoryListPageMobileProps
) {
  const { Navigate } = useNavigation();
  return (
    <>
      <MyTelemedicineHistoryListHead />
      <SehatQHeader
        variant="text"
        text="Konsultasi"
        rightElement={
          <FamilyMemberMenu
            isMobile
            activeFamily={props.userId}
            navigationValue={{
              name: "TELEMED_HISTORIES",
              options: { shallow: true, scroll: true },
            }}
          />
        }
      />
      <HStack
        width="full"
        justify="space-between"
        boxShadow="base"
        borderBottom="1px solid"
        borderColor="veryLightPink"
        top="56px"
        position="sticky"
        zIndex="docked"
        background="white"
      >
        <Navigate name="TELEMED_SCHEDULE">
          <Link
            width="full"
            textAlign="center"
            py={3}
            fontSize="sm"
            color="charcoalGrey"
          >
            Mendatang
          </Link>
        </Navigate>
        <Text
          width="full"
          borderBottom="3px solid"
          color="main.500"
          borderBottomColor="main.500"
          textAlign="center"
          py={3}
          fontWeight="semibold"
          fontSize="sm"
        >
          Selesai
        </Text>
      </HStack>
      <Box
        p={3}
        spacing={4}
        background="linear-gradient(to bottom, var(--sehatq-colors-iceBlue-500) 0%, rgba(240, 249, 250, 0) 100%)"
        minH="calc(100vh - 160px)"
      >
        <MyTelemedicineHistoryList {...props} isMobile />
      </Box>
      <Box position="sticky" bottom="0" zIndex="docked">
        <TelemedicineNavigation isMobile activeNavigation="consultation" />
      </Box>
    </>
  );
}
