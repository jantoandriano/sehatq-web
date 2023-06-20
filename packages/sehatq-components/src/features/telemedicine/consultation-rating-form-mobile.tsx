import React from "react";

import {
  Button,
  Text,
  Box,
  HStack,
  Flex,
  RatingInput,
  Wrap,
  FormControl,
  Textarea,
  RatingInputValue,
  FormErrorMessage,
  SkeletonCircle,
  Skeleton,
} from "../../user-interfaces";
import { CONSULTATION_RATING_TAGS_OPTIONS } from "./consultation-rating-form-constant";

export type ConsultationRatingFormMobileProps = {
  consultationId: string;
  selectedDoctorRating: RatingInputValue;
  onSubmitDoctorReview: (e: React.FormEvent) => void;
  selectedDoctorReviewTags?: Record<string, boolean>;
  doctorReview?: string;
  isLoadingSubmit: boolean;
  errors?: Record<string, string | undefined>;
  isDisableSubmit: boolean;
  onChangeInput: (name: string, value: string) => void;
  doctor?: {
    id: number;
    slug: string;
    name: string;
    photoUrl: string;
    experience: string;
    specialityName: string;
    str: string;
    sip: string;
  };
  doctorImage: React.ReactElement;
};

export function ConsultationRatingFormMobile(
  props: ConsultationRatingFormMobileProps
) {
  const {
    consultationId,
    selectedDoctorRating,
    onSubmitDoctorReview,
    selectedDoctorReviewTags,
    doctorReview,
    isLoadingSubmit,
    errors,
    isDisableSubmit,
    onChangeInput,
    doctor,
    doctorImage,
  } = props;

  return (
    <Flex
      flex="1"
      width="100%"
      height="100%"
      align="center"
      justify="space-between"
      direction="column"
      as="form"
      onSubmit={onSubmitDoctorReview}
    >
      <Box textAlign="center">
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="md" mb={2}>
          Penilaian Konsultasi
        </Text>
        <Text fontWeight="semibold" fontSize="xxs">
          {consultationId}
        </Text>
        <Text fontSize="8px" color="veryLightPink" mb={3}>
          Nomor Tiket
        </Text>
        {doctor ? (
          <>
            {doctorImage}
            <Text fontSize="sm" fontFamily="poppins" mt={4} mb={2}>
              {doctor.name}
            </Text>
            <HStack width="full" spacing={4} mb={4} justify="center">
              <Text fontSize="xs">{doctor.experience}</Text>
              <Text fontSize="xs">{doctor.specialityName}</Text>
              <Text fontSize="xs">
                {doctor.str !== "" ? doctor.str : doctor.sip}
              </Text>
            </HStack>
          </>
        ) : (
          <Flex direction="column" align="center" justify="center" mb={4}>
            <SkeletonCircle width="90px" height="90px" />
            <Skeleton
              width="160px"
              height="16px"
              marginTop={5}
              marginBottom={3}
            />
            <HStack width="full" spacing={4} justify="center">
              <Skeleton width="45px" height="14px" />
              <Skeleton width="85px" height="14px" />
              <Skeleton width="75px" height="14px" />
            </HStack>
          </Flex>
        )}
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins" mb={2}>
          Bagaimana pengalaman Anda?
        </Text>
        <RatingInput
          setRating={(value) => onChangeInput("rating", value)}
          rating={selectedDoctorRating}
        />
        <Wrap
          pt={4}
          pb={6}
          spacing="3"
          shouldWrapChildren
          overflow="hidden"
          align="center"
          justify="center"
          width="full"
        >
          {selectedDoctorReviewTags &&
            CONSULTATION_RATING_TAGS_OPTIONS[selectedDoctorRating].tags.map(
              (tag: string) => {
                return (
                  <Button
                    key={tag}
                    fontSize="xs"
                    fontWeight="semibold"
                    variant="chip"
                    borderColor="main.500"
                    color="sea.500"
                    borderRadius="lg"
                    height="32px"
                    bg="white"
                    {...(Object.keys(selectedDoctorReviewTags).includes(
                      tag
                    ) && {
                      color: "white",
                      bg: "main.500",
                    })}
                    onClick={() => onChangeInput("tags", tag)}
                  >
                    {tag}
                  </Button>
                );
              }
            )}
        </Wrap>
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm" mb={2}>
          Beri ulasan mengenai dokter Anda
        </Text>
        <FormControl isInvalid={errors?.review ? true : false}>
          <Textarea
            value={doctorReview}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput("review", e.target.value);
            }}
            borderColor="veryLightPink"
            h="101px"
            width="100%"
            borderRadius="lg"
            _placeholder={{ color: "brownGrey.500" }}
            _hover={{ borderColor: "main.500" }}
            _focus={{ borderColor: "main.500" }}
            resize="none"
            fontSize="sm"
            autoFocus={false}
            placeholder="Dokter dapat menjelaskan dan memberi solusi beserta resep dan tindakan yang perlu saya ambil berikutnya"
          />
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.review}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Button
        w="100%"
        type="submit"
        isLoading={isLoadingSubmit}
        disabled={isDisableSubmit || isLoadingSubmit}
        mt={6}
        boxShadow="base"
      >
        Selesai
      </Button>
    </Flex>
  );
}
