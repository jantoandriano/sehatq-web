import React from "react";

import {
  HStack,
  Text,
  ChevronRightIcon,
  Button,
  ReplyRecipeCovidIcon,
} from "../../user-interfaces";

export type RecipeCovidBubbleDesktopProps = {
  onClick: () => void;
};

export function RecipeCovidBubbleDesktop(props: RecipeCovidBubbleDesktopProps) {
  const { onClick } = props;

  return (
    <>
      <Button
        isFullWidth
        rightIcon={<ChevronRightIcon color="charcoalGrey" boxSize={5} />}
        variant="fit"
        color="charcoalGrey"
        justifyContent="space-between"
        borderRadius="lg"
        boxShadow="base"
        minW="260px"
        onClick={onClick}
        p={3}
      >
        <HStack spacing={2.5}>
          <ReplyRecipeCovidIcon boxSize="24px" />
          <Text fontSize="sm" color="charcoalGrey" fontWeight="semibold">
            Resep Covid
          </Text>
        </HStack>
      </Button>
    </>
  );
}
