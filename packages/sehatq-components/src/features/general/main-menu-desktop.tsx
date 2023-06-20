import React from "react";
import { useNavigation } from "@sehatq/utils";
import { SEHATQ_MENUS } from "@sehatq/constants";

import {
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  useImage,
} from "../../user-interfaces";

export function MainMenuDesktop() {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={3} align="flex-start">
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
        Populer Fitur
      </Text>
      <SimpleGrid columns={4} spacing={2.5}>
        {Object.values(SEHATQ_MENUS).map((menu) => (
          <LinkBox
            key={menu.navigationName}
            display="flex"
            flexDirection="column"
            alignItems="center"
            minWidth="80px"
            minHeight="65px"
          >
            <Image
              alt={menu.title}
              src={menu.iconSrc}
              width={30}
              height={30}
              layout="fixed"
            />
            <Navigate name={menu.navigationName}>
              <LinkOverlay
                fontSize="xs"
                textAlign="center"
                color="brownGrey.500"
              >
                {menu.title}
              </LinkOverlay>
            </Navigate>
          </LinkBox>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
