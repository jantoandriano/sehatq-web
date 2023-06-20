import React, { Dispatch, SetStateAction } from "react";

import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Link,
  Icon,
  ArrowForwardIcon,
  HStack,
} from "../../user-interfaces";

export type InternistClinicDiseaseMobileProps = {
  tabs: {
    id: number;
    label: string;
    title: string;
    description: string;
    image: string;
    deaseNavigation: NavigationValue;
  }[];
  stateTab: number;
  setStateTab: Dispatch<SetStateAction<number>>;
};

function renderColor(isActive: boolean) {
  if (isActive) {
    return {
      color: "sea.500",
    };
  }
  return {
    color: "brownGrey.500",
  };
}

export function InternistClinicDiseaseMobile(
  props: InternistClinicDiseaseMobileProps
) {
  const { tabs, stateTab, setStateTab } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Box>
      <HStack spacing={8} overflowX="auto" mb="68px" px={4}>
        {tabs.map((tab) => (
          <Box
            {...renderColor(tab.id === stateTab)}
            onClick={() => setStateTab(tab.id)}
            key={tab.id}
            fontFamily="poppins"
            fontSize="xl"
            borderRadius="12px"
            fontWeight="semibold"
            cursor="pointer"
            py={4}
            userSelect="none"
          >
            {tab.label}
          </Box>
        ))}
      </HStack>
      {tabs.map((tab) => {
        if (tab.id === stateTab) {
          return (
            <Box key={tab.id} px={4}>
              <Flex justifyContent="center" mb="74px">
                <Image
                  priority
                  src={tab.image}
                  alt="Klinik Online Spesialis Penyakit Dalam"
                  height={212}
                  width={212}
                  layout="fixed"
                />
              </Flex>
              <Text fontSize="xl" color="sea.500" fontFamily="poppins" mb={3}>
                KENALI PENYAKIT
              </Text>
              <Text
                fontSize="7xl"
                fontFamily="poppins"
                color="charcoalGrey"
                fontWeight="bold"
                mb={4}
              >
                {tab.title}
              </Text>
              <Text
                fontSize="sm"
                fontFamily="openSans"
                lineHeight="11"
                color="#728797"
              >
                {tab.description}
              </Text>
              <Navigate {...tab.deaseNavigation}>
                <Link
                  variant="solid"
                  borderRadius="full"
                  bgColor="main.500"
                  fontSize="sm"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  mt={10}
                >
                  Cari Tahu Selengkapnya{" "}
                  <Icon as={ArrowForwardIcon} w="20px" h="20px" ml="14px" />
                </Link>
              </Navigate>
            </Box>
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
}
