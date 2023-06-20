import React from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Button, HStack, Text, VStack } from "../../user-interfaces";

interface Props {
  email: string;
  errorMsg: string;
  isLastRetryOtp: boolean;
  isVerifying: boolean;
  duration: {
    inSeconds: number;
    formatted: string;
  };
  otpValues: string;
  resendOtp: () => void;
  verifyOtp: () => void;
  changeOtp: (val: string) => void;
}

export function OTPEmailMobile({
  email,
  duration,
  errorMsg,
  isLastRetryOtp,
  isVerifying,
  otpValues,
  resendOtp,
  verifyOtp,
  changeOtp,
}: Props) {
  return (
    <VStack bgColor="white" pt="24" px="7" justifyContent="space-between">
      <Text fontSize="md" textAlign="center" mb="8">
        Masukkan 4 digit kode verifikasi (OTP) yang dikirimkan ke email{" "}
        <strong>{email}</strong>
      </Text>
      <VStack pb="10">
        <HStack spacing="3">
          <PinInput value={otpValues} onChange={changeOtp}>
            <PinInputField
              bgColor="iceBlue.500"
              color="sea.500"
              fontWeight="bold"
              fontSize="9xl"
              w="54px"
              h="65px"
            />
            <PinInputField
              bgColor="iceBlue.500"
              color="sea.500"
              fontWeight="bold"
              fontSize="9xl"
              w="54px"
              h="65px"
            />
            <PinInputField
              bgColor="iceBlue.500"
              color="sea.500"
              fontWeight="bold"
              fontSize="9xl"
              w="54px"
              h="65px"
            />
            <PinInputField
              bgColor="iceBlue.500"
              color="sea.500"
              fontWeight="bold"
              fontSize="9xl"
              w="54px"
              h="65px"
            />
          </PinInput>
        </HStack>
        <Text color="cherry.500" fontSize="xs" textAlign="center" minH="18px">
          {errorMsg}
        </Text>
      </VStack>
      <VStack w="full" spacing="1">
        <Button
          w="full"
          py="6"
          _focus={{ outline: "none" }}
          onClick={verifyOtp}
          disabled={otpValues.length < 4}
          isLoading={isVerifying}
        >
          Lanjutkan
        </Button>
        {duration.inSeconds > 0 ? (
          <Button
            variant="ghost"
            color="brownGrey.500"
            fontWeight="normal"
            _focus={{ outline: "none" }}
          >
            Kirim Ulang {duration.formatted}
          </Button>
        ) : (
          <Button
            variant="ghost"
            _focus={{ outline: "none" }}
            onClick={resendOtp}
            disabled={isLastRetryOtp}
          >
            Kirim Ulang
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
