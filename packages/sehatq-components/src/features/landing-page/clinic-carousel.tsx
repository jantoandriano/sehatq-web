import React, { useState, useCallback, useEffect } from "react";

import useEmblaCarousel from "embla-carousel-react";
import { ClinicCarouselDesktop } from "./clinic-carousel-desktop";

export type ClinicCarouselProps<Item> = {
  slides: Array<Item>;
  renderSlide: (arg: { slide: Item; index: number }) => React.ReactNode;
  slidesToShow?: number;
  slideGap?: number;
  showArrowButton?: boolean;
};

export function ClinicCarousel<Item extends { id: number | string }>(
  props: ClinicCarouselProps<Item>
) {
  const {
    slides = [],
    showArrowButton = true,
    slidesToShow = 3,
    slideGap = 0,
    renderSlide,
  } = props;
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const newProps = {
    viewportRef,
    slidesToShow,
    slideGap,
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
  };
  return <ClinicCarouselDesktop {...newProps} />;
}
