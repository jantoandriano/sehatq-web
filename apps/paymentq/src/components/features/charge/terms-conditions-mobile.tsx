import React from "react";
import { Text, Box, Image, Link, HStack } from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";

function TermsConditionsMobile() {
  return (
    <Box bgColor="#E9F5FC" p={3} my={5} borderRadius="8px">
      <HStack align="normal">
        <Box w="50px">
          <Image
            src={ASSETS.INFO_ICON}
            alt="info"
            w="30px"
            h="30px"
            align="center"
          />
        </Box>
        <Box>
          <Text fontSize="12px" color="#175E86">
            Dengan melakukan transaksi ini, saya telah menyetujui{" "}
            <Text as="span">
              <Link
                fontSize="12px"
                fontWeight="bold"
                color="#175E86"
                href="https://www.sehatq.com/syarat"
                isExternal
              >
                Syarat & Ketentuan SehatQ
              </Link>
            </Text>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default TermsConditionsMobile;
