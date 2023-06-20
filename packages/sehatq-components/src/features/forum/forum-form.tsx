import React, { useReducer, useState } from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile";
import { ForumFormDesktop } from "./forum-form-desktop";
import { ForumFormMobile } from "./forum-form-mobile";
import { useSubmitForum } from "./forum-queries";

export type ForumFormProps = {
  isMobile: boolean;
  textButton?: string;
  widthButton?: string;
  heightButton?: string;
  variant?:
    | "link"
    | "outline"
    | "tab"
    | "solid"
    | "ghost"
    | "unstyled"
    | "fit"
    | "chip"
    | undefined;
  background?: string;
  borderRadius?: string;
  isBannerQuestionInput?: boolean;
  disableNavigateBack?: boolean;
};

const initialStateForm = {
  values: {
    title: "",
    categoryId: 0,
    question: "",
  },
  errors: {
    title: "",
    categoryId: "",
    question: "",
  },
};

export interface PayloadValues {
  title: string;
  categoryId: number;
  question: string;
}

function validateForm(values: PayloadValues) {
  const errors: Record<string, string | undefined> = {};
  const title = values.title.trim();
  if (!title) {
    errors.title = "Judul wajib diisi";
  } else if (title.length > 100) {
    errors.title = "Maksimum 100 karakter";
  } else if (title.length < 5) {
    errors.title = "Minimum 5 karakter";
  }

  if (!values.categoryId) {
    errors.categoryId = "Kategori wajib diisi";
  }

  const question = values.question.trim();
  if (!question) {
    errors.question = "Pertanyaan wajib diisi";
  } else if (question.length > 500) {
    errors.question = "Maksimum 500 karakter";
  } else if (question.length < 5) {
    errors.question = "Minimum 5 karakter";
  }
  return errors;
}

export interface PayloadForm {
  values: PayloadValues;
  errors?: Record<string, string | undefined>;
}

function formReducer(
  state: PayloadForm,
  payload: {
    name: string;
    value: string | number;
    errors?: Record<string, string | undefined>;
    isEnableValidate: boolean;
  }
) {
  const values = {
    ...state.values,
    [payload.name]: payload.value,
  };

  return {
    ...state,
    values,
    errors: {
      ...state.errors,
      ...(payload.isEnableValidate
        ? { [payload.name]: validateForm(values)[payload.name] }
        : null),
    },
  };
}

export function ForumForm(props: ForumFormProps) {
  const {
    isMobile,
    textButton,
    widthButton,
    heightButton,
    variant,
    background,
    borderRadius,
    isBannerQuestionInput,
    disableNavigateBack,
  } = props;
  const [stateForm, dispatchStateForm] = useReducer(
    formReducer,
    initialStateForm
  );
  const { navigate } = useNavigation();
  const [submited, setSubmited] = useState(false);
  const [isShowForm, setShowForm] = useState(false);
  const submitForum = useSubmitForum();
  const { isSuccess } = useGetProfile();

  function onChangeInput(name: string, value: string | number) {
    dispatchStateForm({
      name,
      value,
      isEnableValidate: true,
    });
  }

  function multipleDispatch(
    memberData: Record<string, string | number> | undefined,
    isEnableValidate: boolean
  ) {
    if (memberData) {
      Object.keys(memberData).forEach((key: string) => {
        dispatchStateForm({
          name: key,
          value: memberData[key],
          isEnableValidate,
        });
      });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    multipleDispatch(stateForm.values, true);
    const validValues = validateForm(stateForm.values);
    let disableSubmit = false;
    if (validValues) {
      Object.keys(validValues).forEach((key) => {
        if (validValues[key]) {
          disableSubmit = true;
        }
      });
    }

    if (!isSuccess) {
      navigate("EXTERNAL_LOGIN");
      return;
    }

    if (!disableSubmit) {
      submitForum.mutate(
        {
          title: stateForm.values.title,
          categoryId: stateForm.values.categoryId,
          question: stateForm.values.question,
        },
        {
          onSuccess: () => {
            setSubmited(true);
            multipleDispatch(initialStateForm.values, false);
          },
        }
      );
    }
  }

  function onClickNewQuestion() {
    if (isSuccess) {
      setShowForm(!isShowForm);
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  function onClickNewQuestionBanner() {
    if (isSuccess) {
      dispatchStateForm({
        name: "question",
        value: stateForm.values.question,
        isEnableValidate: true,
      });
      const validValue = validateForm(stateForm.values);
      if (!validValue.question) {
        setShowForm(!isShowForm);
      }
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  function onCloseForm() {
    setSubmited(false);
    setShowForm(false);
  }

  const otherProps = {
    isShowForm,
    onSubmit,
    onCloseForm,
    onChangeInput,
    errors: stateForm.errors,
    submited,
    onClickNewQuestion,
    textButton,
    widthButton,
    heightButton,
    variant,
    background,
    borderRadius,
    isLoading: submitForum.isLoading,
    values: stateForm.values,
    disableNavigateBack,
    isLogin: isSuccess,
  };

  if (isMobile) {
    return <ForumFormMobile {...otherProps} />;
  }

  const desktopProps = {
    ...otherProps,
    isBannerQuestionInput,
    onClickNewQuestionBanner,
  };
  return <ForumFormDesktop {...desktopProps} />;
}
