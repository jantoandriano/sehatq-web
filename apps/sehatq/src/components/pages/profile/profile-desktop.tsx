import React from "react";
import {
  Flex,
  Text,
  Box,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
  ProfileCard,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export function ProfileDesktop() {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Flex bgColor="white" align="center" justify="space-between">
            <Box marginBottom={5}>
              <Text fontSize="5xl" fontWeight="semibold" fontFamily="poppins">
                Profil Kamu
              </Text>
              <Text fontSize="md">
                Profil lengkap, akses fitur semakin cepat!
              </Text>
            </Box>
          </Flex>
          <ProfileCard />
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
