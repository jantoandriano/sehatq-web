import React, { FormEvent, ChangeEvent } from "react";
import { Flex, Input, IconButton, FilledSendIcon } from "../../user-interfaces";

export type SendbirdTextInputDesktopProps = {
  handleSubmitMessage: (event: FormEvent) => void;
  handleChangeMessage: (event: ChangeEvent<HTMLInputElement>) => void;
  message: string;
  isReplied: boolean;
};

export function SendbirdTextInputDesktop(props: SendbirdTextInputDesktopProps) {
  const { handleSubmitMessage, handleChangeMessage, message, isReplied } =
    props;
  return (
    <Flex flex="1" align="center" as="form" onSubmit={handleSubmitMessage}>
      <Input
        flex={1}
        borderRadius="base"
        height={12}
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
          icon={<FilledSendIcon width="40px" height="40px" />}
        />
      )}
    </Flex>
  );
}
