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
  Skeleton,
  useImage,
} from "../../user-interfaces";

export interface DiseasesSectionDesktopProps {
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
  const { imageUrl, title, slug, desc } = props;
  return (
    <LinkBox>
      <HStack spacing={2.5} align="flex-start">
        <Box>
          <Image
            src={
              imageUrl ||
              "https://www.sehatq.com/public/assets/img/no-image.jpg"
            }
            alt={title}
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
        <Box>
          <Navigate name="DISEASE" query={{ slug }}>
            <LinkOverlay fontWeight="semibold" fontSize="sm" color="main">
              {title}
            </LinkOverlay>
          </Navigate>
          <Text noOfLines={2} fontSize="xs">
            {desc}
          </Text>
        </Box>
      </HStack>
    </LinkBox>
  );
};

export function DiseasesSectionDesktop({
  diseases,
  tagSlug,
}: DiseasesSectionDesktopProps) {
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
        Penyakit {tagSlug.split("-").join(" ")}
      </Text>
      <Divider borderColor="veryLightPink" />
      <VStack
        spacing={4}
        width="100%"
        align="flex-start"
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {diseases.length &&
          diseases.map((disease) => (
            <DiseaseItem key={disease.id} {...disease} />
          ))}
      </VStack>
      <Navigate name="DISEASES">
        <Link
          textAlign="center"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          width="100%"
          variant="unstyled"
        >
          Lihat Semua Penyakit
        </Link>
      </Navigate>
    </VStack>
  );
}

export function DiseasesSectionDesktopSkeleton() {
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
      <Divider border="solid 0.5px" borderColor="veryLightPink" />
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
            <VStack align="flex-start">
              <Skeleton width="240px" height="15px" />
              <Skeleton width="240px" height="35px" />
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
        Lihat Semua Penyakit
      </Text>
    </VStack>
  );
}
