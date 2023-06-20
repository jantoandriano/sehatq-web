/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChakraProps } from "@chakra-ui/react";

type StripUnion<ChakraProp> = Exclude<ChakraProp, Array<any> | Partial<any>>;

export type StripChakraProps<ComponentProps> = {
  [PropertyType in keyof ComponentProps]: PropertyType extends
    | keyof ChakraProps
    | "children"
    ? ComponentProps[PropertyType]
    : StripUnion<ComponentProps[PropertyType]> extends undefined
    ? ComponentProps[PropertyType]
    : StripUnion<ComponentProps[PropertyType]>;
};
