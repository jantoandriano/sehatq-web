import React from "react";
import { MessageReadIcon, MessageDeliveredIcon } from "../../user-interfaces";

export type MessageDeliveryReceiptMobileProps = {
  readStatus: "unread" | "read";
};

export function MessageDeliveryReceiptMobile(
  props: MessageDeliveryReceiptMobileProps
) {
  const { readStatus } = props;
  return readStatus === "read" ? (
    <MessageReadIcon w={4} h={4} />
  ) : (
    <MessageDeliveredIcon w={4} h={4} />
  );
}
