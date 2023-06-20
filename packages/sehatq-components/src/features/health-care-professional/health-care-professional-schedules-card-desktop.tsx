import React from "react";
import {
  Badge,
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

export type HCPSchedulesCardDesktopProps = {
  isPartner: boolean;
  onShowOtherSched: () => void;
  collapse: boolean;
  onCollapse: () => void;
  bookingOnline: boolean;
  phone: string;
} & RenderHCFInfoDesktopProps &
  RenderHCPProceduresDesktopProps &
  RenderHCPSechulesDesktopProps;

export function HCPSchedulesCardDesktop(props: HCPSchedulesCardDesktopProps) {
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
      background="white"
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
          fontSize="md"
          color="charcoalGrey"
          borderTopRadius="xl"
          height="14"
          p="4"
        >
          <InfoOutlineIcon color="cherry.600" /> Layanan online booking belum
          tersedia.
        </Box>
      )}
      <RenderHCFInfoDesktop {...props} showDatePicker={collapse} />
      {collapse && (
        <Box px="10">
          {props.procedures && <RenderHCPProceduresDesktop {...props} />}
          <RenderHCPSechulesDesktop {...props} />
          {props.schedules.length > 2 && (
            <>
              <Divider borderColor="main.500" border="solid 0.5px" />
              <Button
                my={2}
                _focus={{ border: "none" }}
                variant="unstyled"
                color="sea.500"
                fontSize="lg"
                fontWeight="semibold"
                rightIcon={
                  <ChevronRightIcon
                    position="absolute"
                    bottom={3}
                    boxSize="18px"
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
          fontSize="sm"
          color="charcoalGrey"
          borderBottomRadius="xl"
          height="12"
          p="3"
        >
          Hubungi Faskes: {phone}
        </Box>
      )}
    </Flex>
  );
}

export type RenderHCFInfoDesktopProps = {
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

export function RenderHCFInfoDesktop(props: RenderHCFInfoDesktopProps) {
  const Image = useImage();
  return (
    <Flex direction="row" justify="space-between" p="10">
      <HStack>
        <Box width="120px" height="90px" position="relative">
          <Image
            src={props.hcfImageUrl}
            alt={props.hcfImageAlt}
            priority
            layout="fill"
            objectFit="cover"
            sizes="120px"
            wrapperProps={{
              width: "120px",
              height: "90px",
              borderRadius: "xl",
              overflow: "hidden",
            }}
          />
          {props.isPartner && (
            <Badge
              position="absolute"
              variant="solid"
              background="squash.500"
              fontSize="xxs"
              fontWeight="semibold"
              textTransform="capitalize"
              borderRadius="full"
              size="sm"
              top={1}
              left={1}
              width={16}
            >
              <PartnerIcon boxSize="18px" />
              Partner
            </Badge>
          )}
        </Box>
        <Box pl="4" color="charcoalGrey">
          <Text
            as="h2"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="3xl"
          >
            {props.hcfName}
          </Text>
          <Text fontSize="md">{props.hcfAddress}</Text>
          {props.hcfDistance && (
            <HStack spacing="1">
              <LocationIcon boxSize="15px" />
              <Text fontSize="md" color="brownGrey.500">
                {props.hcfDistance} km
              </Text>
            </HStack>
          )}
        </Box>
      </HStack>

      {props.showDatePicker && (
        <DatePicker
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

export type RenderHCPProceduresDesktopProps = {
  procedures: string;
  showOtherProcedures: boolean;
  onShowOtherProcedures: () => void;
};

export function RenderHCPProceduresDesktop(
  props: RenderHCPProceduresDesktopProps
) {
  const { showOtherProcedures, onShowOtherProcedures, procedures } = props;
  const showButtonOther = !showOtherProcedures && procedures.length > 94;

  return (
    <Flex
      background="iceBlue.500"
      borderRadius="xl"
      boxShadow="base"
      border="solid 1px"
      borderColor="main.500"
      p="4"
      fontSize="sm"
      lineHeight="7"
      color="charcoalGrey"
      justify="space-between"
      direction="row"
      onClick={showOtherProcedures ? onShowOtherProcedures : undefined}
      mb={6}
    >
      <Box
        maxWidth="-webkit-max-content"
        maxW={!showButtonOther ? "full" : "80%"}
      >
        <Text fontFamily="poppins" fontWeight="semibold">
          Layanan Pemeriksaan
        </Text>
        {!showButtonOther ? (
          procedures
        ) : (
          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {procedures}
          </Text>
        )}
      </Box>
      {showButtonOther && (
        <Button
          _focus={{ border: "none" }}
          variant="unstyled"
          color="sea.500"
          fontSize="sm"
          onClick={onShowOtherProcedures}
          fontStyle="italic"
        >
          Selengkapnya
        </Button>
      )}
    </Flex>
  );
}

export type RenderHCPSechulesDesktopProps = {
  schedules: { date: string; activeSchedules: string[] }[];
  selectedSchedule?: { date: string; time: string };
  showOtherSched: boolean;
  onSelectSchedule: (date: string, time: string) => void;
};

export function RenderHCPSechulesDesktop(props: RenderHCPSechulesDesktopProps) {
  const { schedules, selectedSchedule, showOtherSched, onSelectSchedule } =
    props;
  const limit = showOtherSched ? schedules.length : 2;
  return (
    <VStack
      pb="6"
      spacing={6}
      align="flex-start"
      divider={<Divider borderColor="main.500" border="solid 0.5px" />}
    >
      {schedules.slice(0, limit).map((schedule) => (
        <Box key={schedule.date}>
          <Text color="charcoalGrey" fontSize="lg" mb={2}>
            {schedule.date}
          </Text>
          <Box>
            {schedule.activeSchedules.map((time) => (
              <Button
                mb={2}
                mr={2}
                width="auto"
                height="39px"
                fontSize="lg"
                key="time"
                variant="outline"
                borderColor="main.500"
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

export function HCPSchedulesCardDesktopSkeleton() {
  return (
    <HStack
      p="10"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      borderColor="main.500"
    >
      <Skeleton width="120px" height="90px" borderRadius="xl" />
      <Box pl="4">
        <Skeleton width={56} height={6} mb={2} />
        <Skeleton width={44} height={4} mb={2} />
        <Skeleton width={20} height={4} />
      </Box>
    </HStack>
  );
}
