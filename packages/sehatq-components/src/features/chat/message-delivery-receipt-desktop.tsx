import React from "react";
import { MessageReadIcon, MessageDeliveredIcon } from "../../user-interfaces";

export type MessageDeliveryReceiptDesktopProps = {
  readStatus: "unread" | "read";
};

export function MessageDeliveryReceiptDesktop(
  props: MessageDeliveryReceiptDesktopProps
) {
  const { readStatus } = props;
  return readStatus === "read" ? (
    <MessageReadIcon w={5} h={5} />
  ) : (
    <MessageDeliveredIcon w={5} h={5} />
  );
}
