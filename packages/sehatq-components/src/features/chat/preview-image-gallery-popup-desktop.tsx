import React from "react";
import {
  HStack,
  Button,
  useImage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "../../user-interfaces";

export type PreviewImageGalleryPopupDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  images?: {
    key: string;
    file: File;
    preview: string;
  };
  addImage: () => void;
  sendImage: () => void;
  isLoading: boolean;
};

export function PreviewImageGalleryPopupDesktop(
  props: PreviewImageGalleryPopupDesktopProps
) {
  const { isOpen, onClose, images, addImage, sendImage, isLoading } = props;
  const Image = useImage();

  return (
    <Modal
      isOpen={isOpen}
      size="4xl"
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="sm"
          lineHeight={5}
          boxShadow="base"
          p={3.5}
        >
          Kirim Gambar
        </ModalHeader>
        <ModalCloseButton border="none" color="main.500" size="md" />
        <ModalBody px={0} py={5}>
          {images && (
            <Image
              src={images.preview}
              alt={`image-upload-${images.key}`}
              layout="fill"
              objectFit="contain"
              priority
              wrapperProps={{
                width: "full",
                height: "300px",
                overflow: "hidden",
                borderRadius: "base",
              }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3} width="full">
            <Button
              variant="outline"
              color="sea.500"
              borderColor="main.500"
              width="full"
              height="48px"
              fontSize="md"
              borderRadius="base"
              onClick={addImage}
            >
              Pilih Ulang
            </Button>
            <Button
              variant="solid"
              colorScheme="main"
              width="full"
              height="48px"
              fontSize="md"
              borderRadius="base"
              onClick={sendImage}
              isLoading={isLoading}
            >
              Kirim
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
