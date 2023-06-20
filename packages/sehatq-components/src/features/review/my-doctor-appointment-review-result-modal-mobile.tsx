import React from "react";
import {
  ModalHeader,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  ModalCloseButton,
  Text,
  HStack,
  Box,
  VStack,
  Button,
  StackDivider,
  SehatqStarIcon,
  Icon,
  Wrap,
  Image,
  DrawerProps,
} from "../../user-interfaces";

export type MyDoctorAppointmentReviewResultModalMobileProps = {
  modalProps: Omit<DrawerProps, "children" | "size">;
  doctorImgSrc: string;
  doctorName: string;
  doctorSpeciality: string;
  bookingRating: string;
  bookingReview: string;
  bookingReviewTags: string[];
  customerService?: {
    rating?: string;
    ratingIcon?: any;
    ratingColor?: string;
    tags: string[];
    review?: string;
  };
};
export function MyDoctorAppointmentReviewResultModalMobile(
  props: MyDoctorAppointmentReviewResultModalMobileProps
) {
  const {
    modalProps,
    doctorImgSrc,
    doctorName,
    doctorSpeciality,
    bookingRating,
    bookingReview,
    bookingReviewTags = [],
    customerService,
  } = props;
  return (
    <Drawer placement="bottom" {...modalProps} trapFocus={false}>
      <DrawerOverlay />
      <DrawerContent py="6" px="10" borderRadius="lg">
        <ModalHeader
          fontSize="sm"
          fontFamily="poppins"
          fontWeight="semibold"
          p="0"
          mb="0.5"
        >
          Review dan rating booking
        </ModalHeader>
        <ModalCloseButton h="16px" w="16px" top="6" color="veryLightPink" />
        <DrawerBody p="0">
          <VStack spacing="6">
            <Box w="100%">
              <HStack
                padding="4"
                bg="iceBlue.500"
                borderRadius="base"
                mt="4"
                w="100%"
              >
                <Image src={doctorImgSrc} boxSize="10%" alt="avatar" />
                <Box>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="sm"
                  >
                    {doctorName}
                  </Text>
                  <Text fontSize="xs">{doctorSpeciality}</Text>
                </Box>
              </HStack>
              <HStack
                justifyContent="space-between"
                w="100%"
                alignItems="center"
                mt="3.5"
              >
                <Text fontWeight="semibold" fontSize="sm" fontFamily="poppins">
                  Penilaian booking
                </Text>
                <HStack
                  border="1px"
                  borderRadius="2xl"
                  borderColor="veryLightPink"
                  px="2.5"
                  py="1"
                  align="center"
                >
                  <SehatqStarIcon color="#ffcc00" />
                  <Text fontWeight="semibold" fontSize="xs">
                    {bookingRating}
                  </Text>
                </HStack>
              </HStack>
              <Box
                borderLeft="7px solid"
                borderColor="veryLightPink"
                w="100%"
                p="2.5"
                mt="3"
                borderRadius="base"
                background="gray.400"
              >
                <Text fontSize="sm">{bookingReview}</Text>
              </Box>
              <Box w="100%" mt="3.5">
                <Wrap spacing="3" shouldWrapChildren overflow="hidden">
                  {bookingReviewTags.map((tag) => {
                    return (
                      <Button
                        key={tag}
                        fontSize="xxs"
                        fontWeight="semibold"
                        variant="chip"
                        borderColor="squash.500"
                        color="squash.500"
                        bg="squash.100"
                      >
                        {tag}
                      </Button>
                    );
                  })}
                </Wrap>
              </Box>
            </Box>
            {customerService ? (
              <>
                <StackDivider
                  borderColor="veryLightPink"
                  borderBottomWidth="4px"
                />
                <Box w="100%">
                  <HStack
                    justifyContent="space-between"
                    w="100%"
                    alignItems="center"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      fontFamily="poppins"
                    >
                      Customer Service
                    </Text>
                    <HStack
                      border="1px"
                      borderRadius="2xl"
                      borderColor="veryLightPink"
                      px="2.5"
                      py="1"
                      align="center"
                    >
                      <Icon
                        as={customerService.ratingIcon}
                        boxSize="24px"
                        color={customerService.ratingColor}
                      />
                      <Text
                        fontWeight="semibold"
                        fontSize="xs"
                        textTransform="capitalize"
                      >
                        {customerService.rating}
                      </Text>
                    </HStack>
                  </HStack>
                  <Box
                    borderLeft="5px solid"
                    borderColor="veryLightPink"
                    w="100%"
                    p="2.5"
                    mt="3"
                    borderRadius="base"
                    background="gray.400"
                  >
                    <Text fontSize="sm">{customerService.review}</Text>
                  </Box>
                  <Box w="100%" mt="3.5">
                    <Wrap spacing="3" shouldWrapChildren overflow="hidden">
                      {customerService.tags.map((tag) => {
                        return (
                          <Button
                            key={tag}
                            fontSize="xxs"
                            fontWeight="semibold"
                            variant="chip"
                            borderColor="squash.500"
                            color="squash.500"
                            bg="squash.100"
                          >
                            {tag}
                          </Button>
                        );
                      })}
                    </Wrap>
                  </Box>
                </Box>
              </>
            ) : null}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
