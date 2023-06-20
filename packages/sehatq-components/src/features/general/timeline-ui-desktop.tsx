import React from "react";

import { Skeleton, Flex, Box } from "../../user-interfaces";

export type TimelineUIDesktopProps = {
  steps: {
    id: string;
    active: boolean;
    child: React.ReactElement;
  }[];
  color: string;
};

export function TimelineUIDesktop(props: TimelineUIDesktopProps) {
  const { steps, color } = props;
  return (
    <>
      {steps.length &&
        steps.map((step, i) => (
          <Flex
            key={step.id}
            flexWrap="unset"
            position="relative"
            mb={i !== steps.length - 1 ? 4 : 0}
            sx={{
              "&::before": {
                content: '""',
                position: "absolute",
                border: "0.5px solid",
                borderColor: "veryLightPink",
                left: "6px",
                top: step.active ? "22px" : "20px",
                bottom: "-16px",
                display: i === steps.length - 1 ? "none" : "block",
              },
            }}
          >
            <Box
              position="relative"
              display="inline-block"
              width={step.active ? "16px" : "14px"}
              height={step.active ? "16px" : "14px"}
              borderRadius="50%"
              top="3px"
              background={i === 0 ? "white" : "#d8d8d8"}
              border={`${step.active ? "0.5px" : "0px"} solid`}
              borderColor={color}
              mr={4}
              sc={{
                "&::before": {
                  content: '""',
                  position: "absolute",
                  borderRadius: "50%",
                  top: "1px",
                  left: "1px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: color || "sea.500",
                  display: step.active ? "block" : "none",
                },
              }}
            >
              <Box
                position="relative"
                display="inline-block"
                width="12px"
                height="12px"
                borderRadius="50%"
                top="-4.5px"
                left="1.5px"
                background={i === 0 ? color : "#d8d8d8"}
                mr={4}
              />
            </Box>
            {step.child}
          </Flex>
        ))}
    </>
  );
}

export function TimelineUIDesktopSkeleton() {
  return (
    <>
      <Skeleton height="16px" width="200px" />
    </>
  );
}
