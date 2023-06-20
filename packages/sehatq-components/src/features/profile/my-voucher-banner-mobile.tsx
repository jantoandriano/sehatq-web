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

export interface MyVoucherBannerMobileProps {
  textLabel: string;
  myVoucherNavigation: NavigationValue["name"];
}

export function MyVoucherBannerMobile(props: MyVoucherBannerMobileProps) {
  const { Navigate } = useNavigation();
  const { textLabel, myVoucherNavigation } = props;
  const ASSETS = useAssets(["ICON_VOUCHER"]);

  return (
    <LinkBox background="gray.500" borderRadius={10}>
      <Flex ml={4} mr={3} align="center">
        <HStack flex="1" spacing={3} align="center">
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
        <ChevronRightIcon color="veryLightPink" />
      </Flex>
    </LinkBox>
  );
}
