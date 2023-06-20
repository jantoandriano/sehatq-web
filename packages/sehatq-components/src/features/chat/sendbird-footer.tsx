import React, { useRef, ChangeEvent, useState } from "react";
import { toBase64 } from "@sehatq/utils";
import { useDisclosure } from "../../user-interfaces";
import { SendbirdFooterDesktop } from "./sendbird-footer-desktop";
import { SendbirdFooterMobile } from "./sendbird-footer-mobile";
import {
  GroupChannel,
  Sendbird,
  useSendSendbirdFile,
} from "./sendbird-queries";

export interface ImagesFileList {
  key: string;
  file: File;
  preview: string;
}

export type SendbirdFooterProps = {
  isMobile?: boolean;
  sendbird?: Sendbird;
  channel?: GroupChannel;
};

export function SendbirdFooter(props: SendbirdFooterProps) {
  const { isMobile, channel, sendbird } = props;
  const [images, setImages] = useState<ImagesFileList | undefined>();
  const refFileInput = useRef<HTMLInputElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate: sendSendbirdFile, isLoading: isUploading } =
    useSendSendbirdFile();

  function addImage() {
    refFileInput.current?.click();
  }

  async function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return;
    }

    const originalFile = event.target.files[0] as File;

    // clear value input
    event.target.value = "";

    // convert to base64
    const fileString = (await toBase64(originalFile)) as string;
    setImages({
      key: `${originalFile.name}-${new Date().getTime()}`,
      file: originalFile,
      preview: fileString,
    });
    onOpen();
  }

  function sendImage() {
    if (images?.file && channel) {
      const consultationId = channel?.url.split("_")[1];
      sendSendbirdFile({
        channel,
        file: images.file,
        thumbnailSizes: [{ maxWidth: 360, maxHeight: 360 }],
        data: JSON.stringify({ consultationId, user_message_type: "image" }),
      });
      onClose();
    }
  }

  const otherProps = {
    channel,
    sendbird,
    addImage,
    sendImage,
    onChangeHandler,
    refFileInput,
    isUploading,
    images,
    isOpen,
    onClose,
  };
  if (isMobile) {
    return <SendbirdFooterMobile {...otherProps} />;
  }
  return <SendbirdFooterDesktop {...otherProps} />;
}
