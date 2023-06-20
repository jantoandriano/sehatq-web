import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  Text,
  BlueTrashIcon,
  IconButton,
  Button,
  useImage,
} from "../../user-interfaces";

export type DeleteForumCommentMobileProps = {
  onDeleteForum: () => void;
  onClose: () => void;
  onOpen: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isOpen: boolean;
};

export function DeleteForumCommentMobile(props: DeleteForumCommentMobileProps) {
  const ASSETS = useAssets(["DELETE_FORUM_COMMENT"]);
  const Image = useImage();
  const { onDeleteForum, onClose, onOpen, isLoading, isSuccess, isOpen } =
    props;

  return (
    <>
      <IconButton
        variant="fit"
        icon={<BlueTrashIcon height="24px" width="24px" />}
        aria-label="Delete forum comment"
        onClick={onOpen}
      />
      <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent py="4" px="6" borderTopRadius="lg">
          <DrawerBody p="0" textAlign="center">
            {isSuccess ? (
              <>
                <Image
                  src={ASSETS.DELETE_FORUM_COMMENT}
                  width={220}
                  height={220}
                  alt="Delete forum comment"
                />
                <Text
                  fontSize="lg"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginTop={4}
                  marginBottom={8}
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
                  fontSize="md"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginY={5}
                >
                  Yakin ingin hapus komentar ini?
                </Text>
                <VStack>
                  <Button
                    isFullWidth
                    colorScheme="main"
                    isLoading={isLoading}
                    onClick={onDeleteForum}
                  >
                    Ya, hapus
                  </Button>
                  <Button
                    isFullWidth
                    variant="ghost"
                    onClick={onClose}
                    isLoading={isLoading}
                  >
                    Batal
                  </Button>
                </VStack>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
