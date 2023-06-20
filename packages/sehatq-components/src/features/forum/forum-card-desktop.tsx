import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Divider,
  CheckCircleIcon,
  Link,
  StarRating,
  IconButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  LinkBox,
  LinkOverlay,
  ForumEyeIcon,
  ForumCommentIcon,
} from "../../user-interfaces";

export type ForumCardDesktopProps = {
  id: number;
  question: string;
  date: string;
  title: string;
  slug: string;
  user: {
    id: number;
    email: string;
    nameInitial?: string;
    gender?: string;
    genderName?: string;
    genderNameBg: string;
    age?: number;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
  answeredBy: string;
  doctorAuthorSlug?: string;
  rating?: {
    average: number;
    totalReview: number;
  };
  viewsCount: number;
  commentsCount: number;
};

export function ForumCardDesktop(props: ForumCardDesktopProps) {
  const {
    question,
    date,
    title,
    slug,
    user,
    category,
    answeredBy,
    doctorAuthorSlug,
    rating,
    viewsCount,
    commentsCount,
  } = props;
  const { Navigate } = useNavigation();

  const authorLink = doctorAuthorSlug ? (
    <Navigate
      name="AUTHOR"
      query={{
        slug: doctorAuthorSlug,
      }}
    >
      <Link
        color="sea.500"
        variant="link"
        fontSize="sm"
        fontWeight="semibold"
        _hover={{ textDecoration: "none" }}
      >
        {answeredBy}
      </Link>
    </Navigate>
  ) : (
    <Text fontSize="sm" as="span" color="sea.500" fontWeight="semibold">
      {answeredBy}
    </Text>
  );

  return (
    <LinkBox>
      <Box
        borderRadius="xl"
        border="1px solid"
        borderColor="veryLightPink"
        width="full"
        background="white"
      >
        <VStack spacing={2} align="flex-start" px={5} pt={5} pb={8}>
          <HStack justify="space-between" width="full">
            <Text fontSize="sm" color="sea.500" fontWeight="semibold">
              {category.name}
            </Text>
            <Text fontSize="xs" color="brownGrey.500">
              {date}
            </Text>
          </HStack>
          <Navigate
            name="FORUM"
            query={{
              slugs: [slug],
            }}
          >
            <LinkOverlay
              fontFamily="poppins"
              fontSize="3xl"
              fontWeight="semibold"
              width="full"
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <HStack
            spacing={3}
            width="full"
            background="iceBlue.500"
            borderRadius="xl"
            p={2}
          >
            <Flex
              background={user.genderNameBg}
              w={8}
              h={8}
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="xs" color="white" fontWeight="semibold">
                {user.nameInitial}
              </Text>
            </Flex>
            <Text fontSize="sm" color="charcoalGrey">
              Info Penanya: {user.nameInitial}
              {user.gender ? `, ${user.genderName}` : null}
              {user.age ? `, ${user.age} Tahun` : null}
            </Text>
          </HStack>
          <VStack spacing={3} align="flex-start" width="full">
            <Text lineHeight="tall" fontSize="md" color="charcoalGrey">
              {question}
            </Text>
            <HStack spacing={3.5} align="flex-start">
              {answeredBy && (
                <>
                  <CheckCircleIcon boxSize="16px" color="main.500" mt={1} />
                  <Box>
                    <Text fontSize="sm" color="charcoalGrey" mb={2.5}>
                      Dijawab oleh {authorLink}
                    </Text>
                    {rating && (
                      <StarRating
                        rating={rating ? rating.average : 0}
                        ratingTotal={rating ? rating.totalReview : 0}
                        iconWidth="10px"
                        iconHeight="10px"
                      />
                    )}
                  </Box>
                </>
              )}
            </HStack>
            <Divider border="solid 0.5px" borderColor="veryLightPink" />
            <HStack spacing={12}>
              <HStack spacing={1}>
                <IconButton
                  aria-label="views"
                  variant="fit"
                  marginRight={1.5}
                  icon={<ForumEyeIcon boxSize="24px" />}
                />
                <Text fontSize="xs" color="brownGrey.500" lineHeight="6">
                  Dilihat {viewsCount}
                </Text>
              </HStack>
              <HStack spacing={1}>
                <IconButton
                  aria-label="views"
                  variant="fit"
                  marginRight={1.5}
                  icon={<ForumCommentIcon boxSize="24px" />}
                />
                <Text
                  fontSize="xs"
                  color="brownGrey.500"
                  lineHeight="6"
                  ml={1.5}
                >
                  {commentsCount} Komentar
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </LinkBox>
  );
}

export function ForumCardDesktopSkeleton() {
  return (
    <Box
      borderRadius="xl"
      border="1px solid"
      borderColor="veryLightPink"
      width="full"
      background="white"
    >
      <VStack spacing={2} align="flex-start" p={5}>
        <HStack justify="space-between" width="full">
          <Skeleton width="100px" height="16px" />
          <Skeleton width="100px" height="25px" />
        </HStack>
        <Skeleton width="full" height="25px" />
        <Skeleton width="380px" height="25px" />
        <HStack
          spacing={3}
          width="full"
          background="iceBlue.500"
          borderRadius="xl"
          p={2}
        >
          <SkeletonCircle width={8} height={8} />
          <Skeleton width="300px" height="22px" />
        </HStack>
        <VStack spacing={3} align="flex-start" width="full">
          <SkeletonText
            noOfLines={4}
            spacing="2"
            skeletonHeight="5"
            width="full"
          />
          <HStack spacing={3.5} align="flex-start">
            <SkeletonCircle width={5} height={5} />
            <Skeleton width="209px" height="19px" />
          </HStack>
          <Divider border="solid 0.5px" borderColor="veryLightPink" />
          <HStack spacing={12}>
            <HStack spacing={1}>
              <SkeletonCircle width={6} height={4} marginRight={1.5} />
              <Skeleton width="70px" height="14px" />
            </HStack>
            <HStack spacing={1}>
              <SkeletonCircle width={6} height={4} marginRight={1.5} />
              <Skeleton width="70px" height="14px" />
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
