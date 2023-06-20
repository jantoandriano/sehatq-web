import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useGetProfile } from "../profile/profile-queries";
import { LoginPopupDesktop } from "./login-popup-desktop";
import { LoginPopupMobile } from "./login-popup-mobile";

export type LoginPopupProps = {
  isMobile?: boolean;
};

export function LoginPopup(props: LoginPopupProps) {
  const { isMobile } = props;

  const [stateIsShowLoginPopup, setStateIsShowLoginPopup] = useState(false);
  const { status } = useGetProfile();
  const isLogin = status === "error" ? false : true;

  useEffect(() => {
    const isCookies = Cookies.get("loginPopup");
    if (!isLogin && !isCookies) {
      const timer = setTimeout(() => {
        setStateIsShowLoginPopup(true);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [isLogin]);

  const onCloseLoginPopup = () => {
    Cookies.set("loginPopup", "1", {
      expires: 1,
      path: "/",
      domain: ".sehatq.com",
    });
    setStateIsShowLoginPopup(false);
  };

  const baseProps = {
    isOpen: stateIsShowLoginPopup,
    onClose: () => onCloseLoginPopup(),
  };

  if (isMobile) {
    return <LoginPopupMobile {...baseProps} />;
  }

  return <LoginPopupDesktop {...baseProps} />;
}
