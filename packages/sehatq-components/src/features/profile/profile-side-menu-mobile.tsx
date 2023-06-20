import React from "react";
import { VStack, StackDivider } from "../../user-interfaces";

export function ProfileSideMenuMobile() {
  return (
    <VStack
      divider={<StackDivider borderColor="veryLightPink" />}
      background="white"
      borderRadius="xl"
      boxShadow="sea-base"
      spacing={4}
      p={4}
    >
      Profile Side Menu
    </VStack>
  );
}
