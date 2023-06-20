import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  HStack,
  VStack,
  Divider,
  StackDivider,
  StarRating,
  Skeleton,
  useImage,
} from "../../user-interfaces";
import { MedicalProcedureBanner } from "../medical-procedure";

export interface MedicalProceduresSectionMobileProps {
  medicalProcedures: Array<MedicalProcedureItemProps>;
  featured: MedicalProcedureItemProps | null;
  tagSlug: string;
}

export interface MedicalProcedureCategory {
  name: string;
  slug: string;
}
export interface MedicalProcedureAuthor {
  name: string;
  slug: string;
}

export type MedicalProcedureRating = {
  average: number;
  totalReview: number;
};

export interface MedicalProcedureItemProps {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  category: MedicalProcedureCategory;
  author: MedicalProcedureAuthor;
  date: string;
  rating?: MedicalProcedureRating;
}

const MedicalProcedureItem = (props: MedicalProcedureItemProps) => {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { imageUrl, imageAlt, title, slug, category, author, date, rating } =
    props;
  return (
    <LinkBox width="100%">
      <HStack align="start">
        <VStack spacing="1" align="flex-start" width="full">
          <Text
            color="sea.500"
            fontSize="xxs"
            lineHeight="normal"
            fontWeight="semibold"
          >
            {category.name}
          </Text>
          <Navigate
            name="MEDICAL_PROCEDURE"
            query={{
              slug: slug,
            }}
          >
            <LinkOverlay
              noOfLines={3}
              fontSize="sm"
              lineHeight="base"
              fontWeight="semibold"
              fontFamily="poppins"
              pr={2}
            >
              {title}
            </LinkOverlay>
          </Navigate>
          {rating && (
            <HStack spacing={1} fontSize="xxs">
              <StarRating
                fontSize="xxs"
                rating={rating?.average ?? 0}
                useSingleStar
                iconWidth="10px"
                iconHeight="10px"
              />
              {rating?.totalReview && (
                <Text color="brownGrey.500">({rating.totalReview})</Text>
              )}
            </HStack>
          )}
          <Text fontSize="xxs" color="brownGrey.500">
            {date}
            {author && author.name && (
              <Navigate
                name="AUTHOR"
                query={{
                  slug: author.slug,
                }}
              >
                <Link
                  marginLeft={1}
                  fontSize="xxs"
                  color="brownGrey.500"
                  _hover={{
                    color: "sea.500",
                  }}
                >
                  | {author.name}
                </Link>
              </Navigate>
            )}
          </Text>
        </VStack>
        {imageUrl && (
          <Box>
            <Image
              src={imageUrl}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                cursor: "pointer",
                boxSize: "90px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
          </Box>
        )}
      </HStack>
    </LinkBox>
  );
};

export function MedicalProceduresSectionMobile({
  medicalProcedures,
  featured,
  tagSlug,
}: MedicalProceduresSectionMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <Box background="white">
      {featured && <MedicalProcedureBanner {...featured} isMobile />}
      <VStack p={4} spacing={4} align="flex-start">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          fontFamily="poppins"
          textTransform="capitalize"
        >
          Tindakan Medis Seputar {tagSlug.split("-").join(" ")}
        </Text>
        <VStack
          spacing={4}
          width="100%"
          align="flex-start"
          divider={<StackDivider borderColor="veryLightPink" />}
        >
          {medicalProcedures.length &&
            medicalProcedures.map((medicalProcedure) => (
              <MedicalProcedureItem
                key={medicalProcedure.id}
                {...medicalProcedure}
              />
            ))}
        </VStack>
        <Divider borderColor="veryLightPink" />
        <Navigate name="MEDICAL_PROCEDURES">
          <Link
            textAlign="center"
            fontSize="sm"
            color="sea.500"
            fontWeight="semibold"
            width="100%"
            height="20px"
            variant="unstyled"
          >
            Lihat Semua
          </Link>
        </Navigate>
      </VStack>
    </Box>
  );
}

export function MedicalProcedureSectionMobileSkeleton() {
  const Image = useImage();
  return (
    <VStack p={4} background="white" spacing={4} align="flex-start">
      <Skeleton width="250px" height="23px" />
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {Array.from(Array(3).keys()).map((id) => (
          <HStack key={id} spacing={2.5}>
            <VStack spacing={0.5} align="flex-start">
              <Skeleton width="131px" height="14px" />
              <Skeleton width="120px" height="16px" />
              <Skeleton width="140px" height="13px" />
              <Skeleton width="200px" height="14px" />
            </VStack>
            <Image
              src="https://www.sehatq.com/public/assets/img/no-image.jpg"
              alt="no image"
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "60px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
          </HStack>
        ))}
      </VStack>
      <Divider borderColor="veryLightPink" />
      <Text
        textAlign="center"
        fontSize="sm"
        color="sea.500"
        fontWeight="semibold"
        width="100%"
        height="20px"
        variant="unstyled"
      >
        Lihat Semua
      </Text>
    </VStack>
  );
}
