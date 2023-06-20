import React from "react";
import { Flex } from "./flex";
import { Stack } from "./stack";
import { Text } from "./text";
import { StarIcon } from "./icons";

export interface StarRatingProps {
  rating: number;
  ratingTotal?: number;
  range?: number;
  iconWidth?: number | string;
  iconHeight?: number | string;
  useSingleStar?: boolean;
  fontSize?: string;
  colorRatingLabel?: string;
}

export function StarRating(props: StarRatingProps) {
  const {
    rating,
    ratingTotal,
    range = 5,
    iconWidth,
    iconHeight,
    useSingleStar,
    fontSize = "xs",
    colorRatingLabel,
  } = props;

  const icons = [];
  for (let i = 1; i <= range; i++) {
    const iconProps = {
      w: iconWidth,
      h: iconHeight,
      color: i <= rating ? "sunflowerYellow.500" : "iceBlue.600",
    };

    icons.push(<StarIcon mr={2} key={i} {...iconProps} />);
  }

  return (
    <Stack direction="row" spacing={1} align="center">
      {useSingleStar ? (
        <>
          <StarIcon w={iconWidth} h={iconHeight} color="sunflowerYellow.500" />
          <Text
            fontSize={fontSize}
            fontWeight="semibold"
            {...(colorRatingLabel && { color: colorRatingLabel })}
          >
            {rating}
          </Text>
        </>
      ) : (
        <Flex>{icons}</Flex>
      )}
      {ratingTotal ? (
        <Text fontSize={fontSize} color="brownGrey.500">
          ({ratingTotal})
        </Text>
      ) : null}
    </Stack>
  );
}
