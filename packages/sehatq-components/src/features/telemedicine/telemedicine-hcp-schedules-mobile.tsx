import React from "react";
import { useAssets, formatDate } from "@sehatq/utils";
import { addDays } from "date-fns";
import {
  LinkBox,
  Box,
  HStack,
  Text,
  Flex,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useImage,
  Skeleton,
  SkeletonCircle,
  Spacer,
  ChevronDownIcon,
} from "../../user-interfaces";
import {
  TelemedicineHCPSchedulesItem,
  TelemedicineHCPSchedulesData,
} from "./doctor-model";

type TelemedTimeCategory = {
  title: string;
  items: TelemedicineHCPSchedulesData[];
};

export type TelemedicineHCPSchedulesMobileProps = {
  telemedicineSchedules: (TelemedicineHCPSchedulesItem & {
    timeCategory: TelemedTimeCategory[];
  })[];
  selectedSchedule: string;
  selectedScheduleId?: number;
  onClickDate: (date: string) => void;
  onClickTime: (doctorScheduleId: number) => void;
};

export function TelemedicineHCPSchedulesMobile(
  props: TelemedicineHCPSchedulesMobileProps
) {
  const {
    telemedicineSchedules,
    onClickDate,
    selectedSchedule,
    onClickTime,
    selectedScheduleId,
  } = props;

  return (
    <Box bgColor="white">
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        marginBottom={1}
        paddingX={4}
      >
        Pilih Jadwal Konsultasi
      </Text>
      <Text fontSize="sm" paddingX={4}>
        Jadwal menunjukkan Waktu Indonesia Barat (WIB)
      </Text>
      <HStack p={4} spacing={3} overflowX="auto">
        {telemedicineSchedules.map((item) => (
          <LinkBox
            key={item.date}
            onClick={() => onClickDate(item.date)}
            cursor="pointer"
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="67px"
              height="57px"
              borderWidth="1px"
              borderColor={
                item.date === selectedSchedule ? "main.500" : "veryLightPink"
              }
              bgColor={item.date === selectedSchedule ? "iceBlue.500" : "white"}
              borderRadius="base"
            >
              <Text
                fontFamily="poppins"
                fontSize="sm"
                fontWeight="semibold"
                color={
                  item.date === selectedSchedule ? "sea.500" : "charcoalGrey"
                }
              >
                {formatDate(new Date(item.date), "dd MMM")}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color={
                  item.date === selectedSchedule ? "sea.500" : "charcoalGrey"
                }
              >
                {formatDate(addDays(new Date(), 1), "yyyy-MM-dd") ===
                formatDate(new Date(item.date), "yyyy-MM-dd")
                  ? "Besok"
                  : formatDate(new Date(item.date), "eeee")}
              </Text>
            </Flex>
          </LinkBox>
        ))}
      </HStack>
      <Box px={4}>
        <Accordion bg="white" w="100%" allowToggle>
          {telemedicineSchedules.map((dateSchedules) =>
            dateSchedules.date === selectedSchedule ? (
              <TimeSections
                key={dateSchedules.date}
                timeData={dateSchedules.timeCategory}
                onClickTime={onClickTime}
                selectedScheduleId={selectedScheduleId}
              />
            ) : null
          )}
        </Accordion>
      </Box>
    </Box>
  );
}

export function TimeSections(props: {
  timeData: TelemedTimeCategory[];
  selectedScheduleId?: number;
  onClickTime: (doctorScheduleId: number) => void;
}) {
  const { timeData, onClickTime, selectedScheduleId } = props;

  const ASSETS = useAssets([
    "ICON_MORNING",
    "ICON_NOON",
    "ICON_AFTERNOON",
    "ICON_NIGHT",
  ]);
  const Image = useImage();

  function generateIconUrl(title: string) {
    switch (title) {
      case "Siang":
        return ASSETS.ICON_NOON;
      case "Sore":
        return ASSETS.ICON_AFTERNOON;
      case "Malam":
        return ASSETS.ICON_NIGHT;
      default:
        return ASSETS.ICON_MORNING;
    }
  }

  return (
    <>
      {timeData.map((timeSchedules: TelemedTimeCategory) =>
        timeSchedules.items.length ? (
          <AccordionItem
            key={timeSchedules.title}
            borderTopColor="veryLightPink"
          >
            <AccordionButton px={0} justifyContent="space-between">
              <HStack spacing={3}>
                <Image
                  src={generateIconUrl(timeSchedules.title)}
                  alt="Jadwal Konsultasi Dokter"
                  width={40}
                  height={40}
                />
                <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
                  {timeSchedules.title}{" "}
                  <Text
                    fontSize="sm"
                    as="span"
                    color="brownGrey.500"
                    fontFamily="openSans"
                    fontWeight="normal"
                  >
                    ({timeSchedules.items.length} Sesi)
                  </Text>
                </Text>
              </HStack>
              <AccordionIcon width="20px" height="20px" marginLeft={2} />
            </AccordionButton>
            <AccordionPanel px={0}>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                {timeSchedules.items.length
                  ? timeSchedules.items.map((time) => (
                      <TimeOptions
                        time={time}
                        key={time.doctorScheduleId}
                        onClickTime={onClickTime}
                        selectedScheduleId={selectedScheduleId}
                      />
                    ))
                  : null}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ) : null
      )}
    </>
  );
}

function TimeOptions(props: {
  time: TelemedicineHCPSchedulesData;
  selectedScheduleId?: number;
  onClickTime: (doctorScheduleId: number) => void;
}) {
  const { time, onClickTime, selectedScheduleId } = props;
  return (
    <LinkBox
      key={time.doctorScheduleId}
      onClick={() => time.available && onClickTime(time.doctorScheduleId)}
      cursor={time.available ? "pointer" : "not-allowed"}
    >
      <Flex
        borderColor={
          time.doctorScheduleId === selectedScheduleId
            ? "main.500"
            : "veryLightPink"
        }
        borderWidth="1px"
        borderRadius="base"
        bgColor={
          time.available
            ? time.doctorScheduleId === selectedScheduleId
              ? "iceBlue.500"
              : "white"
            : "veryLightPink"
        }
        align="center"
        justify="center"
        paddingY={0.5}
      >
        <Text
          fontWeight="semibold"
          fontSize="xs"
          color={
            time.available
              ? time.doctorScheduleId === selectedScheduleId
                ? "sea.500"
                : "charcoalGrey"
              : "brownGrey.300"
          }
        >
          {time.startAt} - {time.endAt}
        </Text>
      </Flex>
    </LinkBox>
  );
}

export function TelemedicineHCPSchedulesSkeletonMobile() {
  return (
    <Box bgColor="white" paddingX={4}>
      <Skeleton width="185px" height="20px" marginTop={0.5} marginBottom={2} />
      <Skeleton width="full" height="18px" />
      <HStack py={4} spacing={3}>
        {Array.from(Array(3).keys()).map((index) => (
          <Skeleton key={index} width="67px" height="57px" />
        ))}
      </HStack>
      {Array.from(Array(2).keys()).map((index) => (
        <HStack
          key={index}
          borderTopColor="veryLightPink"
          borderTopWidth="1px"
          py={2}
          spacing={3}
        >
          <SkeletonCircle height="40px" width="40px" />
          <Skeleton height="22px" width="80px" />
          <Spacer />
          <ChevronDownIcon width="20px" height="20px" marginLeft={2} />
        </HStack>
      ))}
    </Box>
  );
}
