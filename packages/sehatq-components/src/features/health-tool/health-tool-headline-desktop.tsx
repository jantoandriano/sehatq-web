import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Text,
  Box,
  VStack,
  useImage,
  Divider,
  Link,
  HStack,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";
import { SimpleBlock } from "../layout";

export type HealthToolPropsDesktop = {
  backgroundImage: string;
  leftImage: string;
  leftImageUrl: string;
  rightImage: string;
  rightImageUrl: string;
  title: string;
  description: string;
};

export function HealthToolHeadlineDesktop(props: HealthToolPropsDesktop) {
  const {
    backgroundImage,
    leftImage,
    leftImageUrl,
    rightImage,
    rightImageUrl,
    title,
    description,
  } = props;
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);

  return (
    <Box height="360px" position="relative">
      <Image
        src={backgroundImage || ASSETS.NO_IMAGE}
        alt="background-image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "360px",
          position: "absolute",
        }}
      />

      <SimpleBlock>
        <VStack
          align="flex-start"
          paddingTop="40px"
          zIndex={2}
          position="relative"
        >
          <HStack
            divider={
              <Divider
                orientation="vertical"
                height="42px"
                borderColor="veryLightPink"
              />
            }
          >
            <Link href={leftImageUrl}>
              <Image
                src={leftImage || ASSETS.NO_IMAGE}
                alt="logo-sehatq"
                height={31}
                width={142}
                layout="fixed"
                priority
              />
            </Link>
            {rightImage && (
              <Link href={rightImageUrl}>
                <Image
                  src={rightImage}
                  alt="logo-kementerian-kesehatan"
                  height={54}
                  width={110}
                  layout="fixed"
                  priority
                />
              </Link>
            )}
          </HStack>
          <Text fontSize="38px" fontFamily="poppins" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="xl" fontFamily="openSans" width="582px">
            {description}
          </Text>
        </VStack>
      </SimpleBlock>
    </Box>
  );
}

export function HealthToolHeadlineScheletonDesktop() {
  return (
    <Box height="360px" position="relative">
      <Skeleton height="360px" w="full" position="absolute" />

      <VStack
        align="flex-start"
        marginLeft="140px"
        paddingTop="40px"
        zIndex={2}
        position="relative"
      >
        <HStack
          divider={
            <Divider
              orientation="vertical"
              height="42px"
              borderColor="veryLightPink"
            />
          }
        >
          <Skeleton
            startColor="gray.500"
            endColor="gray.900"
            height={31}
            width={142}
          />
          <Skeleton
            startColor="gray.500"
            endColor="gray.900"
            height={54}
            width={110}
          />
        </HStack>
      </VStack>
      <Box marginX="140px" mt={4}>
        <SkeletonText
          noOfLines={2}
          spacing="4"
          startColor="gray.500"
          endColor="gray.900"
          w="full"
        />
      </Box>
    </Box>
  );
}
