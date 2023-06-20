import React, { useState, ChangeEvent } from "react";
import { useDisclosure } from "../../user-interfaces";
import { useGetTelemedicineSpecialities } from "./telemedicine-speciality-query";
import { TelemedicineSpecialitiesDesktop } from "./telemedicine-specialities-desktop";
import { TelemedicineSpecialitiesMobile } from "./telemedicine-specialities-mobile";

export type TelemedicineSpecialitiesProps = {
  isMobile?: boolean;
};

export function TelemedicineSpecialities(props: TelemedicineSpecialitiesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateKeyword, setStateKeyword] = useState("");
  const { data: telemedicineSpecialities } = useGetTelemedicineSpecialities({
    page: "1",
    perPage: "100",
    hospitalId: "",
  });

  function setKeyword(event: ChangeEvent<HTMLInputElement>) {
    setStateKeyword(event.target.value);
  }

  const otherProps = {
    telemedicineSpecialities,
    isOpen,
    onOpen,
    onClose,
    setKeyword,
    keyword: stateKeyword,
  };
  if (props.isMobile) return <TelemedicineSpecialitiesMobile {...otherProps} />;
  return <TelemedicineSpecialitiesDesktop {...otherProps} />;
}
