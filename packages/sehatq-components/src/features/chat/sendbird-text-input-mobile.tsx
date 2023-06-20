import React, { FormEvent, ChangeEvent } from "react";
import { Flex, Input, IconButton, FilledSendIcon } from "../../user-interfaces";

export type SendbirdTextInputMobileProps = {
  handleSubmitMessage: (event: FormEvent) => void;
  handleChangeMessage: (event: ChangeEvent<HTMLInputElement>) => void;
  message: string;
  isReplied: boolean;
};

export function SendbirdTextInputMobile(props: SendbirdTextInputMobileProps) {
  const { handleSubmitMessage, handleChangeMessage, message, isReplied } =
    props;
  return (
    <Flex flex="1" align="center" as="form" onSubmit={handleSubmitMessage}>
      <Input
        flex={1}
        borderRadius="base"
        height={10}
        value={message}
        onChange={handleChangeMessage}
        placeholder="Ketik pesan kamu..."
        background={isReplied ? "white" : "#F5F5F5"}
      />
      {message && (
        <IconButton
          type="submit"
          marginLeft={3}
          aria-label="send message"
          variant="fit"
          icon={<FilledSendIcon width="28px" height="28px" />}
        />
      )}
    </Flex>
  );
}
