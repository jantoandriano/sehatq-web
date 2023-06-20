import React, { RefObject, ChangeEvent } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  PlusCircleIcon,
} from "../../user-interfaces";
import { SendbirdTextInput } from "./sendbird-text-input";
import { SendbirdRepliedMessage } from "./sendbird-replied-message";
import { GroupChannel, Sendbird } from "./sendbird-queries";
import { PreviewImageGalleryPopup } from "./preview-image-gallery-popup";

export type SendbirdFooterDesktopProps = {
  channel?: GroupChannel;
  sendbird?: Sendbird;
  addImage: () => void;
  refFileInput: RefObject<HTMLInputElement>;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  sendImage: () => void;
  isUploading: boolean;
  images?: {
    key: string;
    file: File;
    preview: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export function SendbirdFooterDesktop(props: SendbirdFooterDesktopProps) {
  const {
    channel,
    sendbird,
    onChangeHandler,
    addImage,
    refFileInput,
    isUploading,
    images,
    isOpen,
    onClose,
    sendImage,
  } = props;
  return (
    <Box zIndex="1" boxShadow="0 -2px 12px 0 rgba(42, 83, 83, 0.1)">
      <SendbirdRepliedMessage sendbird={sendbird} />
      <Flex align="center" background="white" paddingX={5} paddingY={3}>
        <Input
          type="file"
          display="none"
          accept="image/*"
          aria-hidden="true"
          ref={refFileInput}
          onChange={onChangeHandler}
        />
        <IconButton
          variant="fit"
          aria-label="send image"
          onClick={addImage}
          marginRight={3}
          icon={<PlusCircleIcon width="40px" height="40px" />}
          isLoading={isUploading}
        />
        <SendbirdTextInput channel={channel} />
      </Flex>
      <PreviewImageGalleryPopup
        isOpen={isOpen}
        onClose={onClose}
        images={images}
        addImage={addImage}
        sendImage={sendImage}
        isLoading={isUploading}
      />
    </Box>
  );
}
