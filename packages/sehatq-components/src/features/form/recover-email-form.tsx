import React, { useState } from "react";
import Cookies from "js-cookie";

import { useNavigation } from "@sehatq/utils";
import { useToast } from "../../user-interfaces";
import { useGetProfile } from "../profile";
import { RecoverEmailFormDesktop } from "./recover-email-form-desktop";
import { RecoverEmailFormMobile } from "./recover-email-form-mobile";
import { ChangeableFieldTypes } from "./recover-email-form-types";
import { usePostEmailRecovery } from "./recover-email-form-queries";

export type RecoverEmailFormProps = {
  isMobile: boolean;
  token: string;
};

export function RecoverEmailForm({ isMobile, token }: RecoverEmailFormProps) {
  const toast = useToast();
  const { navigate } = useNavigation();

  const [fieldType, setFieldType] = useState<ChangeableFieldTypes>({
    password: "password",
    confirmPassword: "password",
  });
  const [stateForm, setStateForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [stateError, setStateError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isRecoverSuccess, setIsRecoverSuccess] = useState<boolean>(false);

  const { mutate: postEmailRecoveryMethod, isLoading } = usePostEmailRecovery();
  const { refetch } = useGetProfile();
  const [email, setEmail] = useState<string>("");

  function handleChangePassword(e: React.ChangeEvent<HTMLElement>) {
    const inputEl: HTMLInputElement = e.currentTarget as HTMLInputElement;

    if (!inputEl.name) return;
    setStateError({
      password: "",
      confirmPassword: "",
    });

    if (!inputEl.value) {
      setStateError({
        ...stateError,
        [inputEl.name]: `${
          inputEl.name === "password" ? "Masukkan" : "Ulangi"
        } password baru.`,
      });
    }

    if (
      inputEl.value !==
      stateForm[inputEl.name === "password" ? "confirmPassword" : "password"]
    ) {
      setStateError({
        ...stateError,
        confirmPassword: "Password tidak cocok. Coba cek kembali, ya.",
      });
    }

    setStateForm({
      ...stateForm,
      [inputEl.name]: inputEl.value,
    });
  }

  function changeFieldType(e: React.MouseEvent<HTMLElement>) {
    const inputEl = (e.target as HTMLElement)
      .closest("div")
      ?.querySelector("input") as HTMLInputElement;

    if (!inputEl.name) return;

    setFieldType({
      ...fieldType,
      [inputEl.name]:
        fieldType[inputEl.name as "password" | "confirmPassword"] === "password"
          ? "text"
          : "password",
    });
  }

  function handleSubmit() {
    const isValid =
      stateForm.password &&
      stateForm.confirmPassword &&
      !stateError.password &&
      !stateError.confirmPassword;

    const errorState = stateError;
    if (!stateForm.password) {
      errorState.password = "Masukkan password baru.";
    }
    if (!stateForm.confirmPassword) {
      errorState.confirmPassword = "Ulangi password baru.";
    }
    setStateError({ ...errorState });

    if (isValid) {
      postEmailRecoveryMethod(
        {
          token,
          password: stateForm.password,
          rePassword: stateForm.confirmPassword,
        },
        {
          onSuccess: async ({ data }) => {
            const { uid2Tokens } = data;

            Cookies.set("token", data.token);
            Cookies.set(
              "__uid2_advertising_token",
              uid2Tokens.advertisingToken
            );

            const { data: profile } = await refetch();
            setEmail(profile?.email || "");
            setIsRecoverSuccess(true);
          },
          onError: (e) => {
            toast({
              status: "error",
              position: "top-right",
              message: e.message,
            });
          },
        }
      );
    }
  }

  function closeModal() {
    navigate("PROFILE");
  }

  const props = {
    email,
    fieldType,
    stateForm,
    stateError,
    isLoading,
    isRecoverSuccess,
    closeModal,
    handleChangePassword,
    changeFieldType,
    handleSubmit,
  };

  if (isMobile) return <RecoverEmailFormMobile {...props} />;
  return <RecoverEmailFormDesktop {...props} />;
}
