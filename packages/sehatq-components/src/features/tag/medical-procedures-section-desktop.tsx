import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Divider } from "@chakra-ui/react";

import {
  Box,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  HStack,
  VStack,
  StackDivider,
  Skeleton,
  useImage,
} from "../../user-interfaces";

export interface MedicalProceduresSectionDesktopProps {
  medicalProcedures: Array<MedicalProcedureItemProps>;
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
  imageUrl: string;
  imageAlt: string;
  title: string;
  category: MedicalProcedureCategory;
  author: MedicalProcedureAuthor;
  date: string;
  rating?: MedicalProcedureRating;
}

const MedicalProcedureItem = (props: MedicalProcedureItemProps) => {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { imageUrl, imageAlt, title, slug, category, author, date } = props;
  return (
    <LinkBox>
      <HStack spacing={2.5} align="flex-start">
        <Box>
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              boxSize: "60px",
              position: "relative",
              borderRadius: "base",
              overflow: "hidden",
            }}
          />
        </Box>
        <VStack spacing={0.5} align="flex-start">
          <Text
            color="sea.500"
            fontSize="xs"
            lineHeight="5"
            fontWeight="semibold"
          >
            {category.name}
          </Text>
          <Navigate name="MEDICAL_PROCEDURE" query={{ slug }}>
            <LinkOverlay fontWeight="semibold" fontSize="sm" noOfLines={1}>
              {title}
            </LinkOverlay>
          </Navigate>
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
      </HStack>
    </LinkBox>
  );
};

export function MedicalProceduresSectionDesktop({
  medicalProcedures,
  tagSlug,
}: MedicalProceduresSectionDesktopProps) {
  const { Navigate } = useNavigation();
  return (
    <VStack
      px={5}
      pt={5}
      pb={2}
      boxShadow="base"
      borderRadius="xl"
      background="white"
      spacing={4}
      align="flex-start"
      minW="352px"
      maxH="440px"
      height="fit-content"
    >
      <Text
        fontSize="xl"
        fontWeight="semibold"
        fontFamily="poppins"
        textTransform="capitalize"
      >
        Tindakan Medis {tagSlug.split("-").join(" ")}
      </Text>
      <Divider borderColor="veryLightPink" />
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
      <Navigate name="MEDICAL_PROCEDURES">
        <Link
          textAlign="center"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          width="100%"
          variant="unstyled"
        >
          Lihat Semua
        </Link>
      </Navigate>
    </VStack>
  );
}

export function MedicalProcedureSectionDesktopSkeleton() {
  const Image = useImage();
  return (
    <VStack
      px={5}
      pt={5}
      pb={3}
      boxShadow="base"
      borderRadius="xl"
      background="white"
      spacing={4}
      align="flex-start"
    >
      <Skeleton width="312px" height="28px" />
      <Divider borderColor="veryLightPink" />
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {Array.from(Array(3).keys()).map((id) => (
          <HStack key={id} spacing={2.5}>
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
            <VStack spacing={0.5} align="flex-start">
              <Skeleton width="100px" height="19px" />
              <Skeleton width="120px" height="19px" />
              <Skeleton width="190px" height="13px" />
            </VStack>
          </HStack>
        ))}
      </VStack>
      <Text
        textAlign="center"
        fontSize="sm"
        color="sea.500"
        fontWeight="semibold"
        width="100%"
        variant="unstyled"
      >
        Lihat Semua
      </Text>
    </VStack>
  );
}
