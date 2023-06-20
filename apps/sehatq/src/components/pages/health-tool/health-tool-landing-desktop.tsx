import React from "react";
import {
  GridBlock,
  GridBlockItem,
  ProfileSideMenu,
  HealthToolRecordList,
  Text,
  Box,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

interface Props {
  userId: string;
}

export function HealthToolLandingDesktop({ userId }: Props) {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Text fontFamily="Poppins" fontWeight="semibold" fontSize="5xl">
            Health Record
          </Text>
          <Box mt={6}>
            <HealthToolRecordList isMobile={false} userId={userId} />
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
