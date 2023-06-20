import { ASSETS } from "@sehatq/constants";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type PrescriptionImageExampleGeneralProps = {
  tutorials: string[];
};

export function PrescriptionImageExampleDesktop(
  props: PrescriptionImageExampleGeneralProps
) {
  const Image = useImage();
  return (
    <Flex
      direction="column"
      width="full"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      p={6}
    >
      <Text
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
      >
        Contoh Upload Resep
      </Text>
      <Image
        alt="prescription-example"
        src={ASSETS.PRESCRIPTION_EXAMPLE}
        layout="fixed"
        width={314}
        height={398}
        wrapperProps={{
          alignSelf: "center",
          my: 4,
        }}
      />
      <Text
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
      >
        Cara Upload Resep
      </Text>
      <VStack
        mt={3}
        align="start"
        border="0.5px solid"
        borderColor="veryLightPink"
        borderRadius="base"
        p={3}
      >
        {props.tutorials.map((tutorial) => (
          <HStack align="start" key={tutorial}>
            <Box
              background="sea.500"
              borderRadius="full"
              boxSize="5px"
              minW="5px"
              minH="5px"
              mt="7px"
            ></Box>
            <Text color="charcoalGrey" fontSize="xs">
              {tutorial}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
}
