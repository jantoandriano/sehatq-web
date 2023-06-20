import React from "react";
import {
  Box,
  Center,
  Flex,
  Skeleton,
  StarRating,
  Text,
  RatingInput,
  RatingInputValue,
} from "../../user-interfaces";
export type ArticleRatingInputDesktopProps = {
  average: number;
  totalReview: number;
  rating: RatingInputValue;
  onSubmitRating: (value: RatingInputValue) => void;
  submited: boolean;
};

export function ArticleRatingInputDesktop(
  props: ArticleRatingInputDesktopProps
) {
  const { average, totalReview, rating, onSubmitRating, submited } = props;
  return (
    <Flex
      borderRadius="xl"
      boxShadow="base"
      backgroundColor="white"
      height={190}
      direction="row"
      align="center"
      justify="center"
      textAlign="center"
    >
      {submited ? (
        <Box p={8}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            lineHeight="5"
            color="charcoalGrey"
          >
            Terima kasih atas saran dan masukannya!
          </Text>
          <Center fontSize="xs" lineHeight="6" pt={2} pb={2}>
            <Text color="sea.500" pr={2}>
              Avg. {average}
            </Text>{" "}
            <Text color="charcoalGrey">({totalReview})</Text>
          </Center>
          <Center>
            <StarRating
              iconWidth={30}
              iconHeight={31}
              rating={Number(rating)}
            />
          </Center>
        </Box>
      ) : (
        <Box p={8}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            lineHeight="5"
            color="charcoalGrey"
          >
            Terima kasih sudah membaca.
          </Text>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            lineHeight="5"
            color="charcoalGrey"
            marginBottom={1}
          >
            Seberapa bermanfaat informasi ini bagi Anda?
          </Text>
          <Text
            fontSize="xs"
            lineHeight="6"
            color="charcoalGrey"
            marginBottom={2}
          >
            (1 Tidak bermanfaat / 5 Sangat bermanfaat)
          </Text>
          <RatingInput
            setRating={(value) => onSubmitRating(value)}
            rating={rating}
          />
        </Box>
      )}
    </Flex>
  );
}

export function ArticleRatingInputDesktopSkeleton() {
  return (
    <Flex
      borderRadius="xl"
      boxShadow="base"
      backgroundColor="white"
      height={134}
      direction="row"
      align="center"
      justify="center"
    >
      <Box p={8}>
        <Center fontSize="sm">
          <Skeleton height={2} width={300} />
        </Center>
        <Center fontSize="sm" pt={2} pb={4}>
          <Skeleton height={2} width={200} />
        </Center>
        <Center fontSize="xs" pb={2}>
          <Skeleton height={2} width={200} />
        </Center>
        <Center>
          <StarRating rating={0} />
        </Center>
      </Box>
    </Flex>
  );
}
