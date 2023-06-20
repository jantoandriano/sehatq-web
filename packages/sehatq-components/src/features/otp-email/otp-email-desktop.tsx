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

export function OTPEmailDesktop({
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
    <VStack
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      borderRadius="xl"
      w="container.sm"
      h="sm"
      bgColor="white"
      px="14"
      py="9"
      justifyContent="space-between"
    >
      <Text fontSize="lg" textAlign="center">
        Masukkan 4 digit kode verifikasi (OTP) yang dikirimkan ke email{" "}
        <strong>{email}</strong>
      </Text>
      <VStack>
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
        <Text color="cherry.500" fontSize="xs" textAlign="center">
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
