import React from "react";

import {
  Box,
  Text,
  Drawer,
  ListGroup,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  ListGroupProps,
  IconButton,
  GeneralCalenderIcon,
} from "../../user-interfaces";

export interface MyMentalRecordDateFilterMobileProps {
  dateRangeList: ListGroupProps["list"];
  dateRange: string;
  onDateRangeClick: (nextValue: string) => void;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export function MyMentalRecordDateFilterMobile({
  dateRangeList,
  dateRange,
  onDateRangeClick,
  onClose,
  onOpen,
  isOpen,
}: MyMentalRecordDateFilterMobileProps) {
  return (
    <>
      <IconButton
        aria-label="calender"
        variant="fit"
        icon={<GeneralCalenderIcon w="24px" h="24px" />}
        onClick={onOpen}
      />
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg" maxHeight="calc(100vh - 45px)">
          <DrawerBody>
            <Box pt={3} pb={2}>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="md"
                mb={2.5}
              >
                Riwayat Kesehatan Mental
              </Text>
              <ListGroup
                list={dateRangeList}
                activeItems={[dateRange]}
                onClick={(range) => onDateRangeClick(range.id)}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
