export const CHANGE_FIELD = "change-field";
export const CHANGE_ERROR = "change-error";

export interface IFields {
  cardNumber: string;
  cardExp: string;
  cardCVV: string;
  personName: string;
  purchase: string;
}

export type IErrors = Partial<{
  [FieldKey in keyof IFields]: string;
}>;

export interface IState {
  values: IFields;
  errors: IErrors;
}

export type IFieldUnion = {
  [FieldName in keyof IFields]: {
    name: FieldName;
    value: IFields[FieldName];
  };
}[keyof IFields];

export type IPayload =
  | ({ type: "change-field"; isEnableValidate?: boolean } & IFieldUnion)
  | {
      type: "change-error";
      value: IErrors;
    };

export const initialState = {
  values: {
    cardNumber: "",
    cardExp: "",
    cardCVV: "",
    personName: "",
    purchase: "",
  },
  errors: {
    cardNumber: "",
    cardExp: "",
    cardCVV: "",
    personName: "",
    purchase: "",
  },
};

export function creditCardReducer(state: IState, payload: IPayload) {
  if (payload.type === "change-field") {
    const values = {
      ...state.values,
      [payload.name]: payload.value,
    };

    const errors = payload.isEnableValidate
      ? {
          ...state.errors,
          [payload.name]: validateForm(values)[payload.name],
        }
      : state.errors;

    return {
      ...state,
      values,
      errors,
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

export function validateForm(values: IFields, installmentOptions?: any) {
  const errors: IErrors = {};
  const regex = /^\d+$/;

  if (!values.cardNumber) {
    errors.cardNumber = "No kartu wajib diisi";
  } else if (!regex.test(values.cardNumber)) {
    errors.cardNumber = "No kartu tidak sesuai";
  } else if (values.cardNumber.length < 16) {
    errors.cardNumber = "Minimal 16 karakter";
  }

  if (!values.cardExp) {
    errors.cardExp = "Tanggal kadaluarsa wajib diisi";
  }

  if (!values.cardCVV) {
    errors.cardCVV = "CVV wajib diisi";
  } else if (!regex.test(values.cardCVV)) {
    errors.cardCVV = "CVV tidak sesuai";
  } else if (values.cardCVV.length < 3) {
    errors.cardCVV = "Minimal 3 karakter";
  }

  if (!values.personName.trim()) {
    errors.personName = "Nama wajib diisi";
  }
  if (
    values.cardNumber.length >= 6 &&
    installmentOptions &&
    installmentOptions.length &&
    !values.purchase.trim()
  ) {
    errors.purchase = "Pilih pembayaran wajib diisi";
  }

  return errors;
}
