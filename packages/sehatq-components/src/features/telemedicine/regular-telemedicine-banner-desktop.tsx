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
  SkeletonCircle,
} from "../../user-interfaces";
import { RegularTelemedicineClosedPopup } from "./regular-telemedicine-closed-popup";

export type RegularTelemedicineBannerDesktopProps = {
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

export function RegularTelemedicineBannerDesktop(
  props: RegularTelemedicineBannerDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const assets = useAssets(["REGULAR_TELEMED_VOUCHER_MOBILE"]);

  return (
    <>
      <Flex
        background="white"
        boxShadow="0 4px 12px 0 rgba(43, 142, 142, 0.1)"
        justify="space-between"
        direction="column"
        borderRadius="3xl"
        p={6}
      >
        <Flex direction="row" justify="flex-start">
          <Image
            alt="regular-banner"
            src={props.photoUrl}
            priority
            layout="fill"
            objectFit="cover"
            sizes="96px"
            wrapperProps={{
              boxSize: "96px",
              position: "relative",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Box ml={4}>
            <Text
              color="charcoalGrey"
              fontSize="lg"
              fontWeight="semibold"
              fontFamily="poppins"
              lineHeight="9"
            >
              Konsultasi Dokter Umum
            </Text>
            <Text
              fontSize="sm"
              color="sea.500"
              fontFamily="openSans"
              lineHeight="6"
              mt={1}
            >
              Dokter Umum
            </Text>
            {props.operationHourActive ? (
              <HStack mt={2}>
                <Badge
                  textTransform="capitalize"
                  px={3}
                  size="sm"
                  fontSize="sm"
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
              <HStack
                mt={2}
                fontSize="sm"
                fontFamily="openSans"
                fontWeight="semibold"
              >
                <TimeIcon color="brownGrey.500" />
                <Text color="brownGrey.500" lineHeight="6">
                  Buka:
                </Text>
                <Text color="charcoalGrey" lineHeight="6">
                  {props.operationHours?.join(" - ")}
                </Text>
              </HStack>
            )}
          </Box>
        </Flex>
        <HStack
          mt={4}
          background="gray.500"
          borderRadius="base"
          justify="space-between"
        >
          <Text
            px={4}
            py={2.5}
            color="sea.500"
            fontSize="xl"
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
                borderRadius="base"
                fontSize="lg"
                fontFamily="openSans"
                fontWeight="semibold"
                lineHeight="4xl"
                width="158px"
                height="46px"
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
              colorScheme="main"
              borderRadius="base"
              fontSize="lg"
              fontFamily="openSans"
              fontWeight="semibold"
              lineHeight="4xl"
              width="158px"
              height="46px"
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
            mt={4}
            height="105px"
            borderRadius="lg"
            background="iceBlue.500"
            align="center"
            justify="space-between"
          >
            <Box
              borderLeftRadius="lg"
              width="65px"
              height="105px"
              background="linear-gradient(148deg, #2b8e8e 22%, #70cbcf 98% 122%)"
            ></Box>
            <Image
              src={assets.REGULAR_TELEMED_VOUCHER_MOBILE}
              alt="telemed-voucher"
              priority={true}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                width: "109px",
                height: "89px",
                borderRadius: "xl",
                overflow: "hidden",
                position: "absolute",
              }}
            />
            <VStack justify="space-between" direction="column" ml={6}>
              <Text
                width="full"
                fontSize="xl"
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
                  width="170px"
                  height="37px"
                  borderLeft="dashed 1px"
                  borderY="dashed 1px"
                  borderColor="sea.500"
                  color="sea.500"
                  fontSize="md"
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
                  width="96px"
                  height="37px"
                  borderRadius="base"
                  border="solid 1px"
                  borderColor="main.500"
                  size="md"
                  fontWeight="semibold"
                  color="sea.500"
                  leftIcon={<CopyIcon />}
                >
                  Salin
                </Button>
              </Flex>
            </VStack>
            <Box
              boxSize="40px"
              background="linear-gradient(to right, #70CBCF 50%, transparent 50%)"
              borderRadius="full"
              mr="-21px"
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
      </Flex>
      {props.isOpenTelemedicineInfo &&
        props.operationHours &&
        !props.operationHourActive && (
          <RegularTelemedicineClosedPopup
            isMobile={false}
            isOpenTelemedicineInfo={props.isOpenTelemedicineInfo}
            onCloseTelemedicineInfo={props.onCloseTelemedicineInfo}
            operationHours={props.operationHours}
          />
        )}
    </>
  );
}

export function RegularTelemedicineBannerDesktopSkeleton() {
  return (
    <Flex
      background="white"
      boxShadow="0 4px 12px 0 rgba(43, 142, 142, 0.1)"
      justify="space-between"
      direction="column"
      borderRadius="3xl"
      p={6}
    >
      <Flex direction="row" justify="flex-start">
        <SkeletonCircle boxSize="96px" />
        <Box ml={4}>
          <Skeleton width="228px" height="28px" />
          <Skeleton width="93px" height="22px" mt={1} />
          <Skeleton width="70px" height="24px" borderRadius="base" mt={2} />
        </Box>
      </Flex>
      <HStack
        mt={4}
        background="gray.500"
        borderRadius="base"
        justify="space-between"
      >
        <Skeleton ml={4} width="78px" height="27px" borderRadius="base" />
        <Skeleton width="156px" height="46px" borderRadius="base" />
      </HStack>
      <Flex
        width="full"
        direction="row"
        mt={4}
        align="center"
        justify="space-between"
      >
        <Skeleton width="451px" height="105px" borderRadius="lg" />
        <Box
          ml="430px"
          position="absolute"
          boxSize="40px"
          background="white"
          borderRadius="full"
        ></Box>
      </Flex>
    </Flex>
  );
}
