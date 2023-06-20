import React from "react";
import { useNavigation } from "@sehatq/utils";

import {
  Box,
  Skeleton,
  HStack,
  VStack,
  useImage,
  Link,
  LinkOverlay,
  Text,
  Divider,
  LinkBox,
} from "../../user-interfaces";

export interface MedicalProcedureCategory {
  name: string;
  slug: string;
}
export interface MedicalProcedureAuthor {
  name: string;
  slug: string;
}

export type MedicalProcedureBannerDesktopProps = {
  id: number;
  slug: string;
  category: MedicalProcedureCategory;
  title: string;
  imageUrl: string;
  imageAlt: string;
  author: MedicalProcedureAuthor;
  date: string;
};

export function MedicalProcedureBannerDesktop(
  props: MedicalProcedureBannerDesktopProps
) {
  const { slug, category, title, imageUrl, imageAlt, author, date } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox position="relative" h="410px">
      <Box>
        <Image
          priority
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "xl",
            position: "absolute",
          }}
        />
        <Box
          backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
          position="absolute"
          w="100%"
          h="100%"
          top={0}
          borderRadius="xl"
          opacity="2"
        />
      </Box>
      <Box px={6} pb={4} position="absolute" bottom={2} cursor="default">
        <Text
          fontSize="sm"
          lineHeight="5"
          fontWeight="semibold"
          color="main.500"
          height="30px"
        >
          {category.name}
        </Text>
        <VStack spacing={3} align="flex-start" cursor="default">
          <Navigate name="MEDICAL_PROCEDURE" query={{ slug }}>
            <LinkOverlay
              fontSize="7xl"
              lineHeight="16"
              color="white"
              fontFamily="poppins"
              fontWeight="semibold"
              width="100%"
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <HStack cursor="default">
            <Text fontSize="sm" color="brownGrey.500">
              {date}
            </Text>
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Navigate
              name="AUTHOR"
              query={{
                slug: author.slug,
              }}
            >
              <Link
                fontSize="sm"
                color="brownGrey.500"
                variant="unstyled"
                fontWeight="normal"
                _hover={{
                  color: "sea.500",
                }}
              >
                {author.name}
              </Link>
            </Navigate>
          </HStack>
        </VStack>
      </Box>
    </LinkBox>
  );
}

export function MedicalProcedureBannerSkeletonDesktop() {
  return (
    <Box position="relative" h="410px">
      <Box backgroundColor="gray.500" height="100%" borderRadius="xl" />
      <Box px={6} pb={4} position="absolute" bottom={2}>
        <Skeleton width="83px" height="18px" mb={3} />
        <VStack spacing={6} align="flex-start">
          <VStack align="flex-start" spacing={1.5}>
            <Skeleton width="710px" height="26px" />
            <Skeleton width="350px" height="26px" />
          </VStack>
          <HStack>
            <Skeleton width="100px" height="19px" />
            <Divider
              borderColor="brownGrey.500"
              border="solid 0.5px"
              orientation="vertical"
              height="12px"
            />
            <Skeleton width="104px" height="19px" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
