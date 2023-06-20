import React from "react";
import { Box, Flex, Text, Image } from "@sehatq/components";

export function ConsultationBanner() {
  return (
    <Box padding={3} marginBottom={5} borderRadius="xl" boxShadow="base">
      <Flex>
        <Image
          alt="Dokter Umum"
          src="/images/regular-telemed-photo.jpeg"
          objectFit="cover"
          boxSize="68px"
          borderRadius="50%"
        />
        <Box>
          <Box paddingLeft={3}>
            <Text fontSize="15px" fontWeight="semibold" fontFamily="poppins">
              Konsultasi Dokter Umum
            </Text>
            <Text fontSize="15px" color="sea.500" marginBottom={1}>
              Dokter Umum
            </Text>
            <Box
              display="inline-block"
              backgroundColor="shamrock.500"
              borderRadius={5}
              paddingY={1}
              paddingX={4}
            >
              <Text
                color="white"
                fontSize="xs"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                Online
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
