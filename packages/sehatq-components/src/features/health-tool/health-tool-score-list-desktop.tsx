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
  Button,
  Flex,
} from "../../user-interfaces";
import { HealthToolScoreCard } from "./health-tool-score-card";
import { HealthToolScoreListCache } from "./health-tool-queries";
import { HealthToolDataList } from "./health-tools-model";

interface Props {
  healhToolScoreList?: HealthToolScoreListCache["data"];
  healthTool?: HealthToolDataList;
  dateRanges: {
    label: string;
    value: string;
  }[];
  isLoadingDateRange: boolean;
  setStateDateRange: Dispatch<SetStateAction<string>>;
  stateDateRange: string;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    maxPage: number;
  };
  userId: string;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isMaxPage: boolean;
}

function HealthToolCta({ slug }: { slug: string }) {
  const { Navigate } = useNavigation();
  return (
    <Navigate name="HEALTH_TOOL_DETAIL" query={{ slug }}>
      <Link
        variant="solid"
        backgroundColor="main.500"
        fontSize="sm"
        fontWeight="bold"
        width="300px"
      >
        Cari Tahu Sekarang
      </Link>
    </Navigate>
  );
}

export function HealthToolScoreListDesktop({
  healhToolScoreList,
  dateRanges,
  stateDateRange,
  isLoadingDateRange,
  setStateDateRange,
  fetchNextPage,
  healthTool,
  userId,
  isFetchingNextPage,
  isMaxPage,
}: Props) {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_STETOSKOP"]);

  return (
    <VStack>
      <Box bgColor="iceBlue.500" px={5} pt={5} pb={8} w="full">
        <HStack w="full" mb={10}>
          {!isLoadingDateRange ? (
            dateRanges.map((item) => {
              return (
                <Button
                  {...(item.value === stateDateRange
                    ? {
                        borderColor: "main.500",
                        borderWidth: "1px",
                        color: "sea.500",
                        bgColor: "white",
                      }
                    : {
                        bgColor: "paleBlue.500",
                        color: "brownGrey.500",
                      })}
                  borderRadius="18px"
                  cursor="pointer"
                  variant="fit"
                  key={item.value}
                  onClick={() => setStateDateRange(item.value)}
                  padding={3}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  {item.label}
                </Button>
              );
            })
          ) : (
            <DateRangeChipsDesktopSkeleton />
          )}
        </HStack>
        {healhToolScoreList ? (
          healhToolScoreList.length ? (
            <>
              <VStack spacing={4}>
                {healhToolScoreList.map((content) => {
                  return (
                    <HealthToolScoreCard
                      key={content.id}
                      isMobile={false}
                      healthToolSlug={healthTool?.slug || ""}
                      userId={userId}
                      {...content}
                    />
                  );
                })}
              </VStack>
              {isFetchingNextPage && (
                <Box mt={4}>
                  <HealthToolScoreListDesktopSkeleton />
                </Box>
              )}
              {!isMaxPage ? (
                <Box mt={8} textAlign="center">
                  <Button
                    px={14}
                    size="sm"
                    onClick={fetchNextPage}
                    bgColor="white"
                    color="sea.500"
                    border="1px"
                    borderColor="main.500"
                  >
                    Show More
                  </Button>
                </Box>
              ) : null}
            </>
          ) : (
            <VStack w="full" spacing={5}>
              <Image
                src={ASSETS.ILLUSTRATION_STETOSKOP}
                alt="health tool list icon"
                width={201}
                height={215}
                layout="fixed"
              />
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="semibold" fontFamily="poppins">
                  Cek Kesehatanmu, Yuk!
                </Text>
                <Text fontSize="md">
                  Cek dan dapatkan gambaran kondisi kesehatanmu saat ini
                </Text>
              </Box>
              {healthTool && <HealthToolCta slug={healthTool.slug} />}
            </VStack>
          )
        ) : (
          <HealthToolScoreListDesktopSkeleton />
        )}
      </Box>
      {healthTool && !!healhToolScoreList?.length && (
        <Box px={4} py={3}>
          <HealthToolCta slug={healthTool.slug} />
        </Box>
      )}
    </VStack>
  );
}

export function HealthToolScoreListDesktopSkeleton() {
  return (
    <SimpleGrid columns={1} spacing={6} w="full">
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
              <Skeleton height="30px" w="10%" />
              <Skeleton height="40px" w="full" />
            </VStack>
          </Box>
        </HStack>
      ))}
    </SimpleGrid>
  );
}

export function DateRangeChipsDesktopSkeleton() {
  return (
    <Box py={8}>
      <Flex gap={6} w="full">
        {Array.from(Array(4).keys()).map((index) => (
          <Skeleton key={index} height="40px" w="180px" rounded="xl" />
        ))}
      </Flex>
    </Box>
  );
}
