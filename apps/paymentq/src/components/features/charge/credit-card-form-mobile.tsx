import React from "react";
import {
  QuestionOutlineIcon,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from "@sehatq/components";
import { InputMask } from "./input-mask";
import { InstallmentDropdown } from "./installment-dropdown";
import { type CreditCardFormProps } from "./credit-card-types";

export function CreditCardFormMobile(props: CreditCardFormProps) {
  return (
    <Box
      border="1px"
      borderColor="veryLightPink"
      borderRadius="md"
      mt="5"
      paddingX="4"
      paddingY="5"
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

        <Flex justifyContent="space-between" gap="5">
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
              <Link>
                <QuestionOutlineIcon
                  color="main.500"
                  onClick={props.onToogleCvvInfo}
                />
              </Link>
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
                  props.onChange({ name: "cardCVV", value: e.target.value });
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

        <FormControl isInvalid={Boolean(props.errors?.personName)}>
          <FormLabel fontSize="xs" mt="2">
            Nama
          </FormLabel>
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

        {props.installmentsOptions && props.installmentsOptions.length !== 0 && (
          <FormControl
            variant="unstyled"
            isInvalid={Boolean(props.errors?.purchase)}
          >
            <FormLabel fontSize="xs" mt="2">
              Pilih Pembayaran
            </FormLabel>
            <InstallmentDropdown
              value={props.values.purchase}
              isMobile
              options={props.installmentsOptions}
              inputProps={{
                width: "full",
                background: "none",
                borderBottom: "1px solid",
                border: "none",
              }}
              placeholder="Penuh/cicilan"
              title="Pembayaran"
              subTitle="Semua jenis pembayaran sudah termasuk biaya layanan"
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
      </Box>
    </Box>
  );
}
