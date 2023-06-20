import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@sehatq/components";
import { MerchantShippingMethodUI } from "./merchant-shipping-method-ui";
import {
  MerchantShippingMethodsCache,
  useCreateShippingMethod,
  useGetMerchantShippingMethods,
  useUpdateShippingMethodInsurance,
} from "./merchant-shipping-method-queries";
import { PrescriptionCart } from "./prescription-cart-model";

function selectMerchantShippingMethod(cache: MerchantShippingMethodsCache) {
  return cache.data;
}

export type MerchantShippingMethodProps = {
  cartId: string;
  isDisabled: boolean;
  merchantId: number;
  shippingMethod: PrescriptionCart["data"][0]["shippingMethod"];
};

export function MerchantShippingMethod(props: MerchantShippingMethodProps) {
  const { cartId, isDisabled, merchantId, shippingMethod } = props;
  const router = useRouter();
  const [stateMerchantId, setStateMerchantId] = useState<number>(0);
  const [statePopup, setStatePopup] = useState<"group" | "children">("group");
  const [stateSelectedGroupId, setStateSelectedGroupId] = useState<number>(0);
  const [selectedShippingMethodId, setSelectedShippingMethodId] =
    useState<number>(shippingMethod?.id || 0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const drawer = useDisclosure();
  const query = {
    merchantId: `${stateMerchantId}` ?? "",
    cartId,
  };

  const {
    data: dataMerchantShippingMethods,
    isLoading: isLoadingMerchantShippingMethods,
    isFetching: isFetchingMerchantShippingMethods,
    refetch: refetchMerchantShippingMethods,
  } = useGetMerchantShippingMethods(query, {
    // enabled: !!stateMerchantId,
    enabled: false,
    select: selectMerchantShippingMethod,
  });

  const { mutate: createShippingMethod } = useCreateShippingMethod();
  const { mutate: updateShippingMethodInsurance } =
    useUpdateShippingMethodInsurance();

  useEffect(() => {
    if (drawer.isOpen) {
      refetchMerchantShippingMethods();
    }
  }, [drawer.isOpen, refetchMerchantShippingMethods]);

  function onSubmitShippingMethod() {
    setIsSubmitting(true);
    createShippingMethod(
      {
        cartId,
        merchantId,
        shippingMethodId: selectedShippingMethodId,
      },
      {
        onSuccess: () => drawer.onClose(),
        onSettled: () => setIsSubmitting(false),
      }
    );
  }

  function onChangeShippingInsurance(selected: boolean) {
    updateShippingMethodInsurance({
      cartId,
      merchantId,
      selected,
    });
  }

  function handleOpenShippingMethodGroupDrawer() {
    setStateMerchantId(merchantId);
    setStatePopup("group");
    drawer.onOpen();
  }

  function handleOpenShippingMethodChildrenDrawer(groupId: number, id: number) {
    setStateMerchantId(merchantId);
    setStatePopup("children");
    setStateSelectedGroupId(groupId);
    setSelectedShippingMethodId(id);
    drawer.onOpen();
  }

  function handleBackToShippingMethodGroupDrawer() {
    setStatePopup("group");
    setSelectedShippingMethodId(0);
  }

  function handleChangeShippingMethodGroup(groupId: number) {
    setStatePopup("children");
    setStateSelectedGroupId(groupId);
  }

  function handleChangeShippingMethod(id: number) {
    setSelectedShippingMethodId(id);
  }

  function handleCloseDrawer() {
    setStatePopup("group");
    drawer.onClose();
  }

  const newProps = {
    isDisabled,
    dataMerchantShippingMethods,
    isLoadingMerchantShippingMethods:
      isLoadingMerchantShippingMethods || isFetchingMerchantShippingMethods,
    shippingMethod,
    selectedShippingMethodId,
    setSelectedShippingMethodId,
    selectedGroupId: stateSelectedGroupId,
    drawer,
    shownPopup: statePopup,
    submit: {
      onSubmit: onSubmitShippingMethod,
      isSubmitting,
    },
    onChangeShippingInsurance,
    onRefresh: () => router.reload(),
    handleOpenShippingMethodGroupDrawer,
    handleOpenShippingMethodChildrenDrawer,
    handleBackToShippingMethodGroupDrawer,
    handleChangeShippingMethodGroup,
    handleChangeShippingMethod,
    handleCloseDrawer,
  };

  return <MerchantShippingMethodUI {...newProps} />;
}
