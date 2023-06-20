import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  ChevronRightIcon,
  HStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  useImage,
  VStack,
} from "../../user-interfaces";
import { HealthToolsCache } from "./health-tool-queries";

interface Props {
  contents: HealthToolsCache["data"];
  userId: string;
}

export function HealthToolRecordListMobile({ userId, contents }: Props) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={4}>
      {contents.map(({ id, iconUrl, title, slug }) => (
        <LinkBox
          key={`${id}-${slug}`}
          bg="white"
          h="62px"
          w="full"
          boxShadow="0 0 12px rgba(0, 0, 0, 0.1)"
          borderRadius="xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={4}
        >
          <HStack spacing={2}>
            <Image
              src={iconUrl}
              alt="health tool list icon"
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "34px",
                borderRadius: "base",
                position: "relative",
                overflow: "hidden",
                bg: "main.200",
              }}
            />
            <Navigate
              name="PROFILE_HEALTH_TOOL_SCORE_LIST"
              query={{ healthToolSlug: slug, userId }}
            >
              <LinkOverlay
                fontWeight="semibold"
                fontFamily="Poppins"
                textAlign="left"
                color="charcoalGrey"
                w="3xs"
                noOfLines={1}
              >
                {title}
              </LinkOverlay>
            </Navigate>
          </HStack>
          <ChevronRightIcon w={4} h={5} color="charcoalGrey" />
        </LinkBox>
      ))}
    </VStack>
  );
}

export function HealthToolRecordListMobileSkeleton() {
  return (
    <VStack spacing={6}>
      {Array.from(Array(7).keys()).map((index) => (
        <HStack key={index} spacing={4} align="flex-start" alignItems="center">
          <SkeletonCircle size="10" />
          <VStack spacing={1} align="flex-start">
            <Skeleton height="28px" width="200px" />
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
}
