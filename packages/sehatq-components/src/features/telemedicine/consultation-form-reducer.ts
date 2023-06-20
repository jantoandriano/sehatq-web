export interface Fields {
  userId: number;
  name: string;
  symptom: string;
  birthDate: Date | undefined;
  phone: string | null;
  gender: "m" | "f" | "";
  address: string | null;
  identityNumber: string | null;
  photoUrl: string;
  age: number;
  height: number;
  weight: number;
  relation: string;
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
  isShowNikAndAddress: boolean;
}

export type Payload =
  | ({ type: "change-field"; isEnableValidate?: boolean } & FieldUnion)
  | {
      type: "change-fields";
      fields: Partial<Fields>;
      isEnableValidate?: boolean;
    }
  | {
      type: "change-show-nik-and-address";
      value: boolean;
    }
  | {
      type: "change-error";
      value: Errors;
    };

export const initialConsultationFormState: State = {
  values: {
    userId: 0,
    name: "",
    gender: "m",
    symptom: "",
    birthDate: new Date(),
    phone: "",
    identityNumber: "",
    address: "",
    photoUrl: "",
    age: 0,
    height: 0,
    weight: 0,
    relation: "",
  },
  errors: {
    userId: "",
    symptom: "",
    birthDate: "",
    phone: "",
    gender: "",
    address: "",
    identityNumber: "",
  },
  isShowNikAndAddress: false,
};

export function consultationFormReducer(state: State, payload: Payload) {
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
            [payload.name]: validateForm(
              values,
              state.isShowNikAndAddress ?? false
            )[payload.name],
          }
        : state.errors,
    };
  }
  if (payload.type === "change-fields") {
    const values = {
      ...state.values,
      ...payload.fields,
    };
    const errors = validateForm(values, state.isShowNikAndAddress ?? false);
    return {
      ...state,
      values,
      errors: payload.isEnableValidate
        ? {
            ...state.errors,
            ...Object.keys(payload.fields).reduce<Errors>(
              (oldErrors, fieldKey) => ({
                ...oldErrors,
                [fieldKey]: errors[fieldKey as keyof Fields],
              }),
              {}
            ),
          }
        : state.errors,
    };
  }
  if (payload.type === "change-show-nik-and-address") {
    return {
      ...state,
      isShowNikAndAddress: payload.value,
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

export function validateForm(values: Fields, isShowNikAndAddress: boolean) {
  let errors: Errors = {};
  const symptom = values.symptom.trim();
  if (!symptom) {
    errors.symptom = "Keluhan perlu diisi";
  } else if (symptom.length > 190) {
    errors.symptom = "Maksimum 190 karakter";
  } else if (symptom.length < 5) {
    errors.symptom = "Minimum 5 karakter";
  }

  if (!values.birthDate) {
    errors.birthDate = "Tanggal lahir perlu diisi";
  }

  if (!values.gender) {
    errors.gender = "Jenis kelamin perlu diisi";
  }

  const phone = values.phone?.trim();
  if (!phone) {
    errors.phone = "No. Handphone perlu diisi";
  } else if (phone.length < 9) {
    errors.phone = "Minimum 9 karakter";
  } else if (phone?.length > 20) {
    errors.phone = "Maksimum 20 karakter";
  }

  if (isShowNikAndAddress) {
    errors = {
      ...errors,
      ...validateValidateNikAndAddress(values),
    };
  }

  return errors;
}

function validateValidateNikAndAddress(values: Fields) {
  const errors: Errors = {};
  const identityNumber = values.identityNumber?.trim();
  if (!identityNumber) {
    errors.identityNumber = "NIK perlu diisi";
  } else if (identityNumber.length < 16) {
    errors.identityNumber = "Minimum 16 karakter";
  } else if (identityNumber.length > 16) {
    errors.identityNumber = "Maksimum 16 karakter";
  }

  const address = values.address?.trim();
  if (!address) {
    errors.address = "Alamat perlu diisi";
  } else if (address.length < 16) {
    errors.address = "Minimum 16 karakter";
  } else if (address.length > 190) {
    errors.address = "Maksimum 190 karakter";
  }

  return errors;
}
