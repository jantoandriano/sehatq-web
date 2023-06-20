export interface Fields {
  name: string;
  birthDate: Date | undefined;
  phone: string;
  gender: "m" | "f" | "";
  height: string;
  weight: string;
  relation: "1" | "2" | "3" | "4" | "";
  type: "ktp" | "passport" | "kk" | "sim" | "";
  identityNumber: string;
  photo: string;
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

export const initialFamilyFormState: State = {
  values: {
    name: "",
    birthDate: undefined,
    phone: "",
    gender: "",
    weight: "",
    height: "",
    relation: "",
    type: "",
    identityNumber: "",
    photo: "",
  },
  errors: {
    name: "",
    birthDate: "",
    phone: "",
    gender: "",
    weight: "",
    height: "",
    relation: "",
    type: "",
    identityNumber: "",
    photo: "",
  },
};

export function familyFormReducer(state: State, payload: Payload) {
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
  if (!values.name.trim()) {
    errors.name = "Nama Lengkap wajib diisi";
  }

  if (!values.birthDate) {
    errors.birthDate = "Tanggal Lahir wajib diisi";
  }

  if (!values.phone.trim()) {
    errors.phone = "No. Telepon wajib diisi";
  } else if (values.phone.length < 9) {
    errors.phone = "Minimum 9 karakter";
  } else if (values.phone?.length > 20) {
    errors.phone = "Maksimum 20 karakter";
  } else if (/-/.test(values.phone)) {
    errors.phone = "No. Telepon tidak sesuai";
  }

  if (!values.gender) {
    errors.gender = "Jenis Kelamin wajib diisi";
  }

  if (!values.weight) {
    errors.weight = "Berat Badan wajib diisi";
  } else if (/-/.test(values.weight)) {
    errors.weight = "Berat Badan tidak sesuai";
  }

  if (!values.height) {
    errors.height = "Tinggi Badan wajib diisi";
  } else if (/-/.test(values.height)) {
    errors.height = "Tinggi Badan tidak sesuai";
  }

  if (!values.relation) {
    errors.relation = "Hubungan Keluarga wajib diisi";
  }

  if (!values.type) {
    errors.type = "Jenis Identitas perlu diisi";
  }

  if (!values.identityNumber.trim()) {
    errors.identityNumber = "Nomor Identitas wajib diisi";
  }

  if (!values.photo) {
    errors.photo = "Foto identitas wajib diisi";
  }

  return errors;
}
