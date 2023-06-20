import React from "react";
import { Flex, Box, Text, useImage, NoteIcon } from "../../user-interfaces";
import { BubbleContainer } from "../chat/bubble-container";
import { TextBubble } from "../chat/text-bubble";

export type ConsultationIntroDesktopProps = {
  symptom: string;
  startedAt: string;
  patientName: string;
  doctor: {
    name: string;
    imageUrl: string;
  };
};

export function ConsultationIntroDesktop(props: ConsultationIntroDesktopProps) {
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
            <Text fontFamily="poppins" fontWeight="bold" fontSize="md">
              Keluhan Pasien
            </Text>
          </Flex>
          <Text fontSize="sm">{symptom}</Text>
        </Box>
      </Box>
      <Flex paddingX={5} paddingTop={5} paddingBottom={3}>
        <Flex
          paddingY={1}
          paddingRight={5}
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
              width: "40px",
              height: "40px",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Text marginLeft={3} fontSize="md">
            {doctor.name} bergabung dalam chat
          </Text>
        </Flex>
      </Flex>
      <BubbleContainer
        isMobile={false}
        type="sender"
        messageType="text"
        messageTime={startedAt}
      >
        <TextBubble
          isMobile={false}
          type="sender"
          messageText={`Hi ${patientName}, saya ${doctor.name} ada yang bisa saya bantu?`}
        />
      </BubbleContainer>
    </>
  );
}
