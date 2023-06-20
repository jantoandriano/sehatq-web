import React from "react";
import {
  Text,
  useImage,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  VStack,
  Stack,
  Button,
} from "../../user-interfaces";

type OvoFormChargeMobileProps = {
  isMobile?: boolean;
  totalProductPrice: string;
  total: string;
};

export function OvoFormChargeMobile(props: OvoFormChargeMobileProps) {
  const { totalProductPrice, total } = props;

  const Image = useImage();
  return (
    <Container
      maxW="sm"
      paddingX="4"
      paddingY="2"
      borderRadius="lg"
      marginTop="3"
      boxShadow="base"
      bgColor="white"
    >
      <Box height="80vh">
        <VStack spacing="4">
          <Text>Anda melakukan pembayaran melalui</Text>
          <Image
            src="https://static.sehatq.com/tokoq/img/ovo.png?v=5"
            width={78}
            height={24}
            alt="icon"
          />
        </VStack>
        <FormControl marginTop="4">
          <FormLabel fontSize="sm">No Telepon</FormLabel>
          <Input
            border="1px solid"
            borderRadius="base"
            fontSize="sm"
            background="white"
            placeholder="No Telepon"
          />
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            Invalid
          </FormErrorMessage>
        </FormControl>
        <Box
          border="1px"
          borderColor="veryLightPink"
          marginTop="4"
          borderRadius="md"
        >
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  textAlign="left"
                >
                  <Text fontFamily="poppins" fontSize="sm" fontWeight="bold">
                    Total Tagihan
                  </Text>
                  <Text fontFamily="poppins" fontSize="md" color="red.500">
                    Rp {totalProductPrice}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  textAlign="left"
                >
                  <Text fontSize="xs" fontWeight="hairline">
                    Total Harga Produk
                  </Text>
                  <Text fontSize="xs" fontWeight="medium">
                    Rp {total}
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
      <Box>
        <Stack align="stretch" marginTop="3">
          <Button
            bgColor="squash.500"
            color="white"
            _hover={{
              bgColor: "squash.400",
            }}
          >
            Bayar Dengan Ovo
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
