import { HStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  Button,
} from "../../user-interfaces";

export type PediatricClinicInfoDesktopProps = {
  tabs: {
    id: number;
    label: string;
    title: string;
    subTitle: string;
    image: string;
  }[];
  stateTab: number;
  setStateTab: Dispatch<SetStateAction<number>>;
};

export function PediatricClinicInfoDesktop(
  props: PediatricClinicInfoDesktopProps
) {
  const { tabs, stateTab, setStateTab } = props;
  const Image = useImage();

  return (
    <Flex justifyContent="space-between" w="full">
      <Box maxW="570px">
        {tabs.map((tab) => (
          <Button
            {...(tab.id === stateTab
              ? { color: "white" }
              : { variant: "ghost", color: "charcoalGrey" })}
            onClick={() => setStateTab(tab.id)}
            key={tab.id}
            h="52px"
            w="96px"
            fontFamily="poppins"
            fontSize="sm"
            borderRadius="12px"
            fontWeight="semibold"
            mb="40px"
            mr={2}
          >
            {tab.label}
          </Button>
        ))}
        {tabs.map((tab) => {
          if (tab.id === stateTab) {
            return (
              <React.Fragment key={tab.id}>
                <Text
                  fontSize="32px"
                  fontFamily="poppins"
                  color="charcoalGrey"
                  fontWeight="bold"
                  mb="24px"
                >
                  {tab.title}
                </Text>
                <Text>{tab.subTitle}</Text>
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </Box>
      {tabs.map((tab) => {
        if (tab.id === stateTab) {
          return (
            <Image
              key={tab.id}
              priority
              src={tab.image}
              alt="Klinik Online Spesialis Anak"
              height={350}
              width={294}
              layout="fixed"
            />
          );
        } else {
          return null;
        }
      })}
    </Flex>
  );
}

export function PediatricClinicInfoSkeletonDesktop() {
  return (
    <Box position="relative" h="350px">
      <Skeleton backgroundColor="gray.500" h="350px" />
      <Box px={10} pb={4} position="absolute" top={5} left={0} right={0}>
        <Flex justifyContent="space-between">
          <Box>
            <HStack mb={10}>
              <Skeleton width="96px" height="52px" borderRadius="12px" />
              <Skeleton width="96px" height="52px" borderRadius="12px" />
              <Skeleton width="96px" height="52px" borderRadius="12px" />
              <Skeleton width="96px" height="52px" borderRadius="12px" />
            </HStack>
            <SkeletonText w="570px" />
          </Box>
          <Skeleton width="294px" height="300px" borderRadius="12px" />
        </Flex>
      </Box>
    </Box>
  );
}
