import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box, Button } from "../../../user-interfaces";
import { ChatErrorBoundary, ChatErrorBoundaryProps } from "..";

export default {
  title: "Features / Chat / Error Boundary",
  component: ChatErrorBoundary,
} as Meta;

type ChatErrorBoundaryStory = StoryObj<ChatErrorBoundaryProps>;

function ErrorComponent() {
  const [count, setCount] = useState(0);
  if (count === 5) {
    // Simulate a JS error
    throw new Error("I crashed!");
  }
  return (
    <Button onClick={() => setCount((oldCount) => oldCount + 1)}>
      Click Here: {count}
    </Button>
  );
}

export const Desktop: ChatErrorBoundaryStory = {
  render: (args) => (
    <Box width="777px">
      <ChatErrorBoundary {...args}>
        <ErrorComponent />
      </ChatErrorBoundary>
    </Box>
  ),
};

export const Mobile: ChatErrorBoundaryStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <ChatErrorBoundary {...args}>
        <ErrorComponent />
      </ChatErrorBoundary>
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
