import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  IconButton,
  BlueTrashIcon,
  Button,
  useImage,
} from "../../user-interfaces";

export type DeleteForumCommentDesktopProps = {
  onDeleteForum: () => void;
  onClose: () => void;
  onOpen: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isOpen: boolean;
};

export function DeleteForumCommentDesktop(
  props: DeleteForumCommentDesktopProps
) {
  const ASSETS = useAssets(["DELETE_FORUM_COMMENT"]);
  const Image = useImage();
  const { onDeleteForum, onClose, onOpen, isLoading, isSuccess, isOpen } =
    props;

  return (
    <>
      <IconButton
        variant="fit"
        icon={<BlueTrashIcon height="28px" width="28px" />}
        aria-label="Delete forum comment"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={6} paddingTop="60px" paddingBottom={6}>
          <ModalCloseButton
            w={7}
            h={7}
            top={4}
            right={4}
            color="veryLightPink"
          />
          <ModalBody textAlign="center" p={0}>
            {isSuccess ? (
              <>
                <Image
                  src={ASSETS.DELETE_FORUM_COMMENT}
                  width={240}
                  height={240}
                  alt="Delete forum comment"
                />
                <Text
                  fontSize="xl"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginTop={4}
                  marginBottom={5}
                >
                  Komentar Berhasil Dihapus!
                </Text>
                <Button
                  size="lg"
                  isFullWidth
                  onClick={onClose}
                  colorScheme="main"
                  isLoading={isLoading}
                >
                  Kembali ke Forum
                </Button>
              </>
            ) : (
              <>
                <Text
                  fontSize="xl"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginBottom={8}
                >
                  Yakin ingin hapus komentar ini?
                </Text>
                <VStack spacing={1}>
                  <Button
                    size="lg"
                    isFullWidth
                    colorScheme="main"
                    isLoading={isLoading}
                    onClick={onDeleteForum}
                  >
                    Ya, hapus
                  </Button>
                  <Button
                    size="lg"
                    isFullWidth
                    variant="ghost"
                    colorScheme="sea"
                    onClick={onClose}
                    isLoading={isLoading}
                  >
                    Batal
                  </Button>
                </VStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
