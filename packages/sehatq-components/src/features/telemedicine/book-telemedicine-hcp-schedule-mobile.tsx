import React from "react";
import { Button } from "../../user-interfaces";

export type BookTelemedicineHCPScheduleMobileProps = {
  isLoading: boolean;
  isLogin: boolean;
  onClickBook: () => void;
};

export function BookTelemedicineHCPScheduleMobile(
  props: BookTelemedicineHCPScheduleMobileProps
) {
  const { onClickBook, isLoading, isLogin } = props;

  return (
    <Button
      w="full"
      isLoading={isLoading}
      isDisabled={isLoading}
      colorScheme="main"
      onClick={() => onClickBook()}
      role={isLogin ? "button" : "link"}
    >
      Lanjutkan
    </Button>
  );
}
