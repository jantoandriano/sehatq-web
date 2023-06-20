import React from "react";
import { AdSlot } from "../google-publisher-tag";
import {
  Box,
  Skeleton,
  Text,
  VStack,
  StackDivider,
  SkeletonText,
} from "../../user-interfaces";
import { Content } from "../layout";

export type DiseaseContentDesktopProps = {
  title: string;
  list: { id: number; label: string; content: string; flag: string }[];
  table: { id: number; label: string; content: string }[];
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
};

export function DiseaseContentMobile(props: DiseaseContentDesktopProps) {
  const { title, table, list, adsTop, adsMiddle, adsBottom } = props;
  return (
    <VStack spacing={30} align="normal">
      {list.map((item) => {
        if (item.flag === "table") {
          return (
            !!table.length && (
              <Box key={item.id}>
                <Text
                  fontSize="md"
                  color="white"
                  bg="main.500"
                  fontWeight="bold"
                  py={3}
                  px={6}
                  borderTopRadius="10px"
                >
                  {title}
                </Text>
                <VStack
                  spacing={4}
                  py={4}
                  px={6}
                  bg="gray.500"
                  divider={<StackDivider borderColor="veryLightPink" />}
                  width="full"
                  align="flex-start"
                >
                  {table.map((item) => (
                    <Box key={item.id}>
                      <Text fontWeight="semibold">{item.label}</Text>
                      <Content isMobile>{item.content}</Content>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )
          );
        } else if (item.flag === "adsTopMobile" && adsTop) {
          return <React.Fragment key={item.id}>{adsTop}</React.Fragment>;
        } else if (item.flag === "adsMiddleMobile" && adsMiddle) {
          return <React.Fragment key={item.id}>{adsMiddle}</React.Fragment>;
        } else if (item.flag === "adsBottomMobile" && adsBottom) {
          return <React.Fragment key={item.id}>{adsBottom}</React.Fragment>;
        } else if (item.content) {
          return (
            <Box key={item.id}>
              <Text
                as="h2"
                fontSize="xl"
                fontWeight="bold"
                fontFamily="poppins"
                textAlign="left"
                marginBottom={1.5}
              >
                {item.label}
              </Text>
              <Content isMobile>{item.content}</Content>
            </Box>
          );
        } else {
          return null;
        }
      })}
    </VStack>
  );
}

export function DiseaseContentSkeletonMobile() {
  return (
    <>
      <Skeleton height="20px" w="50%" />
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
      <Skeleton height="200px" my={3} />
      <Skeleton height="20px" w="50%" />
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
    </>
  );
}
