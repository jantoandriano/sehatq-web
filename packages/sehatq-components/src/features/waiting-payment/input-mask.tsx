import React from "react";
import { useIMask } from "react-imask";
import { Input, Flex } from "../../user-interfaces";

type InputMaskProps = {
  onChange: (params: string) => void;
};

export function InputMask(props: InputMaskProps) {
  const { onChange } = props;

  const { ref, unmaskedValue } = useIMask(
    {
      mask: "00/00",
    },
    {
      onComplete: (): any => {
        onChange(unmaskedValue);
      },
    }
  );

  return (
    <Flex justifyContent="center" alignItems="center">
      <Input
        placeholder="MM/YY"
        borderRadius="base"
        borderBottom="1px solid"
        borderColor="veryLightPink"
        type="text"
        variant="unstyled"
        _placeholder={{ color: "veryLightPink" }}
        ref={ref as React.RefObject<HTMLInputElement>}
      />
    </Flex>
  );
}
