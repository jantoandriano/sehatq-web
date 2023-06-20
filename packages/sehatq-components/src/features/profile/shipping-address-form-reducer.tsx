export interface Fields {
  id: number;
  label: string;
  receiver: string;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  phone: string;
  zipCode: string;
  latitude: number | undefined;
  longitude: number | undefined;
  note: string | undefined;
  default: boolean;
  googlePlaceId: string | undefined;
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
      type: "change-fields";
      fields: Partial<Fields>;
      isEnableValidate?: boolean;
    }
  | {
      type: "change-error";
      value: Errors;
    };

export const initialShippingAddressFormState: State = {
  values: {
    id: 0,
    label: "",
    receiver: "",
    address: "",
    province: "",
    city: "",
    district: "",
    subdistrict: "",
    phone: "",
    zipCode: "",
    latitude: 0,
    longitude: 0,
    note: "",
    default: false,
    googlePlaceId: "",
  },
  errors: {
    label: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    receiver: "",
    district: "",
    subdistrict: "",
    city: "",
    province: "",
    zipCode: "",
    googlePlaceId: "",
  },
};

export function shippingAddressFormReducer(state: State, payload: Payload) {
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
  if (payload.type === "change-fields") {
    const values = {
      ...state.values,
      ...payload.fields,
    };
    const errors = validateForm(values);
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
  const label = values.label.trim();
  if (!label) {
    errors.label = "Label alamat belum diisi";
  }

  if (!values.receiver.trim()) {
    errors.receiver = "Nama penerima belum diisi";
  }

  const phone = values.phone?.trim();
  if (!phone) {
    errors.phone = "No. Telepon belum diisi";
  } else if (phone.length < 9) {
    errors.phone = "Minimum 9 karakter";
  } else if (phone?.length > 20) {
    errors.phone = "Maksimum 20 karakter";
  }

  if (!values.address.trim()) {
    errors.address = "Detail alamat belum diisi";
  }

  if (!values.district.trim()) {
    errors.district = "Kelurahan / kecamatan / kota / provinsi belum diisi";
  }

  if (!values.zipCode.trim()) {
    errors.zipCode = "Kode pos belum diisi";
  }

  return errors;
}
