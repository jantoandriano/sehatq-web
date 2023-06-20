import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Flex,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
  useImage,
} from "../../user-interfaces";

export type MyTelemedicineHistoryBannerDesktopProps = {
  consultationId: number;
  doctorImageUrl: string;
  doctorName: string;
  schedule: string;
};

export function MyTelemedicineHistoryBannerDesktop(
  props: MyTelemedicineHistoryBannerDesktopProps
) {
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox width="300px" height="120px">
      <Flex
        direction="column"
        background="white"
        border="solid 0.5px"
        borderColor="veryLightPink"
        borderRadius="lg"
        width="300px"
        height="120px"
        p={4}
        justify="space-between"
      >
        <Flex direction="row" justify="space-between">
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Riwayat Konsultasi
          </Text>
          <Navigate name="TELEMED_HISTORIES">
            <Link
              as="a"
              color="sea.500"
              fontSize="xs"
              fontWeight="semibold"
              fontStyle="italic"
              _hover={{ border: "none" }}
            >
              Lihat Semua
            </Link>
          </Navigate>
        </Flex>
        <HStack spacing={3}>
          <Image
            alt={props.doctorName}
            src={props.doctorImageUrl}
            priority={true}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              width: "55px",
              height: "60px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Flex direction="column">
            <Navigate
              name="TELEMED_HISTORY"
              query={{
                consultationId: props.consultationId,
              }}
            >
              <LinkOverlay
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="poppins"
                color="charcoalGrey"
              >
                {props.doctorName}
              </LinkOverlay>
            </Navigate>
            <Text fontSize="xxs" color="brownGrey.500" fontWeight="semibold">
              {props.schedule}
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </LinkBox>
  );
}

export function MyTelemedicineHistoryBannerDesktopSkeleton() {
  return (
    <Flex
      direction="column"
      background="white"
      border="solid 0.5px"
      borderColor="veryLightPink"
      borderRadius="lg"
      width="300px"
      height="120px"
      p={4}
      justify="space-between"
    >
      <Flex direction="row" justify="space-between">
        <Skeleton width="135px" height="20px" />
        <Skeleton width="68px" height="17px" />
      </Flex>
      <HStack spacing={3}>
        <SkeletonCircle width="55px" height="60px" />
        <Flex direction="column">
          <Skeleton width="198px" height="20px" mb={1} />
          <Skeleton width="47px" height="14px" />
        </Flex>
      </HStack>
    </Flex>
  );
}
