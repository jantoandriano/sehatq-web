import React from "react";
import { AdSlot } from "../google-publisher-tag";
import {
  Box,
  Skeleton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SkeletonText,
  VStack,
} from "../../user-interfaces";
import { Content } from "../layout";

export type DiseaseContentDesktopProps = {
  title: string;
  list: { id: number; label: string; content: string; flag: string }[];
  table: { id: number; label: string; content: string }[];
  adsMiddle?: ReturnType<typeof AdSlot>;
};

export function DiseaseContentDesktop(props: DiseaseContentDesktopProps) {
  const { title, table, list, adsMiddle } = props;
  return (
    <VStack spacing={30} align="normal">
      {list.map((item) => {
        if (item.flag === "table") {
          return (
            !!table.length && (
              <TableContainer bg="gray.500" my={14} key={item.id}>
                <Table variant="simple">
                  <Thead bg="main.500">
                    <Tr>
                      <Th
                        colSpan={2}
                        borderTopRadius="10px"
                        textTransform="none"
                      >
                        <Text fontSize="sm" fontWeight="semibold" color="white">
                          {title}
                        </Text>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {table.map((item) => (
                      <Tr
                        key={item.id}
                        borderBottom="1.5px solid"
                        borderColor="veryLightPink"
                      >
                        <Td fontSize="sm" fontWeight="semibold">
                          {item.label}
                        </Td>
                        <Td
                          whiteSpace="normal"
                          fontSize="sm"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )
          );
        } else if (item.flag === "adsMiddleDesktop" && adsMiddle) {
          return <React.Fragment key={item.id}>{adsMiddle}</React.Fragment>;
        } else if (item.content) {
          return (
            <Box key={item.id}>
              <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="poppins"
                textAlign="left"
                marginBottom={1.5}
              >
                {item.label}
              </Text>
              <Content>{item.content}</Content>
            </Box>
          );
        } else {
          return null;
        }
      })}
    </VStack>
  );
}

export function DiseaseContentSkeletonDesktop() {
  return (
    <>
      <Skeleton height="20px" w="50%" />
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
      <Skeleton height="250px" my={3} />
      <Skeleton height="20px" w="50%" />
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
    </>
  );
}
