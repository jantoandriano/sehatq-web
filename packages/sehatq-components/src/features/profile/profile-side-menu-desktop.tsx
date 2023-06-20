import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  VStack,
  Box,
  LinkBox,
  Flex,
  Text,
  LinkOverlay,
  ChevronRightIcon,
} from "../../user-interfaces";
import { BasicProfileCard } from "./basic-profile-card";
import { MyVoucherBanner } from "./my-voucher-banner";
import { MyMenu } from "./my-menu";

export function ProfileSideMenuDesktop() {
  const { Navigate } = useNavigation();
  return (
    <VStack
      background="white"
      borderRadius="20px"
      overflow="hidden"
      boxShadow="base"
      pt={5}
      w="100%"
    >
      <VStack spacing={4} px={4} w="100%">
        <BasicProfileCard isMobile={false} />
        <MyVoucherBanner
          textLabel="Cek Voucher Yang Kamu Miliki"
          isMobile={false}
        />
        <MyMenu isMobile={false} />
      </VStack>
      <Box h="2px" w="100%" my={2} background="veryLightPink" />
      <Box px={4} w="100%" pb={2}>
        <LinkBox>
          <Flex align="center" h="36px">
            <Text
              color="charcoalGrey"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              flex="1"
              ml={1}
            >
              More
            </Text>
            <Navigate name="PROFILE_MORE">
              <LinkOverlay ml={4}>
                <ChevronRightIcon color="veryLightPink" boxSize={6} />
              </LinkOverlay>
            </Navigate>
          </Flex>
        </LinkBox>
      </Box>
    </VStack>
  );
}
