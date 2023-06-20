import React, { ReactElement } from "react";
import { useAssets } from "@sehatq/utils";
import {
  Text,
  Box,
  useImage,
  Divider,
  Stack,
  Link,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
} from "../../user-interfaces";

export type HealthToolPropsMobile = {
  backgroundImageMobile: string;
  leftImage: string;
  leftImageUrl: string;
  rightImage: string;
  rightImageUrl: string;
  title: string;
  description: string;
  children?: ReactElement;
};

export function HealthToolHeadlineMobile(props: HealthToolPropsMobile) {
  const {
    backgroundImageMobile,
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
    <Box h="526px" position="relative">
      <Image
        src={backgroundImageMobile || ASSETS.NO_IMAGE}
        alt="background-image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          height: "520px",
          position: "absolute",
        }}
      />

      <Stack align="center" pt={10}>
        <Flex alignItems="center">
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
            <>
              <Divider
                orientation="vertical"
                height="42px"
                borderColor="veryLightPink"
                ml={3}
                mr={2}
              />
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
            </>
          )}
        </Flex>
        <Box zIndex={1} px="16px">
          <Text
            fontSize="30px"
            fontFamily="poppins"
            fontWeight="semibold"
            textAlign="center"
          >
            {title}
          </Text>
          <Text fontSize="lg" fontFamily="openSans" textAlign="center">
            {description}
          </Text>
        </Box>
      </Stack>

      {props.children ?? null}
    </Box>
  );
}

export function HealthToolHeadlineScheletonMobile() {
  return (
    <Box h="526px" position="relative">
      <Skeleton height="520px" w="full" position="absolute" />

      <Stack align="center" pt={10}>
        <Flex alignItems="center">
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
        </Flex>
      </Stack>
      <Box px="16px" pt={5}>
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
