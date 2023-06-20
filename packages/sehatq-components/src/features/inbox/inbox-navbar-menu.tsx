import { useNavigation } from "@sehatq/utils";
import React from "react";
import { InboxNavbarMenuDesktop } from "./inbox-navbar-menu-desktop";
import { InboxCounterCache, useGetInboxCounter } from "./inbox-queries";

function selectCounter(counter: InboxCounterCache) {
  if (counter > 999) return "999+";

  return `${counter !== 0 ? counter : ""}`;
}
export function InboxNavbarMenu() {
  const { data: inboxCounter = "" } = useGetInboxCounter({
    select: selectCounter,
  });
  const { navigate } = useNavigation();
  const otherProps = {
    inboxCounter,
    goToInbox: () => navigate("INBOX"),
  };
  return <InboxNavbarMenuDesktop {...otherProps} />;
}
