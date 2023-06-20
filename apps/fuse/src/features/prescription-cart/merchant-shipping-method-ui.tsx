/* eslint-disable sonarjs/no-duplicate-string */
import React from "react";
import { generatePriceDisplay } from "@sehatq/utils";
import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  Checkbox,
  ChevronRightIcon,
  CloseIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  RadioGroup,
  Spinner,
  Text,
  TruckIcon,
  VStack,
} from "@sehatq/components";
import { MerchantShippingMethod } from "./merchant-shipping-method-model";
import { PrescriptionCart } from "./prescription-cart-model";

export type MerchantShippingMethodUIProps = {
  isDisabled: boolean;
  dataMerchantShippingMethods: MerchantShippingMethod[] | undefined;
  isLoadingMerchantShippingMethods: boolean;
  shippingMethod: PrescriptionCart["data"][0]["shippingMethod"];
  shownPopup: "group" | "children";
  selectedShippingMethodId: number;
  setSelectedShippingMethodId: React.Dispatch<React.SetStateAction<number>>;
  selectedGroupId: number;
  onChangeShippingInsurance: (selected: boolean) => void;
  onRefresh: () => void;
  handleOpenShippingMethodGroupDrawer: () => void;
  handleOpenShippingMethodChildrenDrawer: (groupId: number, id: number) => void;
  handleBackToShippingMethodGroupDrawer: () => void;
  handleChangeShippingMethodGroup: (groupId: number) => void;
  handleChangeShippingMethod: (id: number) => void;
  handleCloseDrawer: () => void;
  submit: {
    onSubmit: () => void;
    isSubmitting: boolean;
  };
  drawer: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export function MerchantShippingMethodUI(props: MerchantShippingMethodUIProps) {
  const {
    isDisabled,
    dataMerchantShippingMethods,
    isLoadingMerchantShippingMethods,
    shippingMethod,
    shownPopup,
    selectedShippingMethodId,
    selectedGroupId,
    onChangeShippingInsurance,
    onRefresh,
    handleOpenShippingMethodGroupDrawer,
    handleOpenShippingMethodChildrenDrawer,
    handleBackToShippingMethodGroupDrawer,
    handleChangeShippingMethodGroup,
    handleChangeShippingMethod,
    handleCloseDrawer,
    submit: { onSubmit, isSubmitting },
    drawer: { isOpen },
  } = props;

  return (
    <>
      {(!isDisabled && shippingMethod && (
        <Box
          fontSize="sm"
          border="solid 1px"
          borderColor="sea.500"
          rounded="md"
          overflow="hidden"
        >
          <Flex
            justify="space-between"
            align="center"
            bgColor="main.50"
            borderBottom="solid 1px"
            borderColor="sea.500"
            padding={3}
            onClick={() =>
              handleOpenShippingMethodChildrenDrawer(
                shippingMethod.group.id,
                shippingMethod.id
              )
            }
          >
            <Text color="sea.500" fontWeight="semibold">
              {shippingMethod.group.name}
            </Text>
            <ChevronRightIcon color="sea.500" boxSize={6} />
          </Flex>
          <Flex flexDir="column" gap={3} p={3}>
            <Flex justify="space-between" align="center" fontSize="xs">
              <Text fontWeight="semibold">{shippingMethod.name}</Text>
              <Text fontWeight="semibold">
                {generatePriceDisplay(shippingMethod.price)}
              </Text>
            </Flex>
            {shippingMethod.insurance.availability && (
              <Flex justify="space-between" align="center">
                <Checkbox
                  isChecked={shippingMethod.insurance.useShippingInsurance}
                  isDisabled={shippingMethod.insurance.disable}
                  onChange={() =>
                    onChangeShippingInsurance(
                      !shippingMethod.insurance.useShippingInsurance
                    )
                  }
                  colorScheme="main"
                  rounded="sm"
                  borderColor="gray.600"
                >
                  <Text fontWeight="semibold" fontSize="xs">
                    Asuransi Pengiriman
                  </Text>
                </Checkbox>
                <Text fontWeight="semibold" fontSize="xs">
                  {generatePriceDisplay(
                    shippingMethod.insurance.totalShippingInsurance
                  )}
                </Text>
              </Flex>
            )}
          </Flex>
        </Box>
      )) || (
        <Flex
          justify="space-between"
          align="center"
          padding={3}
          fontSize="sm"
          bgColor={isDisabled ? "#EAEAEA" : "main.50"}
          border="solid 1px"
          borderColor={isDisabled ? "brownGrey.500" : "sea.500"}
          rounded="md"
          onClick={() => !isDisabled && handleOpenShippingMethodGroupDrawer()}
        >
          <HStack>
            <TruckIcon
              width="22px"
              height="14px"
              color={isDisabled ? "brownGrey.500" : "sea.500"}
            />
            <Text
              color={isDisabled ? "brownGrey.500" : "sea.500"}
              fontWeight="semibold"
            >
              Pilih Pengiriman
            </Text>
          </HStack>
          <ChevronRightIcon
            color={isDisabled ? "brownGrey.500" : "sea.500"}
            boxSize={6}
          />
        </Flex>
      )}
      <Drawer
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        placement="bottom"
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius="8px 8px 0 0">
          {isLoadingMerchantShippingMethods ? (
            <Center height="20vh">
              <Spinner />
            </Center>
          ) : shownPopup === "group" ? (
            <ShippingMethodGroup
              shippingMethods={dataMerchantShippingMethods}
              onSelect={handleChangeShippingMethodGroup}
              onClose={handleCloseDrawer}
            />
          ) : (
            <ShippingMethodChildren
              onClose={handleCloseDrawer}
              onSelect={handleChangeShippingMethod}
              onBack={handleBackToShippingMethodGroupDrawer}
              onRefresh={onRefresh}
              selectedShippingMethodId={`${selectedShippingMethodId}`}
              shippingMethod={dataMerchantShippingMethods?.find(
                (item) => item.id === selectedGroupId
              )}
              buttonProps={{
                onClick: onSubmit,
                isDisabled: !selectedShippingMethodId,
                isLoading: isSubmitting,
              }}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ShippingMethodGroup({
  shippingMethods,
  onSelect,
  onClose,
}: {
  shippingMethods: MerchantShippingMethod[] | undefined;
  onSelect: (id: number) => void;
  onClose: () => void;
}) {
  return (
    <>
      <DrawerHeader paddingLeft={4} paddingRight={2}>
        <HStack justify="space-between">
          <Text fontSize="sm" fontFamily="poppins">
            Pilih Pengiriman
          </Text>
          <IconButton
            aria-label="close"
            color="brownGrey.500"
            variant="unstyled"
            size="xs"
            icon={<CloseIcon />}
            onClick={onClose}
          />
        </HStack>
      </DrawerHeader>
      <DrawerBody paddingLeft={4} paddingRight={2}>
        {!!shippingMethods?.length &&
          shippingMethods.map((item, idx) => (
            <HStack
              key={item.id}
              justify="space-between"
              paddingY={3}
              borderBottom={
                idx !== shippingMethods.length - 1 ? "0.5px solid" : "none"
              }
              borderBottomColor="veryLightPink"
              onClick={() => onSelect(item.id)}
            >
              <Box>
                <Text fontSize="sm" fontWeight="semibold">
                  {item.name}
                </Text>
                <Text fontSize="xs">{item.priceRange}</Text>
              </Box>
              <ChevronRightIcon boxSize={6} />
            </HStack>
          ))}
      </DrawerBody>
    </>
  );
}

function ShippingMethodChildren({
  shippingMethod,
  selectedShippingMethodId,
  onBack,
  onClose,
  onRefresh,
  onSelect,
  buttonProps,
}: {
  shippingMethod: MerchantShippingMethod | undefined;
  selectedShippingMethodId: string;
  onBack: () => void;
  onClose: () => void;
  onRefresh: () => void;
  onSelect: (id: number) => void;
  buttonProps: {
    onClick: () => void;
    isDisabled: boolean;
    isLoading: boolean;
  };
}) {
  if (shippingMethod) {
    return (
      <>
        <DrawerHeader paddingLeft={4} paddingRight={2}>
          <HStack justify="space-between">
            <HStack>
              <ArrowBackIcon color="sea.500" onClick={onBack} />
              <Text fontSize="sm" fontFamily="poppins">
                {shippingMethod.name}
              </Text>
            </HStack>
            <IconButton
              aria-label="close"
              color="brownGrey.500"
              variant="unstyled"
              size="xs"
              icon={<CloseIcon />}
              onClick={onClose}
            />
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <RadioGroup
            name="shipping-method"
            onChange={(value) => onSelect(+value)}
            defaultValue={selectedShippingMethodId}
            iconPosition="right"
            direction="column"
            options={shippingMethod.methods.map((method, idx) => ({
              element: (
                <Box
                  key={method.id}
                  fontSize={12}
                  mb={3}
                  pb={idx !== shippingMethod.methods.length - 1 ? 3 : 0}
                  borderBottom={
                    idx !== shippingMethod.methods.length - 1
                      ? "0.5px solid "
                      : "none"
                  }
                  borderBottomColor="veryLightPink"
                >
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    color={method.isDisabled ? "brownGrey.500" : "charcoalGrey"}
                  >
                    {method.name}
                  </Text>
                  <Text>{method.price}</Text>
                  {(method.isDisabled && (
                    <Box bgColor="cherry.50" rounded="md" py={2} px={3} mt={1}>
                      <Text color="cherry.500">{method.info}</Text>
                    </Box>
                  )) || <Text mt={1}>{method.info}</Text>}
                </Box>
              ),
              isDisabled: method.isDisabled,
              value: method.id.toString(),
            }))}
          />
        </DrawerBody>
        <DrawerFooter boxShadow="rgb(0 0 0 / 10%) 0px 2px 20px 3px">
          <Button width="full" {...buttonProps}>
            Pilih Jasa Pengiriman
          </Button>
        </DrawerFooter>
      </>
    );
  }

  return (
    <DrawerBody>
      <VStack py={5}>
        <Text>Terjadi kesalahan</Text>
        <Button onClick={onRefresh} variant="ghost">
          Refresh
        </Button>
      </VStack>
    </DrawerBody>
  );
}
