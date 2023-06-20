import React, { forwardRef, useEffect } from "react";
import { useIMask } from "react-imask";
import { Input, Flex } from "@sehatq/components";

type InputMaskProps = {
  onChange: (params: string) => void;
};

export const InputMask = forwardRef(function InputMask(props: InputMaskProps) {
  const { onChange } = props;

  const { ref } = useIMask(
    {
      mask: "00/00",
    },
    {
      onComplete(value) {
        onChange(value);
      },
    }
  );

  useEffect(() => {
    if (ref.current?.value) {
      ref.current.value = "";
    }
  }, []);

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
});
