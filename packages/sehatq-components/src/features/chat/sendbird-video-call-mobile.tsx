import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  IconButton,
  VideoCameraIcon,
  AcceptCallIcon,
  EndCallIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Text,
  useImage,
  Flex,
} from "../../user-interfaces";
import { Spinner } from "../general";

export type SendbirdVideoCallMobileProps = {
  isOpen: boolean;
  end: () => void;
  dial: () => void;
  accept: () => void;
  doctor: {
    name: string;
    imageUrl: string;
    speciality: string;
  };
  isConnected: boolean;
  type: "calling" | "ringing" | null;
  setLocalMediaView?: (node: HTMLMediaElement | null) => void;
  setRemoteMediaView?: (node: HTMLMediaElement | null) => void;
  canVideoCall?: boolean;
};

export function SendbirdVideoCallMobile(props: SendbirdVideoCallMobileProps) {
  const {
    dial,
    accept,
    end,
    isOpen,
    doctor,
    setLocalMediaView,
    setRemoteMediaView,
    isConnected,
    type,
    canVideoCall,
  } = props;
  const ASSETS = useAssets(["SEHATQ_WITH_TEXT"]);
  const Image = useImage();

  return (
    <>
      {canVideoCall ? (
        <IconButton
          variant="fit"
          aria-label="make a video call"
          onClick={dial}
          icon={<VideoCameraIcon width="28px" height="28px" />}
        />
      ) : null}
      <Modal size="full" isOpen={isOpen} onClose={end}>
        <ModalOverlay />
        <ModalContent
          borderRadius="none"
          background={isConnected ? "charcoalGrey" : "white"}
        >
          {isConnected ? (
            <>
              <Flex
                align="center"
                padding={4}
                zIndex="1"
                width="calc(75vw - 16px)"
              >
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  layout="fill"
                  objectFit="contain"
                  wrapperProps={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "full",
                    overflow: "hidden",
                  }}
                />
                <Box flex="1" marginLeft={3}>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="sm"
                    lineHeight="normal"
                    color="white"
                  >
                    {doctor.name}
                  </Text>
                  <Text
                    fontSize="xs"
                    lineHeight="normal"
                    fontWeight="medium"
                    color="white"
                  >
                    {doctor.speciality}
                  </Text>
                </Box>
              </Flex>
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                sx={{
                  video: {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  },
                }}
              >
                <video autoPlay ref={setRemoteMediaView} />
              </Box>
              <Box
                position="absolute"
                right="16px"
                top="16px"
                width="25vw"
                height="25vh"
                sx={{
                  video: {
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "lg",
                    boxShadow: "blue-base",
                  },
                }}
              >
                <video autoPlay ref={setLocalMediaView} />
              </Box>
            </>
          ) : (
            <Flex
              width="100%"
              direction="column"
              align="center"
              paddingY="44px"
            >
              <Image
                alt="sehatq logo"
                src={ASSETS.SEHATQ_WITH_TEXT}
                width={110}
                height={24}
                layout="fixed"
                wrapperProps={{
                  marginBottom: "60px",
                }}
              />
              <Image
                alt="doctor"
                src={doctor.imageUrl}
                layout="fill"
                objectFit="contain"
                wrapperProps={{
                  width: "106px",
                  height: "106px",
                  borderRadius: "53px",
                  overflow: "hidden",
                  marginBottom: "20px",
                  boxShadow: "base",
                }}
              />
              <Text
                fontSize="xl"
                fontFamily="poppins"
                fontWeight="semibold"
                marginBottom="6px"
                textAlign="center"
              >
                {doctor.name}
              </Text>
              <Text color="brownGrey.500" fontSize="sm" marginBottom="92px">
                {doctor.speciality}
              </Text>
              {type === "calling" ? (
                <Text fontWeight="semibold">Berdering</Text>
              ) : type === "ringing" ? (
                <Text fontWeight="semibold">Panggilan Video</Text>
              ) : null}
              <Spinner />
            </Flex>
          )}
          <Flex
            position="absolute"
            bottom={14}
            align="center"
            justify="center"
            width="100%"
          >
            <IconButton
              variant="fit"
              aria-label="End Call"
              onClick={end}
              icon={<EndCallIcon height={14} width={14} />}
            />
            {!isConnected && type === "ringing" ? (
              <IconButton
                variant="fit"
                marginLeft="50px"
                aria-label="Accept Call"
                onClick={accept}
                icon={<AcceptCallIcon height={14} width={14} />}
              />
            ) : null}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
