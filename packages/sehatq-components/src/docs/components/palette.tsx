import React from "react";
import { Box, Text, SimpleGrid, Flex } from "../../user-interfaces";
import { theme } from "../../user-interfaces/theme";

export function Palette(props: { name: string }) {
  return (
    <SimpleGrid columns={3} spacing={3}>
      {Object.keys(theme.colors[props.name])
        .map((range) => (
          <Flex key={range} align="center">
            <Box
              width="50px"
              height="50px"
              borderRadius={4}
              background={`${props.name}.${range}`}
              boxShadow="inner"
              marginRight={3}
            />
            <Box color={range === "500" ? undefined : "brownGrey.500"}>
              <Text fontSize="xs" fontFamily="heading" fontWeight="semibold">
                {props.name}.{range}
              </Text>
              <Text fontSize="xs">{theme.colors[props.name][range]}</Text>
            </Box>
          </Flex>
        ))
        .reverse()}
    </SimpleGrid>
  );
}
