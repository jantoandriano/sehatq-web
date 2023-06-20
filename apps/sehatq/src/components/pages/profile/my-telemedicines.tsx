import React from "react";
import { MyTelemedicinesDesktop } from "./my-telemedicines-desktop";
import { MyTelemedicinesMobile } from "./my-telemedicines-mobile";

export type MyTelemedicinesProps = { isMobile: boolean };

export function MyTelemedicines(props: MyTelemedicinesProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <MyTelemedicinesMobile />;
  }
  return <MyTelemedicinesDesktop />;
}
