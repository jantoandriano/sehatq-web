import React, { LegacyRef } from "react";

import {
  Box,
  Flex,
  HStack,
  Icon,
  ArrowForwardIcon,
  ArrowBackIcon,
  IconButton,
} from "../../user-interfaces";

type ClinicCarouselDesktopProps<Item> = {
  viewportRef: LegacyRef<HTMLDivElement>;
  slidesToShow: number;
  slideGap: number;
  scrollSnaps: number[];
  selectedIndex: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  prevBtnEnabled: boolean;
  nextBtnEnabled: boolean;
  scrollTo: (value: number) => void;
  slides: Item[];
  renderSlide: (arg: { slide: Item; index: number }) => React.ReactNode;
  showArrowButton: boolean;
};

export function ClinicCarouselDesktop<Item extends { id: number | string }>(
  props: ClinicCarouselDesktopProps<Item>
) {
  const {
    viewportRef,
    slidesToShow = 2,
    slideGap = 0,
    scrollSnaps,
    selectedIndex,
    scrollPrev,
    prevBtnEnabled,
    nextBtnEnabled,
    scrollNext,
    scrollTo,
    slides,
    renderSlide,
    showArrowButton,
  } = props;

  return (
    <Box>
      <Box position="relative">
        <Box overflow="hidden" ref={viewportRef}>
          <Flex marginX={2}>
            {slides.map((slide, index) => (
              <Box
                key={slide.id}
                flexGrow={0}
                flexShrink={0}
                flexBasis={
                  slidesToShow
                    ? `calc(${100 / slidesToShow}% - ${
                        (slideGap * (slidesToShow - 1) * 4) / slidesToShow
                      }px)`
                    : "auto"
                }
                marginRight={slideGap}
              >
                {renderSlide({ slide, index })}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      <Flex position="relative" justifyContent="center" mt="36px">
        <HStack>
          {scrollSnaps.map((id, idx) => (
            <Box
              key={id}
              {...(idx === selectedIndex
                ? {
                    w: "16px",
                    h: "8px",
                    bgColor: "#269090",
                  }
                : { bgColor: "#EFF3F7", w: "8px", h: "8px" })}
              borderRadius="full"
              cursor="pointer"
              onClick={() => scrollTo(idx)}
            />
          ))}
        </HStack>
        {showArrowButton && (
          <HStack position="absolute" right={0} bottom={0} gap={2}>
            <IconButton
              variant="fit"
              aria-label="back"
              onClick={scrollPrev}
              colorScheme="sea"
              icon={
                <Icon
                  as={ArrowBackIcon}
                  {...(!prevBtnEnabled && { color: "brownGrey.500" })}
                  w={5}
                  h={5}
                />
              }
            />
            <IconButton
              variant="fit"
              aria-label="next"
              onClick={scrollNext}
              colorScheme="sea"
              icon={
                <Icon
                  as={ArrowForwardIcon}
                  {...(!nextBtnEnabled && { color: "brownGrey.500" })}
                  w={5}
                  h={5}
                />
              }
            />
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
