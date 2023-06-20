import { useNavigation, useAssets } from "@sehatq/utils";

import React, { Dispatch, SetStateAction } from "react";
import {
  HStack,
  Box,
  Link,
  SimpleGrid,
  Skeleton,
  useImage,
  VStack,
  Text,
} from "../../user-interfaces";
import { HealthToolScoreCard } from "./health-tool-score-card";
import { HealthToolScoreListCache } from "./health-tool-queries";
import { HealthToolDataList } from "./health-tools-model";

type DateObject = {
  label: string;
  value: string;
};

interface Props {
  contents: HealthToolScoreListCache["data"];
  dateRange?: DateObject[];
  userId: string;
  healthtoolData?: HealthToolDataList;
  setStateTab: Dispatch<SetStateAction<string>>;
  stateTab: string;
}

export function HealthToolScoreListMobile({
  contents,
  dateRange,
  stateTab,
  setStateTab,
  healthtoolData,
  userId,
}: Props) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_STETOSKOP"]);

  const renderColor = (item: DateObject) => {
    if (item.value === stateTab) {
      return {
        borderColor: "main.500",
        borderWidth: "1px",
        color: "sea.500",
        bgColor: "white",
      };
    }
    return {
      bgColor: "paleBlue.500",
      color: "brownGrey.500",
    };
  };

  return (
    <Box bgColor="iceBlue.500" p={5}>
      <HStack w="full" mb={10} overflowX="scroll">
        {dateRange &&
          dateRange.map((item) => {
            return (
              <Box
                {...renderColor(item)}
                borderRadius="18px"
                cursor="pointer"
                variant="unstyled"
                key={item.value}
                onClick={() => setStateTab(item.value)}
              >
                <Box
                  px={4}
                  py={2}
                  fontWeight="semibold"
                  fontSize="sm"
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Box>
              </Box>
            );
          })}
      </HStack>
      {contents.length ? (
        <VStack rowGap={4}>
          {contents.map((content) => {
            return (
              <HealthToolScoreCard
                key={content.id}
                isMobile
                userId={userId}
                healthToolSlug={healthtoolData?.slug || ""}
                {...content}
              />
            );
          })}
        </VStack>
      ) : (
        <VStack w="full" rowGap={5}>
          <Image
            src={ASSETS.ILLUSTRATION_STETOSKOP}
            alt="health tool list icon"
            width={201}
            height={215}
            layout="fixed"
          />
          <Box textAlign="center">
            <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
              Cek Kesehatanmu, Yuk!
            </Text>
            <Text fontSize="sm">{healthtoolData?.description}</Text>
          </Box>
          <Navigate
            name="HEALTH_TOOL_DETAIL"
            query={{ slug: healthtoolData?.slug }}
          >
            <Link
              variant="solid"
              backgroundColor="main.500"
              fontSize="md"
              fontWeight="semibold"
            >
              {healthtoolData?.name}
            </Link>
          </Navigate>
        </VStack>
      )}
    </Box>
  );
}

export function HealthToolScoreListMobileSkeleton() {
  return (
    <Box py={8}>
      <SimpleGrid columns={1} spacing={6} w="full" px={6}>
        {Array.from(Array(2).keys()).map((index) => (
          <HStack
            key={index}
            spacing={4}
            align="flex-start"
            alignItems="center"
            w="full"
          >
            <Box w="full" bgColor="white" px={4} py={4}>
              <VStack spacing={1} align="flex-start" w="full">
                <Skeleton height="10px" w="20%" />
                <Skeleton height="20px" w="full" />
              </VStack>
            </Box>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
