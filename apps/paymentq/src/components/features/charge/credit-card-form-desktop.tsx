import React from "react";
import {
  Stack,
  Box,
  Flex,
  Text,
  useImage,
  Image as ChakraImage,
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
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { InputMask } from "./input-mask";
import { InstallmentDropdown } from "./installment-dropdown";
import { type CreditCardFormProps } from "./credit-card-types";

export function CreditCardFormDesktop(props: CreditCardFormProps) {
  const Image = useImage();
  const handleOnClickArrowBack = () => {
    history.back();
  };
  return (
    <>
      <Box bgColor="main.100" borderRadius="md" padding="4" flexDir="column">
        <Flex justifyContent="space-between" alignItems="center">
          <ArrowBackIcon
            onClick={handleOnClickArrowBack}
            color="main.500"
            cursor="pointer"
          />
          <Text fontSize="md">Anda dapat melakukan pembayaran melalui</Text>
          <Link href="https://toko.sehatq.com/help">
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
            <FormControl isInvalid={Boolean(props.errors?.cardNumber)}>
              <FormLabel fontSize="xs">No Kartu</FormLabel>
              <Input
                borderRadius="base"
                borderBottom="1px solid"
                borderColor="veryLightPink"
                type="text"
                variant="unstyled"
                placeholder="Tulis nomor kartu"
                maxLength={16}
                value={props.values.cardNumber}
                onChange={(e) => {
                  e.preventDefault();
                  props.onChange({ name: "cardNumber", value: e.target.value });
                }}
              />
              <FormErrorMessage fontSize="xxs" fontStyle="italic">
                {props.errors?.cardNumber}
              </FormErrorMessage>
            </FormControl>

            <Flex justifyContent="space-between" gap="6">
              <FormControl isInvalid={Boolean(props.errors?.cardExp)} mt="2">
                <FormLabel fontSize="xs">Tanggal Kadaluarsa</FormLabel>
                <InputMask onChange={props.onChangeExpiredDate} />
                <FormErrorMessage fontSize="xxs" fontStyle="italic">
                  {props.errors?.cardExp}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt="2" isInvalid={Boolean(props.errors?.cardCVV)}>
                <FormLabel display="flex" alignItems="center" fontSize="xs">
                  CVV
                  <QuestionOutlineIcon
                    color="main.500"
                    onClick={props.onToogleCvvInfo}
                    marginLeft="3"
                  />
                </FormLabel>

                <InputGroup>
                  <Input
                    type={props.showCVV ? "text" : "password"}
                    placeholder="Tulis CVV"
                    borderRadius="base"
                    borderBottom="1px solid"
                    borderColor="veryLightPink"
                    variant="unstyled"
                    maxLength={3}
                    value={props.values.cardCVV}
                    onChange={(e) => {
                      e.preventDefault();
                      props.onChange({
                        name: "cardCVV",
                        value: e.target.value,
                      });
                    }}
                  />
                  <InputRightElement mr="5">
                    <Button
                      size="xs"
                      pb="1"
                      variant="unstyled"
                      onClick={props.onShowCVV}
                      _focus={{
                        borderColor: "none",
                      }}
                    >
                      {props.showCVV ? "Hide CVV" : "Show CVV"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage fontSize="xxs" fontStyle="italic">
                  {props.errors?.cardCVV}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl isInvalid={Boolean(props.errors?.personName)} mt="2">
              <FormLabel fontSize="xs">Nama</FormLabel>
              <Input
                borderRadius="base"
                borderBottom="1px solid"
                borderColor="veryLightPink"
                type="text"
                variant="unstyled"
                placeholder="Tulis nama di kartu"
                value={props.values.personName}
                onChange={(e) => {
                  e.preventDefault();
                  props.onChange({ name: "personName", value: e.target.value });
                }}
              />
              <FormErrorMessage fontSize="xxs" fontStyle="italic">
                {props.errors?.personName}
              </FormErrorMessage>
            </FormControl>

            {props.installmentsOptions &&
              props.installmentsOptions.length !== 0 && (
                <FormControl
                  variant="unstyled"
                  isInvalid={Boolean(props.errors?.purchase)}
                >
                  <FormLabel fontSize="xs" mt="2">
                    Pilih Pembayaran
                  </FormLabel>
                  <InstallmentDropdown
                    isMobile={false}
                    options={props.installmentsOptions}
                    inputProps={{
                      width: "50%",
                      background: "none",
                      borderBottom: "1px solid",
                      border: "none",
                    }}
                    placeholder="Penuh/Cicilan"
                    value={props.values.purchase}
                    onChange={props.onChangeChoosePurchase}
                  />
                  <Text fontSize="xxs" color="brownGrey.500">
                    Sudah termasuk biaya layanan
                  </Text>
                  <FormErrorMessage fontSize="xxs" fontStyle="italic">
                    {props.errors?.purchase}
                  </FormErrorMessage>
                </FormControl>
              )}

            <Stack align="center" mt="4">
              <Button
                leftIcon={
                  <Box mr={1}>
                    <ChakraImage
                      src={ASSETS.SECURE_ICON}
                      alt="secure"
                      w="25px"
                      h="25px"
                      align="center"
                    />
                  </Box>
                }
                onClick={props.onSubmit}
                isLoading={props.isLoading3ds}
                fontSize="md"
                height="40px"
                bgColor="squash.500"
                _hover={{ bgColor: "none" }}
              >
                Bayar dengan kartu kredit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
