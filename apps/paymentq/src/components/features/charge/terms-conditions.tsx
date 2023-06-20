import React from "react";
import TermsConditionsMobile from "./terms-conditions-mobile";
import TermsConditionsDesktop from "./terms-conditions-desktop";

type TermsConditionsPropsType = {
  isMobile: boolean;
};

function TermsConditions(props: TermsConditionsPropsType) {
  const { isMobile } = props;

  if (isMobile) {
    return <TermsConditionsMobile />;
  }

  return <TermsConditionsDesktop />;
}

export default TermsConditions;
