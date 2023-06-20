import React, { useState } from "react";
import { Text } from "../../user-interfaces";
import { useSubmitNewsLetter } from "./news-letter-queries";

import { SehatQFooterMobile } from "./sehatq-footer-mobile";
import { SehatQFooterDesktop } from "./sehatq-footer-desktop";

export type SehatQFooterProps = {
  isMobile?: boolean;
};

export function SehatQFooter(props: SehatQFooterProps) {
  const [stateEmailNewsLetter, setStateEmailNewsLetter] = useState("");
  const [stateGenderNewsLetter, setStateGenderNewsLetter] = useState("");
  const [stateErrorNewsLetter, setStateErrorNewsLetter] = useState("");
  const submitNewsLetter = useSubmitNewsLetter();
  const contactPhone = "+6221-27899827";
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stateGenderNewsLetter) {
      setStateErrorNewsLetter("Silahkan isi jenis kelamin anda.");
      return false;
    }
    if (!stateEmailNewsLetter) {
      setStateErrorNewsLetter("Silahkan isi email anda.");
      return false;
    }
    submitNewsLetter.mutate(
      {
        email: stateEmailNewsLetter,
        gender: stateGenderNewsLetter,
      },
      {
        onSuccess: () => {
          setStateGenderNewsLetter("");
          setStateEmailNewsLetter("");
          setStateErrorNewsLetter("");
        },
      }
    );
  }

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setStateEmailNewsLetter(e.target.value);
    setStateErrorNewsLetter("");
  }

  function onChangeGender(option: string) {
    setStateGenderNewsLetter(option);
    setStateErrorNewsLetter("");
  }

  const newsletterRadio = {
    options: [
      {
        element: <Text fontSize={props.isMobile ? "xs" : "sm"}>Perempuan</Text>,
        value: "f",
      },
      {
        element: <Text fontSize={props.isMobile ? "xs" : "sm"}>Laki-laki</Text>,
        value: "m",
      },
    ],

    name: "newsletterGender",
    onChange: onChangeGender,
  };

  const otherProps = {
    onSubmit,
    newsletterRadio,
    onChangeEmail,
    submitNewsLetter,
    stateErrorNewsLetter,
    contactPhone,
  };

  if (props.isMobile) {
    return <SehatQFooterMobile {...otherProps} />;
  }
  return <SehatQFooterDesktop {...otherProps} />;
}
