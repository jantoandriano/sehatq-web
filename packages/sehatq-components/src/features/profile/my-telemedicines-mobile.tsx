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
} from "../../user-interfaces";

import { MyTelemedicineCard } from "./my-telemedicine-card";
import { MyTelemedicine } from "./my-telemedicine-model";

export interface MyTelemedicinesMobileProps {
  isLoading: boolean;
  myTelemedicines: MyTelemedicine[];
  refInView: (node?: Element | null) => void;
  hasAnotherMyTelemedicines: boolean;
}

export function MyTelemedicinesMobile({
  isLoading,
  myTelemedicines,
  refInView,
  hasAnotherMyTelemedicines,
}: MyTelemedicinesMobileProps) {
  return (
    <>
      {myTelemedicines?.length > 0 ? (
        <Stack spacing={2.5} width="100%">
          {myTelemedicines.map((item) => (
            <MyTelemedicineCard
              isMobile
              key={item.id}
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
              iconWidth={2.5}
              iconHeight={2.5}
            />
          ))}
          {hasAnotherMyTelemedicines ? (
            <Box ref={refInView}>
              <MyTelemedicineSekeleton />
            </Box>
          ) : null}
        </Stack>
      ) : isLoading ? (
        <Stack spacing={2.5}>
          {Array.from(Array(3).keys()).map((id) => (
            <MyTelemedicineSekeleton key={id} />
          ))}
        </Stack>
      ) : (
        <MyEmptyTelemedicine />
      )}
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
      <Flex align="center" flexDirection="column" mt={8}>
        <Image
          src={ASSETS.TELEMEDICINE}
          alt="Chat Dokter tidak ditemukan"
          width="72.5%"
        />
        <Text
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="lg"
          mb={2}
          mt={5}
        >
          Chat Dokter
        </Text>
        <Text fontSize="md" width="290px" lineHeight="1.43" textAlign="center">
          Diagnosis dokter segampang kirim chat. Enggak perlu lagi nebak-nebak.
        </Text>
      </Flex>
      <Navigate name={telemedNavigation.name} query={telemedNavigation.query}>
        <Link
          size="md"
          isFullWidth
          variant="solid"
          colorScheme="main"
          width="100%"
        >
          Chat Dokter Sekarang
        </Link>
      </Navigate>
    </>
  );
}

export function MyTelemedicineSekeleton() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex justify="space-between" align="center" py={2.5} px={3}>
        <Flex align="center">
          <ChatActivityIcon boxSize="16px" />
          <Text
            ml={2}
            color="sea.500"
            fontSize="xs"
            lineHeight="normal"
            fontWeight="semibold"
          >
            Chat Dokter
          </Text>
        </Flex>
        <Flex>
          <Skeleton width="70px" height="10px" />
        </Flex>
      </Flex>
      <Box borderY="0.5px solid #dadada">
        <Flex
          justify="flex-start"
          align="start"
          px="15px"
          py="11px"
          width="100%"
        >
          <SkeletonCircle boxSize="52px" />
          <Box ml={3}>
            <Skeleton width="100px" height="10px" mb={1} />
            <Skeleton width="60px" height="10px" mb={1} />
            <Skeleton width="50px" height="10px" mb={1} />
            <Skeleton width="100px" height="10px" />
          </Box>
        </Flex>
      </Box>
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <Flex>
            <Box>
              <Text color="brownGrey.500" fontSize="xs" mb={1}>
                Biaya
              </Text>
              <Skeleton width="70px" height="10px" />
            </Box>
          </Flex>
          <Box>
            <Text color="brownGrey.500" fontSize="xs" mb={1}>
              Durasi
            </Text>
            <Skeleton width="70px" height="10px" />
          </Box>
          <Box>
            <Skeleton width="70px" height="10px" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
