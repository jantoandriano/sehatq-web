export interface Fields {
  id: number | undefined;
  userAddressId: string;
  notes: string | undefined;
  images: { id: number; base64: string }[] | undefined;
  consultationId: number | undefined;
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

export const initialPrescriptionFormState: State = {
  values: {
    id: undefined,
    userAddressId: "",
    notes: "",
    images: undefined,
    consultationId: undefined,
  },
  errors: {
    userAddressId: "",
    notes: "",
    images: "",
  },
};

export function prescriptionFormReducer(state: State, payload: Payload) {
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

  if (!values.userAddressId) {
    errors.userAddressId = "Tambah alamat dulu untuk melanjutkan";
  }

  if (!values.consultationId && (!values.images || !values.images.length)) {
    errors.images = "Upload minimal 1 foto resepmu";
  }

  return errors;
}
