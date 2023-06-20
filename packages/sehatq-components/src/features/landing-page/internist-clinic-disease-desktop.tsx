import React, { Dispatch, SetStateAction } from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Icon,
  Link,
  ArrowForwardIcon,
  HStack,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../../user-interfaces";

export type InternistClinicDiseaseDesktopProps = {
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

export function InternistClinicDiseaseDesktop(
  props: InternistClinicDiseaseDesktopProps
) {
  const { tabs, stateTab, setStateTab } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();

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

  const iconStyle = {
    w: "24px",
    h: "24px",
    ml: "14px",
    cursor: "pointer",
  };

  return (
    <HStack justifyContent="space-between" w="full">
      {tabs.map((tab) => {
        if (tab.id === stateTab) {
          return (
            <React.Fragment key={tab.id}>
              <Box maxW="570px">
                <Box flexDirection="column" h="full">
                  <Text
                    fontSize="xl"
                    color="sea.500"
                    fontFamily="poppins"
                    mb={3}
                  >
                    KENALI PENYAKIT
                  </Text>
                  <Text
                    fontSize="7xl"
                    fontFamily="poppins"
                    color="charcoalGrey"
                    fontWeight="bold"
                    mb={5}
                  >
                    {tab.title}
                  </Text>
                  <Text
                    maxW="475px"
                    fontFamily="openSans"
                    fontSize="sm"
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
                      mt={6}
                    >
                      Cari Tahu Selengkapnya{" "}
                      <Icon as={ArrowForwardIcon} w="20px" h="20px" ml="14px" />
                    </Link>
                  </Navigate>
                </Box>
              </Box>
              <Image
                priority
                src={tab.image}
                alt="Klinik Online Spesialis Anak"
                height={500}
                width={500}
                layout="fixed"
              />
            </React.Fragment>
          );
        }
      })}
      <Box>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
          gap={2}
        >
          <Icon
            {...renderColor(stateTab > 1)}
            {...iconStyle}
            as={ArrowUpIcon}
            onClick={() => stateTab > 1 && setStateTab(stateTab - 1)}
          />
          {tabs.map((tab) => (
            <Box
              {...renderColor(tab.id === stateTab)}
              onClick={() => setStateTab(tab.id)}
              key={tab.id}
              fontFamily="poppins"
              fontSize="3xl"
              fontWeight="semibold"
              cursor="pointer"
              py={4}
              userSelect="none"
            >
              {tab.label}
            </Box>
          ))}
          <Icon
            {...renderColor(stateTab < tabs.length)}
            {...iconStyle}
            as={ArrowDownIcon}
            onClick={() => stateTab < tabs.length && setStateTab(stateTab + 1)}
          />
        </Flex>
      </Box>
    </HStack>
  );
}
