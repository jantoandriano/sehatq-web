import React from "react";
import { Text, Box, Image, Link, HStack } from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";

function TermsConditionsDesktop() {
  return (
    <Box bgColor="#E9F5FC" p={3} mt={5} borderRadius="8px">
      <HStack align="normal">
        <Box w="60px">
          <Image
            src={ASSETS.INFO_ICON}
            alt="info"
            w="30px"
            h="30px"
            align="center"
          />
        </Box>
        <Box>
          <Text fontSize="11px" color="#175E86">
            Dengan melakukan transaksi ini, saya telah menyetujui{" "}
            <Link
              fontSize="11px"
              color="#175E86"
              fontWeight="bold"
              href="https://www.sehatq.com/syarat"
              isExternal
              display="inline"
            >
              Syarat & Ketentuan SehatQ
            </Link>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default TermsConditionsDesktop;
