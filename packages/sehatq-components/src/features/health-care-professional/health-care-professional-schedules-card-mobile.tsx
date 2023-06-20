import React from "react";
import {
  Box,
  Button,
  ChevronRightIcon,
  DatePicker,
  Divider,
  Flex,
  HStack,
  InfoOutlineIcon,
  LocationIcon,
  PartnerIcon,
  Skeleton,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type HCPSchedulesCardMobileProps = {
  isPartner: boolean;
  onShowOtherSched: () => void;
  collapse: boolean;
  onCollapse: () => void;
  bookingOnline: boolean;
  phone: string;
} & RenderHCFInfoMobileProps &
  RenderHCPProceduresMobileProps &
  RenderHCPSechulesMobileProps;

export function HCPSchedulesCardMobile(props: HCPSchedulesCardMobileProps) {
  const {
    showOtherSched,
    onShowOtherSched,
    collapse,
    onCollapse,
    bookingOnline,
    phone,
  } = props;
  return (
    <Flex
      background={collapse ? "iceBlue.500" : "white"}
      borderRadius="xl"
      boxShadow="base"
      border={collapse ? "solid 1px" : "none"}
      borderColor="main.500"
      direction="column"
      justify="space-between"
      onClick={!bookingOnline || collapse ? undefined : onCollapse}
      cursor="pointer"
    >
      {!bookingOnline && (
        <Box
          background="cherry.50"
          fontSize="xs"
          color="charcoalGrey"
          borderTopRadius="xl"
          height="9"
          p="2"
        >
          <InfoOutlineIcon color="cherry.600" /> Layanan online booking belum
          tersedia.
        </Box>
      )}
      <RenderHCFInfoMobile {...props} showDatePicker={collapse} />
      {collapse && (
        <Box px="4">
          {props.procedures && <RenderHCPProceduresMobile {...props} />}
          <RenderHCPSechulesMobile {...props} />
          {props.schedules.length > 2 && (
            <>
              <Divider borderColor="main.500" border="solid 0.5px" />
              <Button
                my={1}
                _focus={{ border: "none" }}
                variant="unstyled"
                color="sea.500"
                fontSize="xs"
                fontWeight="semibold"
                rightIcon={
                  <ChevronRightIcon
                    position="absolute"
                    bottom={3}
                    boxSize="15px"
                    color="main.500"
                  />
                }
                onClick={onShowOtherSched}
              >
                {showOtherSched
                  ? "Tutup jadwal lainnya"
                  : "Pilih jadwal praktik lainnya"}
              </Button>
            </>
          )}
        </Box>
      )}
      {!bookingOnline && (
        <Box
          background="gray.500"
          fontSize="xxs"
          color="charcoalGrey"
          borderBottomRadius="xl"
          height="7"
          p="2"
        >
          Hubungi Faskes: {phone}
        </Box>
      )}
    </Flex>
  );
}

export type RenderHCFInfoMobileProps = {
  hcfName: string;
  hcfAddress: string;
  hcfDistance: number;
  hcfLatitude: number;
  hcfLongitude: number;
  hcfImageUrl: string;
  hcfImageAlt: string;
  isPartner: boolean;
  showDatePicker?: boolean;
  onChangeDate: (value: Date | undefined) => void;
  selectedDate: Date | undefined;
};

export function RenderHCFInfoMobile(props: RenderHCFInfoMobileProps) {
  const Image = useImage();
  return (
    <Flex direction="row" justify="space-between" p="4">
      <HStack>
        <Box width="80px" height="60px" position="relative">
          <Image
            src={props.hcfImageUrl}
            alt={props.hcfImageAlt}
            priority
            layout="fill"
            objectFit="cover"
            sizes="80px"
            wrapperProps={{
              width: "80px",
              height: "60px",
              borderRadius: "xl",
              overflow: "hidden",
            }}
          />
          {props.isPartner && (
            <PartnerIcon position="absolute" top={1} left={1} boxSize="18px" />
          )}
        </Box>
        <Box pl="2" color="charcoalGrey">
          <Text
            as="h2"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
          >
            {props.hcfName}
          </Text>
          <Text fontSize="xs">{props.hcfAddress}</Text>
          {props.hcfDistance && (
            <HStack spacing="1">
              <LocationIcon boxSize="15px" />
              <Text fontSize="xs" color="brownGrey.500">
                {props.hcfDistance} km
              </Text>
            </HStack>
          )}
        </Box>
      </HStack>

      {props.showDatePicker && (
        <DatePicker
          isMobile
          variant="button"
          value={props.selectedDate}
          onChange={props.onChangeDate}
          pickerProps={{
            disabled: { before: new Date() },
          }}
        />
      )}
    </Flex>
  );
}

export type RenderHCPProceduresMobileProps = {
  procedures: string;
  showOtherProcedures: boolean;
  onShowOtherProcedures: () => void;
};

export function RenderHCPProceduresMobile(
  props: RenderHCPProceduresMobileProps
) {
  const { showOtherProcedures, onShowOtherProcedures, procedures } = props;
  const showButtonOther = !showOtherProcedures && procedures.length > 45;

  return (
    <Flex
      background="white"
      borderRadius="xl"
      boxShadow="base"
      p="4"
      fontSize="xs"
      lineHeight="taller"
      color="charcoalGrey"
      justify="space-between"
      direction="column"
      onClick={showOtherProcedures ? onShowOtherProcedures : undefined}
      mb={3}
    >
      <HStack justify="space-between">
        <Text fontFamily="poppins" fontWeight="semibold">
          Layanan Pemeriksaan
        </Text>
        {showButtonOther && (
          <Button
            _focus={{ border: "none" }}
            variant="unstyled"
            color="sea.500"
            fontSize="xs"
            height="auto"
            onClick={onShowOtherProcedures}
            fontStyle="italic"
          >
            Selengkapnya
          </Button>
        )}
      </HStack>
      {!showButtonOther ? (
        procedures
      ) : (
        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {procedures}
        </Text>
      )}
    </Flex>
  );
}

export type RenderHCPSechulesMobileProps = {
  schedules: { date: string; activeSchedules: string[] }[];
  selectedSchedule?: { date: string; time: string };
  showOtherSched: boolean;
  onSelectSchedule: (date: string, time: string) => void;
};

export function RenderHCPSechulesMobile(props: RenderHCPSechulesMobileProps) {
  const { schedules, selectedSchedule, showOtherSched, onSelectSchedule } =
    props;
  const limit = showOtherSched ? schedules.length : 2;
  return (
    <VStack
      pb="3"
      spacing={3}
      align="flex-start"
      divider={<Divider borderColor="main.500" border="solid 0.5px" />}
    >
      {schedules.slice(0, limit).map((schedule) => (
        <Box key={schedule.date}>
          <Text color="charcoalGrey" fontSize="sm" mb={2}>
            {schedule.date}
          </Text>
          <Box>
            {schedule.activeSchedules.map((time) => (
              <Button
                mr={1}
                mb={1}
                width="auto"
                height="26px"
                fontSize="xs"
                key="time"
                variant="outline"
                borderColor="main.500"
                background="white"
                color="charcoalGrey"
                isActive={
                  time == selectedSchedule?.time &&
                  schedule.date == selectedSchedule?.date
                }
                _active={{
                  background: "main.500",
                  color: "white",
                }}
                _focus={{
                  border: "none",
                }}
                _hover={{
                  background: "main.500",
                  color: "white",
                }}
                onClick={() => onSelectSchedule(schedule.date, time)}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Box>
      ))}
    </VStack>
  );
}

export function HCPSchedulesCardMobileSkeleton() {
  return (
    <HStack
      p="4"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      borderColor="main.500"
    >
      <Skeleton width="80px" height="60px" borderRadius="xl" />
      <Box pl="2">
        <Skeleton width={32} height={4} mb={2} />
        <Skeleton width={24} height={3} mb={2} />
        <Skeleton width={14} height={3} />
      </Box>
    </HStack>
  );
}
