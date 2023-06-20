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

export interface MyMenuMobileProps {
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
  const { iconSrc, title, desc, navigationName, userId } = props;
  return (
    <LinkBox marginBottom={1}>
      <Flex align="center">
        <Box alignSelf="flex-start" mr={3}>
          <Image width="40px" src={iconSrc} alt={title} />
        </Box>
        <VStack spacing={1} align="flex-start" flex="1" mt={1}>
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
          >
            {title}
          </Text>
          <Text color="charcoalGrey" fontSize="xs">
            {desc}
          </Text>
        </VStack>
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

export function MyMenuMobile(props: MyMenuMobileProps) {
  const { menus } = props;

  return (
    <VStack
      divider={<StackDivider borderColor="veryLightPink" />}
      background="white"
      borderRadius="xl"
      boxShadow="sea-base"
      spacing={3}
      p={4}
    >
      {menus.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </VStack>
  );
}
