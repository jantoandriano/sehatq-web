import React from "react";
import { Meta } from "@storybook/react";
import { Stack, Button, useToast } from "..";

export default {
  title: "UI / Toast",
} as Meta;

function ToastExample() {
  const toast = useToast();
  return (
    <Stack direction="row">
      <Button
        onClick={() => toast({ message: "Hello from toast", status: "error" })}
      >
        Desktop
      </Button>
      <Button
        onClick={() =>
          toast({
            message: "Hai from toast",
            status: "success",
          })
        }
      >
        Mobile
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Greeting",
            message: "Hai from toast",
            status: "success",
          })
        }
      >
        With Title
      </Button>
    </Stack>
  );
}

export const General = {
  render: () => <ToastExample />,
};
