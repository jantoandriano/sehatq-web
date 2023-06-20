import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Text,
  TickIcon,
  HStack,
  Skeleton,
  Button,
  Collapse,
  ChevronDownIcon,
  ChevronUpIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  Box,
  useImage,
} from "../../user-interfaces";
import { ForumsCategoryData } from "./forums-models";

export type ForumCategoryFilterProps = {
  options?: ForumsCategoryData[];
  selectedValue: string;
  isShowFilter: boolean;
  onClickFilterIcon: () => void;
};

export function ForumsCategoryFilterDesktop(props: ForumCategoryFilterProps) {
  const { options, selectedValue, isShowFilter, onClickFilterIcon } = props;
  return (
    <Box
      bg="white"
      border="1px solid"
      borderRadius="xl"
      borderColor="veryLightPink"
    >
      <Button
        variant="fit"
        isFullWidth
        paddingRight={5}
        paddingLeft={5}
        paddingY={4}
        borderRadius="xl"
        borderBottomRadius={isShowFilter ? "none" : "xl"}
        onClick={onClickFilterIcon}
        rightIcon={
          isShowFilter ? (
            <ChevronUpIcon boxSize={5} />
          ) : (
            <ChevronDownIcon boxSize={5} />
          )
        }
        fontSize="sm"
        fontWeight="semibold"
        color="charcoalGrey"
        justifyContent="space-between"
      >
        Kategori
      </Button>
      <Collapse in={isShowFilter}>
        <Box px={3.5}>
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                selectedValue={selectedValue}
              />
            ))}
        </Box>
      </Collapse>
    </Box>
  );
}

type OptionProps = {
  option: ForumsCategoryData;
  selectedValue: string;
};

function OptionItem(props: OptionProps) {
  const { option, selectedValue } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const slugCustom = option.slug === "all" ? "" : option.slug;
  return (
    <Navigate
      name="FORUM"
      query={{ slugs: [slugCustom] }}
      options={{ shallow: true }}
    >
      <Link
        width="full"
        height="50px"
        variant="unstyled"
        fontSize="xs"
        p={0}
        borderRadius="0"
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        justifyContent="space-between"
      >
        <HStack>
          <Image
            alt={option.name}
            src={
              option.slug !== selectedValue
                ? option.imageUrl[0]
                : option.imageUrl[1]
            }
            width={30}
            height={30}
            layout="fixed"
          />
          <Text
            fontSize="xxs"
            textAlign="center"
            color={option.slug === selectedValue ? "main.500" : "charcoalGrey"}
            fontWeight={option.slug === selectedValue ? "semibold" : "normal"}
          >
            {option.name}
          </Text>
        </HStack>
        {option.slug === selectedValue && <TickIcon boxSize="18px" />}
      </Link>
    </Navigate>
  );
}

export function ForumsCategoryFilterDesktopSkeleton() {
  return (
    <>
      <Accordion
        bg="white"
        border="1px solid"
        borderRadius="xl"
        borderColor="veryLightPink"
        w="100%"
        allowToggle
        defaultIndex={0}
      >
        <AccordionItem border="none">
          <AccordionButton
            px={5}
            py={4}
            justifyContent="space-between"
            _hover={{ backgroundColor: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Kategori
            </Text>
            <AccordionIcon width="20px" height="20px" marginLeft={2} />
          </AccordionButton>
          <AccordionPanel px={3.5} py={0}>
            {Array.from(Array(10).keys()).map((index) => {
              return (
                <Box
                  key={index}
                  width="full"
                  height="50px"
                  variant="unstyled"
                  fontSize="xs"
                  borderRadius="0"
                  borderTop="0.5px solid"
                  borderTopColor="veryLightPink"
                  justifyContent="space-between"
                >
                  <Skeleton width="full" height={5} mt={4} />
                </Box>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
