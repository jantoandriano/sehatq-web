import React from "react";
import { HStack, Text, Flex } from "@sehatq/components";

import { ModalConfirm } from "./modal-confirm";

type CountdownTimerMobileProps = {
  hours: string;
  minutes: string;
  seconds: string;
  stateModal: { visible: boolean; title: string };
  onToogleModal: () => void;
};

function renderBoxTime(time: string) {
  return (
    <Flex
      bgColor="white"
      h={5}
      w={5}
      borderRadius="md"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xxs" color="squash.500" fontWeight="semibold">
        {time}
      </Text>
    </Flex>
  );
}

export function CountdownTimerMobile(props: CountdownTimerMobileProps) {
  const { hours, minutes, seconds, stateModal, onToogleModal } = props;
  return (
    <>
      <Flex
        bgColor="squash.500"
        height={10}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="xs" textAlign="center" color="white">
          Selesaikan pembayaran dalam
        </Text>
        <HStack
          spacing={2}
          ml={2}
          divider={
            <Text fontSize="xxs" color="white" fontWeight="bold" mx={1}>
              :
            </Text>
          }
        >
          {renderBoxTime(hours)}
          {renderBoxTime(minutes)}
          {renderBoxTime(seconds)}
        </HStack>
      </Flex>
      <ModalConfirm
        isOpen={stateModal.visible}
        title={stateModal.title}
        onCancel={onToogleModal}
        cancelText="OK"
      />
    </>
  );
}
