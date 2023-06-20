import React from "react";
import { useAssets, NavigationValue, useNavigation } from "@sehatq/utils";
import {
  HStack,
  Text,
  LinkBox,
  LinkOverlay,
  Image,
  ChevronRightIcon,
  Flex,
} from "../../user-interfaces";

export interface MyVoucherBannerDesktopProps {
  textLabel: string;
  myVoucherNavigation: NavigationValue["name"];
}

export function MyVoucherBannerDesktop(props: MyVoucherBannerDesktopProps) {
  const { Navigate } = useNavigation();
  const { textLabel, myVoucherNavigation } = props;
  const ASSETS = useAssets(["ICON_VOUCHER"]);

  return (
    <LinkBox background="gray.500" borderRadius={10} w="100%" py="2px">
      <Flex ml={3} mr={2} align="center">
        <HStack flex="1" spacing={2} align="center">
          <Image width={9} src={ASSETS.ICON_VOUCHER} alt="Voucher SehatQ" />
          <Navigate name={myVoucherNavigation}>
            <LinkOverlay>
              <Text
                color="paleBlue.800"
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="xs"
              >
                {textLabel}
              </Text>
            </LinkOverlay>
          </Navigate>
        </HStack>
        <ChevronRightIcon color="veryLightPink" boxSize={5} />
      </Flex>
    </LinkBox>
  );
}
