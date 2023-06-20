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

export type TelemedicineHCPSchedulesDesktopProps = {
  telemedicineSchedules: (TelemedicineHCPSchedulesItem & {
    timeCategory: TelemedTimeCategory[];
  })[];
  selectedSchedule: string;
  selectedScheduleId?: number;
  onClickDate: (date: string) => void;
  onClickTime: (doctorScheduleId: number) => void;
};

export function TelemedicineHCPSchedulesDesktop(
  props: TelemedicineHCPSchedulesDesktopProps
) {
  const {
    telemedicineSchedules,
    onClickDate,
    selectedSchedule,
    onClickTime,
    selectedScheduleId,
  } = props;

  return (
    <Box bgColor="white" boxShadow="sm" borderRadius="xl" padding={6}>
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="lg"
        marginBottom={1}
      >
        Pilih Jadwal Konsultasi
      </Text>
      <Text fontSize="sm">Jadwal menunjukkan Waktu Indonesia Barat (WIB)</Text>
      <Grid
        py={4}
        spacing={3}
        overflowX="auto"
        templateColumns="repeat(6, 1fr)"
        gap={3}
      >
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
              height="70px"
              borderWidth="1px"
              borderColor={
                item.date === selectedSchedule ? "main.500" : "veryLightPink"
              }
              bgColor={item.date === selectedSchedule ? "iceBlue.500" : "white"}
              borderRadius="base"
            >
              <Text
                fontFamily="poppins"
                fontSize="lg"
                fontWeight="semibold"
                color={
                  item.date === selectedSchedule ? "sea.500" : "charcoalGrey"
                }
              >
                {formatDate(new Date(item.date), "dd MMM")}
              </Text>
              <Text
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
      </Grid>
      <Box>
        <Accordion bg="white" w="100%" allowMultiple>
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
            <AccordionButton
              px={0}
              py={4}
              justifyContent="space-between"
              _focus={{ boxShadow: "none" }}
            >
              <HStack spacing={4}>
                <Image
                  src={generateIconUrl(timeSchedules.title)}
                  alt="Jadwal Konsultasi Dokter"
                  width={48}
                  height={48}
                />
                <Text fontWeight="semibold" fontFamily="poppins">
                  {timeSchedules.title}{" "}
                  <Text
                    as="span"
                    color="brownGrey.500"
                    fontFamily="openSans"
                    fontWeight="normal"
                  >
                    ({timeSchedules.items.length} Sesi)
                  </Text>
                </Text>
              </HStack>
              <AccordionIcon width="28px" height="28px" marginLeft={2} />
            </AccordionButton>
            <AccordionPanel px={0} pb={3} pt={1}>
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
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
        paddingY={2}
      >
        <Text
          fontWeight="semibold"
          fontSize="sm"
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

export function TelemedicineHCPSchedulesSkeletonDesktop() {
  return (
    <Box bgColor="white" boxShadow="sm" borderRadius="xl" padding={6}>
      <Skeleton width="210px" height="24px" marginBottom={2} />
      <Skeleton width="325px" height="18px" />
      <Grid
        py={4}
        spacing={3}
        overflowX="auto"
        templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        {Array.from(Array(5).keys()).map((index) => (
          <Skeleton key={index} height="70px" />
        ))}
      </Grid>
      {Array.from(Array(2).keys()).map((index) => (
        <HStack
          key={index}
          borderTopColor="veryLightPink"
          borderTopWidth="1px"
          py={4}
          spacing={4}
        >
          <SkeletonCircle height="48px" width="48px" />
          <Skeleton height="25px" width="100px" />
          <Spacer />
          <ChevronDownIcon width="28px" height="28px" marginLeft={2} />
        </HStack>
      ))}
    </Box>
  );
}
