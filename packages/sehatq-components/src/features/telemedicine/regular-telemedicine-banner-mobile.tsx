import { useAssets, useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  useImage,
  Text,
  TimeIcon,
  Badge,
  Link,
  Button,
  CopyIcon,
  VStack,
  CorporateMemberIcon,
  ChevronRightIcon,
  SkeletonCircle,
  InfoOutlineIcon,
  IconButton,
} from "../../user-interfaces";
import { RegularTelemedicineInfo } from "./regular-telemedicine-info";
import { RegularTelemedicineClosedPopup } from "./regular-telemedicine-closed-popup";

export type RegularTelemedicineBannerMobileProps = {
  allowFreeChat: boolean;
  consultationFee: string;
  indicator?: string;
  photoUrl: string;
  voucherCode: string | undefined;
  operationHourActive?: boolean;
  operationHours?: string[];
  onCopy: () => void;
  isCorporate: boolean;
  onShowTelemedicineInfo: () => void;
  isOpenTelemedicineInfo: boolean;
  onCloseTelemedicineInfo: () => void;
};

export function RegularTelemedicineBannerMobile(
  props: RegularTelemedicineBannerMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const assets = useAssets(["REGULAR_TELEMED_VOUCHER_MOBILE"]);

  return (
    <>
      <Flex
        background="white"
        boxShadow="base"
        justify="space-between"
        direction="column"
        borderRadius="lg"
        p={4}
      >
        <Flex direction="row" justify="flex-start">
          <Image
            alt="regular-banner"
            src={props.photoUrl}
            priority={true}
            layout="fill"
            objectFit="cover"
            sizes="64px"
            wrapperProps={{
              boxSize: "64px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Flex ml={3} direction="column" justify="space-between">
            <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold">
              Konsultasi Dokter Umum{" "}
              <IconButton
                aria-label="Telemedicine Info"
                onClick={props.onShowTelemedicineInfo}
                variant="fit"
                icon={
                  <InfoOutlineIcon
                    background="brownGrey.500"
                    color="white"
                    borderRadius="full"
                    boxSize={5}
                  />
                }
              />
            </Text>
            <Text fontSize="xs" color="sea.500" fontFamily="openSans">
              Dokter Umum
            </Text>
            {props.operationHourActive ? (
              <HStack mt={1}>
                <Badge
                  textTransform="capitalize"
                  px={3}
                  py={0.5}
                  size="sm"
                  fontSize="xs"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  color="white"
                  background={
                    props.indicator == "green"
                      ? "shamrock.500"
                      : "veryLightPink"
                  }
                  borderRadius="base"
                >
                  Online
                </Badge>
              </HStack>
            ) : (
              <HStack fontSize="xs" fontFamily="openSans">
                <TimeIcon color="brownGrey.500" />
                <Text color="brownGrey.500">Buka :</Text>
                <Text color="charcoalGrey">
                  {props.operationHours?.join(" - ")}
                </Text>
              </HStack>
            )}
          </Flex>
        </Flex>
        <HStack
          mt={3}
          background="gray.500"
          borderRadius="base"
          justify="space-between"
        >
          <Text
            pl={3}
            color="sea.500"
            fontSize="md"
            fontFamily="openSans"
            fontWeight="bold"
          >
            {props.consultationFee}
          </Text>
          {props.operationHourActive ? (
            <Navigate name="TELEMED_GENERAL_CHAT_FORM">
              <Link
                variant="solid"
                background="main.500"
                fontSize="sm"
                fontFamily="openSans"
                fontWeight="semibold"
                width="120px"
                height="40px"
                _hover={{
                  background: "sea.500",
                }}
              >
                Mulai Chat
              </Link>
            </Navigate>
          ) : (
            <Button
              variant="solid"
              fontSize="sm"
              fontFamily="openSans"
              width="120px"
              height="40px"
              onClick={props.onShowTelemedicineInfo}
            >
              Mulai Chat
            </Button>
          )}
        </HStack>
        {props.voucherCode && (
          <Flex
            direction="row"
            border="solid 0.5px"
            borderColor="main.500"
            mt={3}
            height="80px"
            borderRadius="lg"
            background="iceBlue.500"
            align="center"
            justify="space-between"
          >
            <Box
              borderLeftRadius="lg"
              width="50px"
              height="80px"
              background="linear-gradient(147deg, #70cbcf, #2b8e8e 98%)"
            ></Box>
            <Image
              src={assets.REGULAR_TELEMED_VOUCHER_MOBILE}
              alt="telemed-voucher"
              priority={true}
              layout="fill"
              objectFit="cover"
              sizes="90px"
              wrapperProps={{
                width: "90px",
                height: "74px",
                borderRadius: "xl",
                overflow: "hidden",
                position: "absolute",
              }}
            />
            <VStack justify="space-between" direction="column" ml={6}>
              <Text
                width="full"
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                color="charcoalGrey"
              >
                Dapatkan Promo Rp0
              </Text>
              <Flex direction="row">
                <Text
                  py={1}
                  px={2}
                  width="90px"
                  height="30px"
                  borderLeft="dashed 1px"
                  borderY="dashed 1px"
                  borderColor="sea.500"
                  color="sea.500"
                  fontSize="sm"
                  fontWeight="semibold"
                  borderLeftRadius="base"
                  verticalAlign="middle"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {props.voucherCode}
                </Text>
                <Button
                  onClick={props.onCopy}
                  variant="outline"
                  background="white"
                  width="77px"
                  height="30px"
                  borderRadius="base"
                  border="solid 1px"
                  borderColor="main.500"
                  size="sm"
                  fontWeight="semibold"
                  color="sea.500"
                  leftIcon={<CopyIcon />}
                >
                  Salin
                </Button>
              </Flex>
            </VStack>
            <Box
              boxSize="30px"
              background="linear-gradient(to right, #70CBCF 50%, transparent 50%)"
              borderRadius="full"
              mr="-16px"
              p="px"
            >
              <Box
                boxSize="full"
                background="linear-gradient(to right, white 50%, transparent 50%)"
                borderRadius="full"
              ></Box>
            </Box>
          </Flex>
        )}
        {!props.isCorporate && (
          <Navigate name="PARTNER_CORPORATE">
            <Link as="a" variant="unstyled" mt={3}>
              <Flex
                width="full"
                background="white"
                height="36px"
                direction="row"
                borderRadius="base"
                boxShadow="base"
                p={1.5}
                justify="space-between"
                align="center"
              >
                <Box
                  borderRadius="full"
                  background="paleBlue.500"
                  ml="1px"
                  width="20px"
                  height="21px"
                ></Box>
                <CorporateMemberIcon boxSize="23px" position="absolute" />
                <Text
                  fontSize="xs"
                  fontFamily="openSans"
                  fontWeight="normal"
                  color="charcoalGrey"
                >
                  Klik untuk lihat benefit member Corporate
                </Text>
                <ChevronRightIcon mr={-1} boxSize="20px" color="main.500" />
              </Flex>
            </Link>
          </Navigate>
        )}
      </Flex>
      {props.isOpenTelemedicineInfo && props.operationHourActive && (
        <RegularTelemedicineInfo
          isMobile
          allowFreeChat={props.allowFreeChat}
          isOpenTelemedicineInfo={props.isOpenTelemedicineInfo}
          onCloseTelemedicineInfo={props.onCloseTelemedicineInfo}
        />
      )}
      {props.isOpenTelemedicineInfo &&
        props.operationHours &&
        !props.operationHourActive && (
          <RegularTelemedicineClosedPopup
            isMobile
            isOpenTelemedicineInfo={props.isOpenTelemedicineInfo}
            onCloseTelemedicineInfo={props.onCloseTelemedicineInfo}
            operationHours={props.operationHours}
          />
        )}
    </>
  );
}

export function RegularTelemedicineBannerMobileSkeleton() {
  return (
    <Flex
      background="white"
      boxShadow="base"
      justify="space-between"
      direction="column"
      borderRadius="lg"
      p={4}
    >
      <Flex direction="row" justify="flex-start">
        <SkeletonCircle boxSize="64px" />
        <Flex ml={3} direction="column" justify="space-between">
          <Skeleton width="177px" height="21px" />
          <Skeleton width="80px" height="18px" />
          <Skeleton width="57px" height="20px" borderRadius="base" />
        </Flex>
      </Flex>
      <HStack
        mt={3}
        background="gray.500"
        borderRadius="base"
        justify="space-between"
      >
        <Skeleton ml={3} width="62px" height="24px" borderRadius="base" />
        <Skeleton width="120px" height="40px" mt={3} borderRadius="base" />
      </HStack>
      <Flex
        width="full"
        direction="row"
        mt={3}
        align="center"
        justify="space-between"
      >
        <Skeleton width="305px" height="80px" borderRadius="lg" />
        <Box
          ml="280px"
          position="absolute"
          boxSize="30px"
          background="white"
          borderRadius="full"
        ></Box>
      </Flex>
      <Skeleton width="full" height="36px" mt={3} borderRadius="base" />
    </Flex>
  );
}
