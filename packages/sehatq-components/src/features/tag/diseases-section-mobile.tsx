import React from "react";
import { useNavigation } from "@sehatq/utils";

import {
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  HStack,
  VStack,
  Flex,
  Skeleton,
  Box,
  useImage,
} from "../../user-interfaces";

export interface DiseasesSectionMobileProps {
  diseases: Array<DiseaseItemProps>;
  tagSlug: string;
}

export interface DiseaseItemProps {
  id: number;
  slug: string;
  imageUrl: string;
  title: string;
  desc: string;
}

const DiseaseItem = (props: DiseaseItemProps) => {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { imageUrl, title, slug } = props;
  return (
    <LinkBox width="130px">
      <VStack spacing={1.5} align="flex-start">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            cursor: "pointer",
            boxSize: "130px",
            position: "relative",
            borderRadius: "base",
            overflow: "hidden",
          }}
        />
        <Navigate name="DISEASE" query={{ slug }}>
          <LinkOverlay fontFamily="poppins" fontSize="sm" noOfLines={2}>
            {title}
          </LinkOverlay>
        </Navigate>
      </VStack>
    </LinkBox>
  );
};

export function DiseasesSectionMobile({
  diseases,
  tagSlug,
}: DiseasesSectionMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={4} align="flex-start" background="white">
      <HStack
        px={4}
        pt={4}
        spacing={2}
        align="baseline"
        w="100%"
        justify="space-between"
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          fontFamily="poppins"
          textTransform="capitalize"
        >
          Penyakit Terkait {tagSlug.split("-").join(" ")}
        </Text>
        <Navigate name="DISEASES">
          <Link
            fontSize="xxs"
            color="sea.500"
            fontWeight="semibold"
            fontStyle="italic"
            variant="unstyled"
            alignItems="flex-start"
            height="auto"
          >
            Lihat Semua
          </Link>
        </Navigate>
      </HStack>
      <Flex width="100%" marginLeft={-3} pb={4} overflowX="auto">
        {diseases?.length &&
          diseases.map((disease, index) => (
            <Box
              minW="130px"
              key={disease.slug}
              marginRight={3}
              marginLeft={index === 0 ? 3 : 0}
            >
              <DiseaseItem {...disease} />
            </Box>
          ))}
      </Flex>
    </VStack>
  );
}

export function DiseasesSectionMobileSkeleton() {
  const Image = useImage();
  return (
    <VStack p={4} spacing={4} align="flex-start" background="white">
      <Flex justify="space-between" align="center" w="100%" h="23px">
        <Skeleton width="200px" height="23px" />
        <Text
          fontSize="xxs"
          color="sea.500"
          fontWeight="semibold"
          fontStyle="italic"
        >
          Lihat Semua
        </Text>
      </Flex>
      <HStack spacing={3.5} overflowX="auto">
        {Array.from(Array(3).keys()).map((id) => (
          <VStack key={id} spacing={1.5} align="flex-start">
            <Image
              src="https://www.sehatq.com/public/assets/img/no-image.jpg"
              alt="no image"
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                cursor: "pointer",
                boxSize: "130px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
            <Skeleton width="130px" height="20px" />
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
