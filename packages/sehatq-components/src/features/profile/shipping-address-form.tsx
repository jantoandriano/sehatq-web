import React, { useReducer, useState } from "react";
import {
  PlaceDetailCache,
  useGetPlaceDetail,
} from "../general/google-map-query";
import {
  AddressDetailCache,
  SubmitShippingAddressVariables,
  useGetAddressDetail,
  useSubmitShippingAddress,
} from "./address-query";
import {
  ShippingAddressFormDesktop,
  ShippingAddressFormDesktopSkeleton,
} from "./shipping-address-form-desktop";
import {
  ShippingAddressFormMobile,
  ShippingAddressFormMobileSkeleton,
} from "./shipping-address-form-mobile";
import {
  FieldUnion,
  initialShippingAddressFormState,
  shippingAddressFormReducer,
  validateForm,
} from "./shipping-address-form-reducer";

export type ShippingAddressFormProps = {
  isMobile?: boolean;
  id?: string;
  onSuccess: (addressId: string) => void;
};

function selectPlace(cache: PlaceDetailCache) {
  return cache.data.description;
}

function selectDetail(cache: AddressDetailCache) {
  return cache.data;
}
const multipleChange = "change-fields";
export function ShippingAddressForm(props: ShippingAddressFormProps) {
  const [isShowMapInput, setShowMapInput] = useState(props.id ? false : true);
  const [stateForm, dispatchStateForm] = useReducer(
    shippingAddressFormReducer,
    {
      ...initialShippingAddressFormState,
    }
  );
  const submitAddress = useSubmitShippingAddress();

  const { data: detail, isLoading: loadingDetail } = useGetAddressDetail(
    { addressId: props.id ?? "" },
    {
      select: selectDetail,
      enabled: Boolean(props.id),
    }
  );

  if (!stateForm.values.id && detail) {
    dispatchStateForm({
      type: multipleChange,
      fields: detail,
      isEnableValidate: false,
    });
  }

  const { data: placeDescription } = useGetPlaceDetail(
    { placeId: stateForm.values.googlePlaceId ?? "" },
    {
      select: selectPlace,
      enabled: Boolean(stateForm.values.googlePlaceId),
    }
  );
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(stateForm.values);
    const hasError = Object.values(errors).some((value) => Boolean(value));

    if (!hasError) {
      const values: SubmitShippingAddressVariables = {
        ...stateForm.values,
        latitude: stateForm.values.latitude
          ? `${stateForm.values.latitude}`
          : undefined,
        longitude: stateForm.values.longitude
          ? `${stateForm.values.longitude}`
          : undefined,
      };

      if (!values.googlePlaceId) {
        delete values.googlePlaceId;
        delete values.latitude;
        delete values.longitude;
      }

      if (!values.id) {
        delete values.id;
      }

      submitAddress.mutate(values, {
        onSuccess: (response) => {
          props.onSuccess(`${response.data.id}`);
        },
      });
    } else {
      dispatchStateForm({
        type: "change-error",
        value: errors,
      });
    }
  }

  function onChangeDCP(value: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }) {
    if (value) {
      dispatchStateForm({
        type: multipleChange,
        fields: { ...value, googlePlaceId: "", latitude: 0, longitude: 0 },
        isEnableValidate: true,
      });
    }
  }

  function onChangeInput(field: FieldUnion) {
    dispatchStateForm({
      ...field,
      type: "change-field",
      isEnableValidate: true,
    });
  }

  function onChangePinLocation(location: {
    placeId: string;
    latitude: number;
    longitude: number;
    subdistrict?: string;
    district?: string;
    city?: string;
    province?: string;
    zipCode?: string;
  }) {
    const newValue = {
      ...location,
      googlePlaceId: location.placeId,
    };
    dispatchStateForm({
      type: multipleChange,
      fields: newValue,
      isEnableValidate: true,
    });
  }

  function onShowHideMapInput() {
    setShowMapInput(!isShowMapInput);
  }

  if (loadingDetail) {
    return <ShippingAddressFormSkeleton isMobile={props.isMobile} />;
  }

  const otherProps = {
    onSubmit,
    onChangeInput,
    onChangeDCP,
    errors: stateForm.errors,
    isLoading: submitAddress.isLoading,
    placeDescription: placeDescription ?? "",
    values: stateForm.values,
    isShowMapInput,
    onShowHideMapInput,
    onChangePinLocation,
  };

  if (props.isMobile) {
    return <ShippingAddressFormMobile {...otherProps} />;
  }
  return <ShippingAddressFormDesktop {...otherProps} />;
}

export type ShippingAddressFormSkeletonProps = {
  isMobile?: boolean;
};
export function ShippingAddressFormSkeleton(
  props: ShippingAddressFormSkeletonProps
) {
  if (props.isMobile) {
    return <ShippingAddressFormMobileSkeleton />;
  }
  return <ShippingAddressFormDesktopSkeleton />;
}
