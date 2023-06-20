import React from "react";
import { HStack, Text, Flex } from "@sehatq/components";

import { ModalConfirm } from "./modal-confirm";

type CountdownTimerDesktopProps = {
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
      h={8}
      w={8}
      borderRadius="md"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="squash.500" fontWeight="semibold">
        {time}
      </Text>
    </Flex>
  );
}

export function CountdownTimerDesktop(props: CountdownTimerDesktopProps) {
  const { hours, minutes, seconds, stateModal, onToogleModal } = props;
  return (
    <>
      <Flex
        bgColor="squash.500"
        height={14}
        justifyContent="center"
        alignItems="center"
      >
        <Text textAlign="center" color="white">
          Selesaikan pembayaran dalam
        </Text>
        <HStack
          spacing={2}
          ml={3}
          divider={
            <Text color="white" fontWeight="bold" mx={1}>
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
