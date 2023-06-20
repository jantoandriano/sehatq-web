import React from "react";
import {
  HStack,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  Button,
  IconButton,
  ArrowBackIcon,
  useImage,
} from "../../user-interfaces";

export type PreviewImageGalleryPopupMobileProps = {
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

export function PreviewImageGalleryPopupMobile(
  props: PreviewImageGalleryPopupMobileProps
) {
  const { isOpen, onClose, images, addImage, sendImage, isLoading } = props;
  const Image = useImage();
  return (
    <>
      <Drawer isOpen={isOpen} size="full" onClose={onClose} trapFocus={false}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              lineHeight={5}
              boxShadow="base"
              p={3.5}
            >
              <IconButton
                aria-label="back button"
                onClick={onClose}
                variant="fit"
                colorScheme="sea"
                mr={2}
                icon={<ArrowBackIcon w={6} h={6} color="sea.600" />}
              />
              Kirim Gambar
            </DrawerHeader>
            <DrawerBody px={0} py={5}>
              {images && (
                <Image
                  src={images.preview}
                  alt={`image-upload-${images.key}`}
                  layout="fill"
                  objectFit="contain"
                  priority
                  wrapperProps={{
                    width: "full",
                    height: "full",
                    overflow: "hidden",
                    borderRadius: "base",
                  }}
                />
              )}
            </DrawerBody>
            <DrawerFooter boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)">
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
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
