import React from "react";
import {
  Box,
  Button,
  Divider,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  RadioGroup,
  Skeleton,
  Center,
  TickIcon,
  ForumSorterIcon,
} from "../../user-interfaces";
import { FilterOptionsSort } from "./forums-models";

export type ForumsSorterMobileProps = {
  selectedValue: string;
  onOpenSorter: () => void;
  isOpen: boolean;
  onSelectedSorter: (value: string) => void;
  onImplement: () => void;
  options: FilterOptionsSort[];
};

export function ForumsSorterMobile(props: ForumsSorterMobileProps) {
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
      <Center cursor="pointer" onClick={onOpenSorter}>
        <ForumSorterIcon boxSize="24px" mr={1} />
        <Text fontSize="xs" fontFamily="poppins">
          Urutkan
        </Text>
      </Center>
      <Drawer
        placement="bottom"
        onClose={onOpenSorter}
        isOpen={isOpen}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerCloseButton />
          <DrawerHeader
            py={3}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Urutkan
          </DrawerHeader>
          <DrawerBody
            borderTop="solid 0.5px"
            borderTopColor="veryLightPink"
            py={0}
          >
            <Box pt={4} pb={8}>
              <RadioGroup
                onChange={(value) => onSelectedSorter(value)}
                name="sorter"
                defaultValue={selectedValue}
                direction="column"
                iconPosition="right"
                options={options.map((sorter) => {
                  return {
                    value: sorter.id,
                    element: (
                      <Text
                        {...(selectedValue === sorter.id && {
                          color: "main.600",
                          fontWeight: "semibold",
                        })}
                        fontSize="sm"
                      >
                        {sorter.name}
                      </Text>
                    ),
                  };
                })}
                divider={
                  <Divider borderColor="veryLightPink" border="solid 0.5px" />
                }
                spacing={3.5}
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
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ForumsSorterMobileSkeleton() {
  return <Skeleton width={90} height={5} />;
}
