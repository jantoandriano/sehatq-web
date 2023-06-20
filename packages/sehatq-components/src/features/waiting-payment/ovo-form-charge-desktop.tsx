import React from "react";
import {
  Text,
  Image,
  VStack,
  Box,
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  HStack,
  Flex,
  Container,
} from "../../user-interfaces";

type OvoFormChargeDesktopProps = {
  isMobile?: boolean;
  totalProductPrice: string;
  total: string;
};

export function OvoFormChargeDesktop(props: OvoFormChargeDesktopProps) {
  const { totalProductPrice, total } = props;
  return (
    <Container maxW="2xl">
      <Flex>
        <Box w="70%" bgColor="main.100" borderRadius="md" padding="4">
          <VStack spacing="4">
            <Text>Anda melakukan pembayaran melalui</Text>

            <Image
              src="https://static.sehatq.com/tokoq/img/ovo.png?v=5"
              width="78px"
              height="23px"
              alt="icon"
            />
          </VStack>

          <VStack
            divider={<StackDivider borderColor="veryLightPink" />}
            spacing="4"
            align="stretch"
            bgColor="white"
            borderRadius="md"
            padding="2"
            marginTop="6"
          >
            <Box>
              <Text fontWeight="bold">Informasi Pembayaran OVO</Text>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontSize="sm">No Telepon</FormLabel>
                <Input
                  border="1px solid"
                  borderRadius="base"
                  fontSize="sm"
                  background="white"
                />
                <FormErrorMessage fontSize="xxs" fontStyle="italic">
                  Invalid
                </FormErrorMessage>
              </FormControl>
            </Box>
          </VStack>
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

        <Box
          boxShadow="base"
          borderRadius="md"
          bgColor="white"
          padding="3"
          flex="1"
          h="70px"
          ml="4"
        >
          <Flex minWidth="max-content" flexDir="column" gap="1">
            <HStack justifyContent="space-between">
              <Text fontSize="xs">Total Harga Produk</Text>
              <Text fontSize="xs">Rp {totalProductPrice}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="xs" fontWeight="bold">
                Total Tagihan
              </Text>
              <Text fontSize="xs" color="red">
                Rp {total}
              </Text>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
