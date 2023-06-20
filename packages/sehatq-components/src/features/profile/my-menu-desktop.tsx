import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  Image,
  Flex,
  Text,
  LinkBox,
  LinkOverlay,
  ChevronRightIcon,
  VStack,
  StackDivider,
} from "../../user-interfaces";

export interface MyMenuDesktopProps {
  menus: Array<MyMenuItemProps>;
}
export interface MyMenuItemProps {
  id: number;
  userId: number;
  iconSrc: string;
  title: string;
  desc: string;
  navigationName: NavigationValue["name"];
}

const MenuItem = (props: MyMenuItemProps) => {
  const { Navigate } = useNavigation();
  const { iconSrc, title, navigationName, userId } = props;
  return (
    <LinkBox w="100%">
      <Flex align="center">
        <Box alignSelf="flex-start" mr={3} ml={1}>
          <Image width="36px" src={iconSrc} alt={title} />
        </Box>
        <Text
          color="charcoalGrey"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="sm"
          flex="1"
        >
          {title}
        </Text>
        <Navigate
          name={navigationName}
          {...(title !== "Riwayat Resep" && {
            query: { userId },
          })}
        >
          <LinkOverlay ml={4}>
            <ChevronRightIcon color="veryLightPink" boxSize={6} />
          </LinkOverlay>
        </Navigate>
      </Flex>
    </LinkBox>
  );
};

export function MyMenuDesktop(props: MyMenuDesktopProps) {
  const { menus } = props;
  return (
    <VStack
      divider={<StackDivider borderColor="veryLightPink" />}
      background="white"
      w="100%"
    >
      {menus.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </VStack>
  );
}
