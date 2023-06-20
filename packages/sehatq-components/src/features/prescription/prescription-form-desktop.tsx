import React from "react";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  VStack,
} from "../../user-interfaces";
import { ImagesInput } from "../general/images-input";
import { ShippingAddressInput } from "../profile";
import { Fields, FieldUnion } from "./prescription-form-reducer";

export type PrescriptionFormGeneralProps = {
  values: Fields;
  onChangeInput: (field: FieldUnion) => void;
  errors?: Record<string, string | undefined>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  consultationId?: string;
};

export function PrescriptionFormDesktop(props: PrescriptionFormGeneralProps) {
  return (
    <VStack
      width="full"
      align="start"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      p={4}
      spacing={6}
      divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
    >
      <VStack width="full" align="start" spacing={4}>
        {props.consultationId ? (
          <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
            Catatan Penebusan Resep
          </Text>
        ) : (
          <>
            <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
              Foto Resep (Maks. 5 Foto)
            </Text>
            <ImagesInput
              maxFile={5}
              onChange={(value) =>
                props.onChangeInput({
                  name: "images",
                  value: value.map((item, index) => ({
                    id: index + 1,
                    base64: item.preview,
                  })),
                })
              }
            />
          </>
        )}
        <FormControl variant="floating" position="relative">
          <Textarea
            value={props.values.notes ?? ""}
            border="1px solid"
            borderRadius="base"
            maxLength={255}
            height="120px"
            fontSize="md"
            onChange={(e) => {
              e.preventDefault();
              props.onChangeInput({ name: "notes", value: e.target.value });
            }}
            background="white"
            placeholder="Catatan Penebusan Resep (opsional)"
          />
          <FormLabel>Catatan</FormLabel>
          <Text
            zIndex="docked"
            position="absolute"
            right={3}
            bottom={2}
            fontSize="xs"
            color="brownGrey.500"
          >{`${props.values.notes?.length ?? 0}/255`}</Text>
        </FormControl>
      </VStack>
      <VStack width="full" align="start" spacing={6}>
        <ShippingAddressInput
          value={props.values.userAddressId}
          onChange={(value) =>
            props.onChangeInput({ name: "userAddressId", value })
          }
        />
        <Button
          variant="solid"
          height="40px"
          borderRadius="base"
          fontSize="md"
          fontWeight="semibold"
          width="full"
          onClick={props.onSubmit}
          disabled={props.isLoading}
          isLoading={props.isLoading}
        >
          Tebus Resep
        </Button>
      </VStack>
    </VStack>
  );
}
