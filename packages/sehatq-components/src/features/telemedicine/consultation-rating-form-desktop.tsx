import React from "react";

import {
  Button,
  Text,
  Box,
  RatingInput,
  Wrap,
  FormControl,
  Textarea,
  RatingInputValue,
  FormErrorMessage,
} from "../../user-interfaces";
import { CONSULTATION_RATING_TAGS_OPTIONS } from "./consultation-rating-form-constant";

export type ConsultationRatingFormDesktopProps = {
  consultationId: string;
  selectedDoctorRating: RatingInputValue;
  onSubmitDoctorReview: (e: React.FormEvent) => void;
  selectedDoctorReviewTags?: Record<string, boolean>;
  doctorReview?: string;
  isLoadingSubmit: boolean;
  errors?: Record<string, string | undefined>;
  isDisableSubmit: boolean;
  onChangeInput: (name: string, value: string) => void;
};

export function ConsultationRatingFormDesktop(
  props: ConsultationRatingFormDesktopProps
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
  } = props;

  return (
    <Box textAlign="center" width="400px">
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="xl" mb={4}>
        Penilaian Konsultasi
      </Text>
      <Text fontWeight="semibold" fontSize="sm">
        {consultationId}
      </Text>
      <Text fontSize="xxs" color="veryLightPink" mb={6}>
        Nomor Tiket
      </Text>
      <Text fontWeight="semibold" fontFamily="poppins" fontSize="md" mb={4}>
        Bagaimana pengalaman Anda?
      </Text>
      <RatingInput
        setRating={(value) => onChangeInput("rating", value)}
        rating={selectedDoctorRating}
      />
      <Wrap
        align="center"
        justify="center"
        spacing="3"
        shouldWrapChildren
        overflow="hidden"
        width="full"
        pt={6}
        pb={10}
        px={6}
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
                  {...(Object.keys(selectedDoctorReviewTags).includes(tag) && {
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
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="md" mb={2}>
        Beri ulasan mengenai dokter Anda
      </Text>
      <FormControl isInvalid={errors?.review ? true : false} width="400px">
        <Textarea
          name="ulasan"
          value={doctorReview}
          onChange={(e) => {
            e.preventDefault();
            onChangeInput("review", e.target.value);
          }}
          borderColor="veryLightPink"
          h="100px"
          w="400px"
          borderRadius="lg"
          _placeholder={{ color: "brownGrey.500" }}
          _hover={{ borderColor: "main.500" }}
          _focus={{ borderColor: "main.500" }}
          resize="none"
          fontSize="sm"
          autoFocus={false}
          placeholder="Dokter dapat menjelaskan dan memberi solusi beserta resep dan tindakan yang perlu saya ambil berikutnya"
        />
        <FormErrorMessage fontSize="xxs" fontStyle="italic" w="400px">
          {errors?.review}
        </FormErrorMessage>
      </FormControl>
      <Button
        disabled={isDisableSubmit || isLoadingSubmit}
        isLoading={isLoadingSubmit}
        w="400px"
        mt={8}
        boxShadow="base"
        onClick={onSubmitDoctorReview}
      >
        Selesai
      </Button>
    </Box>
  );
}
