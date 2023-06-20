import React from "react";
import {
  ArrowBackIcon,
  QuestionIcon,
  Text,
  Box,
  Spacer,
  Image,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
} from "../../user-interfaces";
import { InputMask } from "./input-mask";
import { InstallmentDropdown } from "./installment-dropdown";

type CreditCardMobileProps = {
  showCVV: boolean;
  onShowCVV: () => void;
  onExpiredDate: (params: string) => void;
  onSubmitCrediCard: () => void;
};

export function CreditCardMobile(props: CreditCardMobileProps) {
  const { showCVV, onShowCVV, onExpiredDate, onSubmitCrediCard } = props;

  function handleChange(params: any) {
    console.log("handleChange", params);
  }

  return (
    <>
      <Flex flexDir="row" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ArrowBackIcon color="main.500" />
          <Text ml="3" fontSize="md" fontWeight="600">
            Pembayaran
          </Text>
        </Box>
        <Spacer />
        <QuestionIcon bgColor="white" color="main.500" />
      </Flex>

      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mt="5"
      >
        <Text fontSize="sm">Anda melakukan pembayaran melalui</Text>
        <Image
          src="https://static.sehatq.com/tokoq/img/cc.png?v=5"
          alt="cc_icons"
          height="24px"
          width={145}
          objectFit="contain"
          mt="5"
        />
      </Box>

      <Box border="1px" borderColor="veryLightPink" borderRadius="md" mt="5">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <Box borderBottom="1px solid" borderColor="veryLightPink">
              <AccordionButton>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flex="1"
                  textAlign="left"
                >
                  <Text fontSize="sm" fontWeight="600">
                    Total Tagihan
                  </Text>
                  <Text fontFamily="poppins" fontSize="md" color="red.500">
                    Rp 100.000
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Box>
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
                  Rp 100.000
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flex="1"
                textAlign="left"
              >
                <Text fontSize="xs" fontWeight="hairline">
                  Biaya Admin
                </Text>
                <Text fontSize="xs" fontWeight="medium">
                  Rp 5.600
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box
        border="1px"
        borderColor="veryLightPink"
        borderRadius="md"
        mt="5"
        paddingX="4"
        paddingY="2"
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
              onChange={handleChange}
            />
            <Text fontSize="xxs" color="brownGrey.500">
              Sudah termasuk biaya layanan
            </Text>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              Pembayaran belum dipilih
            </FormErrorMessage>
          </FormControl>
        </Box>
      </Box>

      <Stack align="stretch" mt="4">
        <Button fontSize="sm" onClick={onSubmitCrediCard}>
          Konfirmasi Pembayaran
        </Button>
      </Stack>
    </>
  );
}
