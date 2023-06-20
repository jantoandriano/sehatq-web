import { useNavigation } from "@sehatq/utils";
import React from "react";
import { HistoryIconActive, Link } from "../../user-interfaces";

export function MyTelemedicineHistoryBannerMobile() {
  const { Navigate } = useNavigation();
  return (
    <Navigate name="TELEMED_HISTORIES">
      <Link
        as="a"
        color="sea.500"
        fontSize="xs"
        fontWeight="semibold"
        fontStyle="italic"
        _hover={{ border: "none" }}
      >
        <HistoryIconActive boxSize="36px" />
      </Link>
    </Navigate>
  );
}
