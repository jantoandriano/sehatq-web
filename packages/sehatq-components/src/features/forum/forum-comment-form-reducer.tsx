export interface Fields {
  comment: string;
}

export type Errors = Partial<{
  [FieldKey in keyof Fields]: string;
}>;

export type FieldUnion = {
  [FieldName in keyof Fields]: {
    name: FieldName;
    value: Fields[FieldName];
  };
}[keyof Fields];

export interface State {
  values: Fields;
  errors: Errors;
}

export type Payload =
  | ({ type: "change-field"; isEnableValidate?: boolean } & FieldUnion)
  | {
      type: "change-error";
      value: Errors;
    };

export const initialForumCommentFormState: State = {
  values: {
    comment: "",
  },
  errors: {
    comment: "",
  },
};

export function forumCommentFormReducer(state: State, payload: Payload) {
  if (payload.type === "change-field") {
    const values = {
      ...state.values,
      [payload.name]: payload.value,
    };
    return {
      ...state,
      values,
      errors: payload.isEnableValidate
        ? {
            ...state.errors,
            [payload.name]: validateForm(values)[payload.name],
          }
        : state.errors,
    };
  }
  if (payload.type === "change-error") {
    return {
      ...state,
      errors: payload.value,
    };
  }
  return state;
}

export function validateForm(values: Fields) {
  const errors: Errors = {};
  const trimmedComment = values.comment.trim();
  if (!trimmedComment) {
    errors.comment = "Komentar perlu diisi";
  } else if (trimmedComment.length > 500) {
    errors.comment = "Maksimum 500 karakter";
  } else if (trimmedComment.length < 5) {
    errors.comment = "Minimum 5 karakter";
  }
  return errors;
}
