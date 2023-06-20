import React from "react";
import { Flex, Box, Text, NoteIcon, useImage } from "../../user-interfaces";
import { BubbleContainer } from "../chat/bubble-container";
import { TextBubble } from "../chat/text-bubble";

export type ConsultationIntroMobileProps = {
  symptom: string;
  startedAt: string;
  patientName: string;
  doctor: {
    name: string;
    imageUrl: string;
  };
};

export function ConsultationIntroMobile(props: ConsultationIntroMobileProps) {
  const { symptom, doctor, startedAt, patientName } = props;
  const Image = useImage();

  return (
    <>
      <Box paddingX={5} paddingTop={1.5}>
        <Box
          borderRadius="lg"
          paddingY={4}
          paddingX={3}
          border="0.5px solid"
          borderColor="veryLightPink"
          backgroundColor="white"
        >
          <Flex align="center" marginBottom={2}>
            <NoteIcon size="16px" height="16px" marginRight={2} />
            <Text fontFamily="poppins" fontWeight="bold" fontSize="sm">
              Keluhan Pasien
            </Text>
          </Flex>
          <Text fontSize="xs">{symptom}</Text>
        </Box>
      </Box>
      <Flex justify="center" paddingTop={4} paddingBottom={2}>
        <Flex
          paddingY={1}
          paddingRight={3.5}
          paddingLeft={1.5}
          align="center"
          borderRadius="full"
          background="paleBlue.500"
        >
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              width: "24px",
              height: "24px",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Text marginLeft={2} fontSize="xxs">
            {doctor.name} bergabung dalam chat
          </Text>
        </Flex>
      </Flex>
      <BubbleContainer
        isMobile
        type="sender"
        messageType="text"
        messageTime={startedAt}
      >
        <TextBubble
          isMobile
          type="sender"
          messageText={`Hi ${patientName}, saya ${doctor.name} ada yang bisa saya bantu?`}
        />
      </BubbleContainer>
    </>
  );
}
