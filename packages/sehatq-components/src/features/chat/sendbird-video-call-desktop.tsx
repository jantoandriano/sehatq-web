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

export type SendbirdVideoCallDesktopProps = {
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

export function SendbirdVideoCallDesktop(props: SendbirdVideoCallDesktopProps) {
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
          icon={<VideoCameraIcon width="40px" height="40px" />}
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
              <Flex align="center" paddingX={6} paddingY={3} zIndex="1">
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
                <Box flex="1" marginLeft={3}>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="md"
                    lineHeight="normal"
                    color="white"
                  >
                    {doctor.name}
                  </Text>
                  <Text
                    fontSize="sm"
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
                right="24px"
                top="12px"
                width="25vw"
                height="25vh"
                sx={{
                  video: {
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "lg",
                    boxShadow: "blue-base",
                  },
                }}
              >
                <video autoPlay ref={setLocalMediaView} />
              </Box>
              <IconButton
                position="absolute"
                bottom={14}
                left="50%"
                transform="translateX(-50%)"
                variant="fit"
                aria-label="End Call"
                onClick={end}
                icon={<EndCallIcon height={14} width={14} />}
              />
            </>
          ) : (
            <Flex
              marginX="auto"
              width="100vw"
              height="100vh"
              align="center"
              justify="center"
            >
              <Box
                width="min(70%, 720px)"
                marginRight="max(10%, 40px)"
                sx={{
                  video: {
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "lg",
                    boxShadow: "base",
                  },
                }}
              >
                <video autoPlay ref={setLocalMediaView} />
              </Box>
              <Flex direction="column" align="center">
                <Image
                  alt="sehatq logo"
                  src={ASSETS.SEHATQ_WITH_TEXT}
                  width={110}
                  height={24}
                  layout="fixed"
                  wrapperProps={{
                    marginBottom: "30px",
                  }}
                />
                <Image
                  alt="doctor"
                  src={doctor.imageUrl}
                  layout="fill"
                  objectFit="contain"
                  wrapperProps={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "40px",
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
                <Text color="brownGrey.500" fontSize="sm" marginBottom="30px">
                  {doctor.speciality}
                </Text>
                {type === "calling" ? (
                  <Text fontWeight="semibold">Berdering</Text>
                ) : type === "ringing" ? (
                  <Text fontWeight="semibold">Panggilan Video</Text>
                ) : null}
                <Spinner />
                <Flex
                  align="center"
                  justify="center"
                  width="100%"
                  marginTop="20px"
                >
                  <IconButton
                    variant="fit"
                    aria-label="End Call"
                    onClick={end}
                    icon={<EndCallIcon height={12} width={12} />}
                  />
                  {type === "ringing" ? (
                    <IconButton
                      variant="fit"
                      marginLeft="20px"
                      aria-label="Accept Call"
                      onClick={accept}
                      icon={<AcceptCallIcon height={12} width={12} />}
                    />
                  ) : null}
                </Flex>
              </Flex>
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
