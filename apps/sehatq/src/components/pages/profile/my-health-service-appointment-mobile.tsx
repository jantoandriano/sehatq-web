import React from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  ArrowBackIcon,
  MyHealthServiceAppointment,
} from "@sehatq/components";
import { useNavigation } from "@sehatq/utils";

export interface MyHealthServiceAppointmentMobileProps {
  id: string;
}

export function MyHealthServiceAppointmentMobile(
  props: MyHealthServiceAppointmentMobileProps
) {
  const { id } = props;
  const { goBack } = useNavigation();
  return (
    <>
      <Flex
        p={2}
        bgColor="white"
        align="center"
        alignSelf="flex-start"
        position="sticky"
        zIndex="sticky"
        top={0}
      >
        <IconButton
          aria-label="back button"
          onClick={goBack}
          variant="fit"
          colorScheme="sea"
          icon={<ArrowBackIcon w={7} h={7} color="sea.600" />}
        />
        <Text
          flex="1"
          marginLeft={3}
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="sm"
        >
          Detail Layanan Pemeriksaan
        </Text>
      </Flex>
      <Box
        background="iceBlue.500"
        minHeight="calc(100vh - 86px)"
        pt={5}
        px={4}
        pb={4}
      >
        <MyHealthServiceAppointment bookingId={id} isMobile={true} />
      </Box>
    </>
  );
}
