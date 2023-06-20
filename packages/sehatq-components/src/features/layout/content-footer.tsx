import React, { useState } from "react";
import { formatDate } from "@sehatq/utils";

import { ContentFooterMobile } from "./content-footer-mobile";
import { ContentFooterDesktop } from "./content-footer-desktop";

export type ContentFooterProps = {
  isMobile: boolean;
};

export function ContentFooter(props: ContentFooterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onCollapse = () => {
    setIsOpen(!isOpen);
  };

  const currentDate = new Date();
  const dataLength = 6;
  const dataArray = [];
  for (let i = 1; i <= dataLength; i++) {
    const tempDate = new Date();
    tempDate.setMonth(currentDate.getMonth() - i);
    dataArray.push({
      id: i,
      slug: `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}`,
      label: `${formatDate(tempDate, "MMMM")} ${tempDate.getFullYear()}`,
    });
  }

  const otherProps = { data: dataArray, onCollapse, isOpen };
  if (props.isMobile) {
    return <ContentFooterMobile {...otherProps} />;
  }
  return <ContentFooterDesktop {...otherProps} />;
}
