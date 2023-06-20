import React, { useState } from "react";
import { IconButton } from "./icon-button";
import { StarIcon } from "./icons";

export type RatingInputValue = "1" | "2" | "3" | "4" | "5";

export type RatingInputProps = {
  rating: RatingInputValue;
  setRating: (value: RatingInputValue) => void;
};

export function RatingInput(props: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(5);
  const { rating, setRating } = props;
  const ratingNum = +rating;
  const selectedColor = "sunflowerYellow.500";
  const unSelectedColor = "veryLightPink";
  return (
    <>
      <IconButton
        variant="fit"
        aria-label="1 star"
        marginLeft={1.5}
        onClick={() => setRating("1")}
        icon={
          <StarIcon
            width={30}
            height={31}
            onMouseEnter={() => setHoverRating(1)}
            onMouseLeave={() => setHoverRating(1)}
            color={
              ratingNum >= 1 || hoverRating >= 1
                ? selectedColor
                : unSelectedColor
            }
            _hover={{ color: selectedColor }}
          />
        }
      />
      <IconButton
        variant="fit"
        aria-label="2 star"
        marginLeft={1.5}
        onClick={() => setRating("2")}
        icon={
          <StarIcon
            width={30}
            height={31}
            onMouseEnter={() => setHoverRating(2)}
            onMouseLeave={() => setHoverRating(2)}
            color={
              ratingNum >= 2 || hoverRating >= 2
                ? selectedColor
                : unSelectedColor
            }
            _hover={{ color: selectedColor }}
          />
        }
      />
      <IconButton
        variant="fit"
        aria-label="3 star"
        marginLeft={1.5}
        onClick={() => setRating("3")}
        icon={
          <StarIcon
            width={30}
            height={31}
            onMouseEnter={() => setHoverRating(3)}
            onMouseLeave={() => setHoverRating(3)}
            color={
              ratingNum >= 3 || hoverRating >= 3
                ? selectedColor
                : unSelectedColor
            }
            _hover={{ color: selectedColor }}
          />
        }
      />
      <IconButton
        variant="fit"
        aria-label="4 star"
        marginLeft={1.5}
        onClick={() => setRating("4")}
        icon={
          <StarIcon
            width={30}
            height={31}
            onMouseEnter={() => setHoverRating(4)}
            onMouseLeave={() => setHoverRating(4)}
            color={
              ratingNum >= 4 || hoverRating >= 4
                ? selectedColor
                : unSelectedColor
            }
            _hover={{ color: selectedColor }}
          />
        }
      />
      <IconButton
        variant="fit"
        aria-label="5 star"
        marginLeft={1.5}
        onClick={() => setRating("5")}
        icon={
          <StarIcon
            width={30}
            height={31}
            onMouseEnter={() => setHoverRating(5)}
            onMouseLeave={() => setHoverRating(5)}
            color={
              ratingNum == 5 || hoverRating == 5
                ? selectedColor
                : unSelectedColor
            }
            _hover={{ color: selectedColor }}
          />
        }
      />
    </>
  );
}
