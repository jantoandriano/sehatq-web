import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  Text,
  Flex,
  Skeleton,
  SkeletonCircle,
  ChatActivityIcon,
  Image,
  Stack,
  Link,
  Button,
} from "../../user-interfaces";

import { MyTelemedicineCard } from "./my-telemedicine-card";
import { MyTelemedicine } from "./my-telemedicine-model";

export interface MyTelemedicinesDesktopProps {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  myTelemedicines: MyTelemedicine[];
  pagination: { page: number; perPage: number; total: number; maxPage: number };
  fetchNextPage: () => void;
}

export function MyTelemedicinesDesktop({
  isLoading,
  isFetchingNextPage,
  myTelemedicines,
  pagination,
  fetchNextPage,
}: MyTelemedicinesDesktopProps) {
  return (
    <>
      {myTelemedicines?.length > 0 ? (
        <Stack spacing={5}>
          {myTelemedicines.map((item) => (
            <MyTelemedicineCard
              key={item.id}
              isMobile={false}
              chatDate={item.chatDate}
              doctorImageSrc={item.doctorImageSrc}
              doctorName={item.doctorName}
              doctorSpeciality={item.doctorSpeciality}
              doctorHospital={item.doctorHospital}
              doctorRating={item.doctorRating}
              doctorRatingTotal={item.doctorRatingTotal}
              hasDoctorNote={item.hasDoctorNote}
              consultationFee={item.consultationFee}
              chatDuration={item.chatDuration}
              chatNavigation={{
                name: "TELEMED_HISTORY",
                query: {
                  consultationId: item.id,
                },
              }}
              iconWidth={3}
              iconHeight={3}
            />
          ))}
          {isFetchingNextPage ? (
            <Box>
              <MyTelemedicineSekeleton />
            </Box>
          ) : null}
        </Stack>
      ) : isLoading ? (
        <Stack spacing={5}>
          {Array.from(Array(3).keys()).map((id) => (
            <MyTelemedicineSekeleton key={id} />
          ))}
        </Stack>
      ) : (
        <MyEmptyTelemedicine />
      )}
      {pagination?.total > myTelemedicines?.length ? (
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
  );
}

export function MyEmptyTelemedicine() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["TELEMEDICINE"]);
  const telemedNavigation = {
    name: "TELEMEDICINES" as const,
    query: {},
  };
  return (
    <>
      <Flex align="center" flexDirection="column">
        <Image
          src={ASSETS.TELEMEDICINE}
          alt="Chat Dokter tidak ditemukan"
          width="44.7%"
        />
        <Text
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="2xl"
          mb={2}
          mt={5}
        >
          Chat Dokter
        </Text>
        <Text fontSize="lg" lineHeight="1.43" textAlign="center">
          Diagnosis dokter segampang kirim chat.
        </Text>
        <Text fontSize="lg" lineHeight="1.43" textAlign="center">
          Enggak perlu lagi nebak-nebak.
        </Text>
      </Flex>
      <Box my={6} textAlign="center">
        <Navigate name={telemedNavigation.name} query={telemedNavigation.query}>
          <Link size="md" variant="solid" colorScheme="main" width="300px">
            Chat Dokter Sekarang
          </Link>
        </Navigate>
      </Box>
    </>
  );
}

export function MyTelemedicineSekeleton() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={2.5} px={3}>
        <ChatActivityIcon boxSize="16px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="xs"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Chat Dokter
        </Text>
        <Skeleton width="70px" height="10px" />
      </Flex>
      <Flex
        justify="space-between"
        px={4}
        py={2.5}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <Flex align="center">
          <SkeletonCircle boxSize="80px" />
          <Box ml={3}>
            <Skeleton width="100px" height="10px" mb={1} />
            <Skeleton width="60px" height="10px" mb={1} />
            <Skeleton width="50px" height="10px" mb={1} />
            <Skeleton width="120px" height="10px" />
          </Box>
        </Flex>
        <Flex justify="space-between" align="center">
          <Flex>
            <Box>
              <Text color="brownGrey.500" fontSize="xs">
                Biaya
              </Text>
              <Skeleton width="70px" height="10px" />
            </Box>
          </Flex>
          <Box mx={3}>
            <Text color="brownGrey.500" fontSize="xs">
              Durasi
            </Text>
            <Skeleton width="70px" height="10px" />
          </Box>
          <Link
            href="#"
            fontSize="xs"
            colorScheme="sea"
            variant="outline"
            height="26px"
          >
            Lihat Detail
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
