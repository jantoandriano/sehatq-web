import React, { RefObject, ChangeEvent } from "react";
import {
  Box,
  Flex,
  IconButton,
  PlusCircleIcon,
  Input,
} from "../../user-interfaces";
import { SendbirdTextInput } from "./sendbird-text-input";
import { SendbirdRepliedMessage } from "./sendbird-replied-message";
import { GroupChannel, Sendbird } from "./sendbird-queries";
import { PreviewImageGalleryPopup } from "./preview-image-gallery-popup";

export type SendbirdFooterMobileProps = {
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

export function SendbirdFooterMobile(props: SendbirdFooterMobileProps) {
  const {
    channel,
    sendbird,
    onChangeHandler,
    sendImage,
    addImage,
    refFileInput,
    isUploading,
    images,
    isOpen,
    onClose,
  } = props;
  return (
    <Box zIndex="1" boxShadow="0 0 8px 0 rgba(0, 0, 0, 0.1)">
      <SendbirdRepliedMessage isMobile sendbird={sendbird} />
      <Flex align="center" background="white" padding={3}>
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
          icon={<PlusCircleIcon boxSize="28px" />}
        />
        <SendbirdTextInput isMobile channel={channel} />
      </Flex>
      <PreviewImageGalleryPopup
        isMobile
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
