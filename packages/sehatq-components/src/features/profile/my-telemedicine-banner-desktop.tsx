import React from "react";
import { NavigationValue, useNavigation } from "@sehatq/utils";
import {
  Avatar,
  VStack,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  TelemedicineIcon,
  ChevronRightIcon,
  Flex,
  Badge,
} from "../../user-interfaces";

export interface MyTelemedicineBannerDesktopProps {
  isMobile: boolean;
  id?: number;
  statusLabel: string;
  doctorName: string;
  doctorImgSrc: string;
  doctorSpeciality: string;
  startDate: string;
  myTelemedicineNavigation: NavigationValue;
  isActive: boolean;
}

export function MyTelemedicineBannerDesktop(
  props: MyTelemedicineBannerDesktopProps
) {
  const {
    doctorName,
    doctorImgSrc,
    doctorSpeciality,
    startDate,
    statusLabel,
    myTelemedicineNavigation,
    isActive,
  } = props;
  const { Navigate } = useNavigation();
  const textColor = isActive ? "white" : "charcoalGrey";

  return (
    <Box
      background={isActive ? "sea.500" : "white"}
      borderRadius={10}
      boxShadow="base"
    >
      <Flex p="10px" align="center">
        <TelemedicineIcon />
        <Text
          color={textColor}
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="xs"
          flex="1"
          pl="6px"
        >
          Chat Dokter
        </Text>
        <Badge
          colorScheme={isActive ? "squash" : "sea"}
          textTransform="capitalize"
          variant="solid"
          px="7px"
          fontSize="8px"
        >
          {statusLabel}
        </Badge>
      </Flex>
      <Flex px="10px" pb="10px">
        <Avatar src={doctorImgSrc} name={doctorName} w="42px" h="42px" />
        <VStack align="flex-start" spacing={0} ml={2}>
          <Text
            fontSize="xs"
            color={textColor}
            fontFamily="poppins"
            fontWeight="semibold"
            noOfLines={2}
          >
            {doctorName}
          </Text>
          <Text color={textColor} fontSize="8px">
            {doctorSpeciality}
          </Text>
        </VStack>
      </Flex>
      <LinkBox
        background={isActive ? "sea650" : "gray.500"}
        borderRadius={10}
        px="10px"
        py={1}
      >
        <Navigate name={myTelemedicineNavigation.name}>
          <LinkOverlay>
            <Flex align="center">
              <VStack spacing={0} flex={1} align="flex-start">
                <Text fontSize="9px" color={textColor}>
                  Waktu
                </Text>
                <Text fontWeight="semibold" fontSize="xs" color={textColor}>
                  {startDate}
                </Text>
              </VStack>
              <ChevronRightIcon
                boxSize={5}
                color={isActive ? "main.500" : "charcoalGrey"}
              />
            </Flex>
          </LinkOverlay>
        </Navigate>
      </LinkBox>
    </Box>
  );
}
