import React from "react";
import Image from "next/image";
import { Box, Text } from "@sehatq/components";

export function ProcessPrescription() {
  return (
    <Box p="36px 24px" textAlign="center">
      <Box>
        <Image
          src="/images/logo-sehatq-with-text.svg"
          width={160}
          height={45}
        />
      </Box>
      <Box mt="42px" mb="28px">
        <Image
          src="/images/prescription-onprocess.svg"
          width={250}
          height={250}
        />
      </Box>
      <Text mb="12px" fontFamily="poppins" fontWeight="semibold">
        Resepmu Sedang Diproses
      </Text>
      <Text fontWeight="light" fontSize="sm">
        Enggak lama kok, maksimal 15 menit. Lalu kamu bisa cek emailmu untuk
        klaim resep obatnya.
      </Text>
    </Box>
  );
}
