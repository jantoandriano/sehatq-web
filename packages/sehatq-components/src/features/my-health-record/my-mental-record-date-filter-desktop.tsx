import React from "react";

import {
  IconButton,
  GeneralCalenderIcon,
  ListGroupProps,
  RadioGroup,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Flex,
  Box,
  ChevronUpIcon,
  StackDivider,
} from "../../user-interfaces";

export interface MyMentalRecordDateFilterDesktopProps {
  dateRangeList: ListGroupProps["list"];
  dateRange: string;
  onDateRangeClick: (nextValue: string) => void;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export function MyMentalRecordDateFilterDesktop({
  dateRangeList,
  dateRange,
  onDateRangeClick,
  onClose,
  onOpen,
  isOpen,
}: MyMentalRecordDateFilterDesktopProps) {
  const options = dateRangeList?.map((range) => {
    return {
      element: (
        <Text
          key={range.id}
          fontSize="sm"
          {...(dateRange === range.id && {
            color: "sea.500",
            fontWeight: "semibold",
          })}
        >
          {range.label}
        </Text>
      ),
      value: range.id,
    };
  });
  return (
    <>
      <Popover onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
        <PopoverTrigger>
          <IconButton
            aria-label="calender"
            variant="fit"
            icon={<GeneralCalenderIcon w="36px" h="36px" />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            fontWeight="semibold"
            fontSize="sm"
            borderBottom="0.5px solid"
            borderColor="veryLightPink"
            p={4}
          >
            <Flex justify="space-between">
              <Text fontWeight="semibold" fontSize="sm">
                Waktu Pemeriksaan
              </Text>
              <IconButton
                aria-label="back-button"
                variant="fit"
                icon={<ChevronUpIcon w="20px" h="20px" color="charcoalGrey" />}
              />
            </Flex>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody py={4} pl={3} pr={0}>
            <Box width="100%">
              <RadioGroup
                spacing="4"
                defaultValue={dateRange}
                options={options}
                name="date-range"
                onChange={onDateRangeClick}
                direction="column"
                divider={<StackDivider borderColor="veryLightPink" />}
              />
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
