import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  RadioGroup,
  Skeleton,
  SorterIcon,
  TickIcon,
} from "../../user-interfaces";
import { FilterOptionsSort } from "./health-care-professional-filters-model";

export type HealthCareProfessionalSorterMobileProps = {
  selectedValue: string;
  onOpenSorter: () => void;
  isOpen: boolean;
  onSelectedSorter: (value: string) => void;
  onImplement: () => void;
  options: FilterOptionsSort[];
};

export function HealthCareProfessionalSorterMobile(
  props: HealthCareProfessionalSorterMobileProps
) {
  const {
    onOpenSorter,
    selectedValue,
    isOpen,
    onSelectedSorter,
    onImplement,
    options,
  } = props;
  return (
    <>
      <Box cursor="pointer" onClick={onOpenSorter}>
        <SorterIcon boxSize="13px" marginRight="2" />
        Urutkan
      </Box>
      <Drawer placement="bottom" onClose={onOpenSorter} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerCloseButton />
          <DrawerHeader
            pb={2}
            pt={3}
            fontSize="3xl"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Urutkan
          </DrawerHeader>
          <DrawerBody px={6} pt={4} pb={10}>
            <RadioGroup
              onChange={(value) => onSelectedSorter(value)}
              name="sorter"
              defaultValue={selectedValue}
              direction="column"
              iconPosition="right"
              options={options.map((sorter) => {
                return {
                  value: sorter.id,
                  element: sorter.name,
                };
              })}
              divider={
                <Divider borderColor="veryLightPink" border="solid 0.5px" />
              }
              spacing={3}
              IconFill={TickIcon}
            />
            <Button
              mt={8}
              variant="solid"
              colorScheme="main"
              width="full"
              onClick={onImplement}
            >
              Terapkan
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function HealthCareProfessionalSorterMobileSkeleton() {
  return <Skeleton width={90} height={5} />;
}
