import React from "react";
import {
  Container,
  Stack,
  Box,
  Flex,
  Text,
  useImage,
  ArrowBackIcon,
  QuestionOutlineIcon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from "../../user-interfaces";
import { InputMask } from "./input-mask";
import { InstallmentDropdown } from "./installment-dropdown";

type CreditCardDesktopProps = {
  showCVV: boolean;
  onShowCVV: () => void;
  onExpiredDate: (params: string) => void;
  onSubmitCrediCard: () => void;
  onChange: (value: string) => void;
};

export function CreditCardDesktop(props: CreditCardDesktopProps) {
  const Image = useImage();

  const { showCVV, onShowCVV, onExpiredDate, onSubmitCrediCard, onChange } =
    props;

  return (
    <Container minW="3xl">
      <Flex gap="4">
        <Box
          bgColor="main.100"
          borderRadius="md"
          padding="4"
          flexDir="column"
          width="60%"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <ArrowBackIcon color="main.500" />
            <Text fontSize="md">Anda dapat melakukan pembayaran melalui</Text>
            <Link>
              <QuestionOutlineIcon color="main.500" />
            </Link>
          </Flex>
          <Flex flexDir="column" alignItems="center" mt="5">
            <Image
              src="https://static.sehatq.com/tokoq/img/cc.png?v=5"
              width={145}
              height={24}
              alt="credit_card_icon"
            />
          </Flex>

          <Box
            border="1px"
            borderColor="veryLightPink"
            borderRadius="md"
            mt="5"
            paddingX="4"
            paddingY="2"
            backgroundColor="white"
          >
            <Text textTransform="capitalize" fontSize="sm" fontWeight="600">
              Detail kartu kredit
            </Text>

            <Box mt="4">
              <FormControl isInvalid>
                <FormLabel fontSize="xs">No Kartu</FormLabel>
                <Input
                  borderRadius="base"
                  borderBottom="1px solid"
                  borderColor="veryLightPink"
                  type="text"
                  variant="unstyled"
                  placeholder="Tulis nomor kartu"
                />
                <FormErrorMessage fontSize="xxs" fontStyle="italic">
                  Nomor kartu belum diisi
                </FormErrorMessage>
              </FormControl>

              <Flex justifyContent="space-between">
                <FormControl isInvalid mt="2">
                  <FormLabel fontSize="xs">Tanggal Kadaluarsa</FormLabel>
                  <InputMask onChange={onExpiredDate} />
                  <FormErrorMessage fontSize="xxs" fontStyle="italic">
                    Tanggal kadaluarsa belum diisi
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="2" isInvalid>
                  <FormLabel fontSize="xs">CVV</FormLabel>

                  <InputGroup>
                    <Input
                      type={showCVV ? "text" : "password"}
                      placeholder="Tulis CVV"
                      borderRadius="base"
                      borderBottom="1px solid"
                      borderColor="veryLightPink"
                      variant="unstyled"
                    />
                    <InputRightElement mr="5">
                      <Button
                        size="xs"
                        pb="1"
                        variant="unstyled"
                        onClick={onShowCVV}
                        _focus={{
                          borderColor: "none",
                        }}
                      >
                        {showCVV ? "Hide CVV" : "Show CVV"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize="xxs" fontStyle="italic">
                    Nomor kartu hanya boleh mengandung angka
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl variant="unstyled">
                <FormLabel fontSize="xs">Pilih Pembayaran</FormLabel>
                <InstallmentDropdown
                  isMobile
                  options={[
                    {
                      name: "Bayar Penuh",
                      amount: "Rp 120.000",
                      value: "full",
                    },
                    {
                      name: "Cicilan",
                      amount: "Rp 10.000",
                      value: "installment",
                    },
                  ]}
                  inputProps={{
                    width: "full",
                    background: "none",
                    borderBottom: "1px solid",
                    border: "none",
                  }}
                  placeholder="Penuh/cicilan"
                  title="Pembayaran"
                  subTitle="Semua jenis pembayaran sudah termasuk biaya layanan"
                  onChange={onChange}
                />
                <Text fontSize="xxs" color="brownGrey.500">
                  Sudah termasuk biaya layanan
                </Text>
                <FormErrorMessage fontSize="xxs" fontStyle="italic">
                  Pembayaran belum dipilih
                </FormErrorMessage>
              </FormControl>

              <Stack align="center" mt="4">
                <Button onClick={onSubmitCrediCard} fontSize="md" height="40px">
                  Bayar dengan kartu kredit
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box
          borderRadius="md"
          backgroundColor="white"
          boxShadow="md"
          height="40%"
        >
          <Stack padding="4">
            <Flex flexDir="row" justifyContent="space-between" gap="1">
              <Text fontSize="xs">Total harga produk</Text>
              <Text fontSize="xs" fontWeight="bold">
                Rp 100.000
              </Text>
            </Flex>
            <Flex flexDir="row" justifyContent="space-between">
              <Text fontSize="xs">Biaya admin</Text>
              <Text fontSize="xs" fontWeight="bold">
                Rp 2.800
              </Text>
            </Flex>
            <Flex flexDir="row" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="bold">
                Total tagihan
              </Text>
              <Text color="red.500" fontSize="xs" fontWeight="bold">
                Rp 100.000
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
