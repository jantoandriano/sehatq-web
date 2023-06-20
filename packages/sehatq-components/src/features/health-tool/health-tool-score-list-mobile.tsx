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
  Button,
  Text,
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
        w="full"
      >
        Cari Tahu Sekarang
      </Link>
    </Navigate>
  );
}

export function HealthToolScoreListMobile({
  healhToolScoreList,
  dateRanges,
  stateDateRange,
  isLoadingDateRange,
  setStateDateRange,
  healthTool,
  userId,
  isMaxPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_STETOSKOP"]);

  return (
    <>
      <Box bgColor="iceBlue.500" pt={2} pb={20} minH="calc(100vh - 60px)">
        <HStack w="full" mb={2} overflowX="auto" px={4} py={2} spacing={3}>
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
                        borderColor: "paleBlue.500",
                      })}
                  cursor="pointer"
                  variant="chip"
                  minW="auto"
                  key={item.value}
                  paddingX={2}
                  height={8}
                  fontWeight="semibold"
                  fontSize="xs"
                  whiteSpace="nowrap"
                  onClick={() => setStateDateRange(item.value)}
                >
                  {item.label}
                </Button>
              );
            })
          ) : (
            <DateRangeChipsMobileSkeleton />
          )}
        </HStack>
        <Box px={4}>
          {healhToolScoreList ? (
            healhToolScoreList.length ? (
              <React.Fragment>
                <VStack spacing={4}>
                  {healhToolScoreList.map((content) => {
                    return (
                      <HealthToolScoreCard
                        key={content.id}
                        isMobile
                        healthToolSlug={healthTool?.slug || ""}
                        userId={userId}
                        {...content}
                      />
                    );
                  })}
                </VStack>
                {isFetchingNextPage && (
                  <Box mt={4}>
                    <HealthToolScoreListMobileSkeleton />
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
              </React.Fragment>
            ) : (
              <VStack w="full" spacing={8} mt={8}>
                <Image
                  src={ASSETS.ILLUSTRATION_STETOSKOP}
                  alt="health tool list icon"
                  width={201}
                  height={215}
                  layout="fixed"
                />
                <Box textAlign="center">
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    fontFamily="poppins"
                  >
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
            <HealthToolScoreListMobileSkeleton />
          )}
        </Box>
      </Box>
      {healthTool && !!healhToolScoreList?.length && (
        <Box px={4} py={3} position="fixed" w="full" bottom={0} bgColor="white">
          <HealthToolCta slug={healthTool.slug} />
        </Box>
      )}
    </>
  );
}

export function HealthToolScoreListMobileSkeleton() {
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
              <Skeleton height="20px" w="30%" />
              <Skeleton height="30px" w="full" />
            </VStack>
          </Box>
        </HStack>
      ))}
    </SimpleGrid>
  );
}

export function DateRangeChipsMobileSkeleton() {
  return (
    <Box py={8}>
      <Flex gap={6} w="full">
        {Array.from(Array(4).keys()).map((index) => (
          <Skeleton key={index} height="30px" w="100px" rounded="xl" />
        ))}
      </Flex>
    </Box>
  );
}
