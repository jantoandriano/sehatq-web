import React from "react";
import { Button } from "../../user-interfaces";

export type BookTelemedicineHCPScheduleDesktopProps = {
  isLoading: boolean;
  isLogin: boolean;
  onClickBook: () => void;
};

export function BookTelemedicineHCPScheduleDesktop(
  props: BookTelemedicineHCPScheduleDesktopProps
) {
  const { onClickBook, isLoading, isLogin } = props;

  return (
    <Button
      w="full"
      isLoading={isLoading}
      isDisabled={isLoading}
      colorScheme="main"
      onClick={() => onClickBook()}
      size="lg"
      role={isLogin ? "button" : "link"}
    >
      Lanjutkan
    </Button>
  );
}
