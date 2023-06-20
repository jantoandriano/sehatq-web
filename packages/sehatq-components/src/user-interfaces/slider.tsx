import React from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { InView } from "react-intersection-observer";
import { Box } from "./box";
import { Flex } from "./flex";
import { IconButton } from "./icon-button";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export interface SliderProps<Item> {
  slides: Array<Item>;
  renderSlide: (arg: {
    slide: Item;
    index: number;
    clickAllowed: (() => boolean) | undefined;
  }) => React.ReactNode;
  slideGap?: number;
  getKey?: (slide: Item) => number | string;
  hideArrowButton?: boolean;
  slidesToShow?: number;
  isLazyLoad?: boolean;
  initialSlideNumber?: number;
  loadMoreSlide?: () => void;
  hasMoreSlideToLoad?: boolean;
  loadingMoreComponent?: React.ReactNode;
  startSlideIndex?: number;
}

export function Slider<Item extends { id: number | string; label?: string }>(
  props: SliderProps<Item>
) {
  const {
    slides,
    renderSlide,
    slidesToShow,
    slideGap = 2,
    loadMoreSlide,
    isLazyLoad = false,
    initialSlideNumber = 0,
    hideArrowButton = false,
    hasMoreSlideToLoad = false,
    loadingMoreComponent = null,
    startSlideIndex = 0,
    getKey = (slide: Item) => slide.id,
  } = props;
  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(false);
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    inViewThreshold: 0,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: startSlideIndex,
  });
  const loadingMore = useSlideInfiniteScroll({
    embla,
    hasMoreSlideToLoad,
    totalSlide: slides.length,
  });

  const onSelect = React.useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  React.useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, onSelect]);

  React.useEffect(() => {
    if (!loadingMore) return;
    if (loadMoreSlide) {
      loadMoreSlide();
    }
  }, [loadMoreSlide, loadingMore]);

  const scrollPrev = React.useCallback(
    () => embla && embla.scrollPrev(),
    [embla]
  );
  const scrollNext = React.useCallback(
    () => embla && embla.scrollNext(),
    [embla]
  );
  return (
    <Box position="relative">
      <Box overflow="hidden" ref={viewportRef}>
        <Flex>
          {slides.map((slide, index) => (
            <Box
              key={getKey(slide)}
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
              {isLazyLoad && slidesToShow ? (
                <InView
                  root={embla?.rootNode() ?? null}
                  rootMargin="0px 50%"
                  initialInView={index < initialSlideNumber}
                >
                  {({ inView, ref }) => (
                    <Box ref={ref} height="100%">
                      {inView
                        ? renderSlide({
                            slide,
                            index,
                            clickAllowed: embla?.clickAllowed,
                          })
                        : null}
                    </Box>
                  )}
                </InView>
              ) : (
                renderSlide({
                  slide,
                  index,
                  clickAllowed: embla?.clickAllowed,
                })
              )}
            </Box>
          ))}
          {hasMoreSlideToLoad ? loadingMoreComponent : null}
        </Flex>
      </Box>
      {!hideArrowButton && (
        <>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </>
      )}
    </Box>
  );
}

interface NavButtonProps {
  enabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PrevButton = ({ enabled, onClick }: NavButtonProps) =>
  enabled ? (
    <IconButton
      isRound
      boxShadow="xl"
      onClick={onClick}
      aria-label="Prev Slide"
      icon={<ChevronLeftIcon color="main.500" boxSize="32px" />}
      backgroundColor="white"
      _hover={{
        backgroundColor: "white",
      }}
      position="absolute"
      left="-20px"
      top="50%"
      transform="translateY(-50%)"
    />
  ) : null;

const NextButton = ({ enabled, onClick }: NavButtonProps) =>
  enabled ? (
    <IconButton
      isRound
      boxShadow="xl"
      onClick={onClick}
      aria-label="Next Slide"
      icon={<ChevronRightIcon color="main.500" boxSize="32px" />}
      backgroundColor="white"
      _hover={{
        backgroundColor: "white",
      }}
      position="absolute"
      right="-20px"
      top="50%"
      transform="translateY(-50%)"
    />
  ) : null;

interface UseSlideInfiniteScroll {
  totalSlide: number;
  hasMoreSlideToLoad: boolean;
  embla?: EmblaCarouselType;
}

const useSlideInfiniteScroll = ({
  embla,
  totalSlide,
  hasMoreSlideToLoad,
}: UseSlideInfiniteScroll) => {
  const scrollListener = React.useRef<() => void>();
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [pointerIsDown, setPointerIsDown] = React.useState(false);

  const setPointerDown = React.useCallback(() => setPointerIsDown(true), []);
  const setPointerNotDown = React.useCallback(
    () => setPointerIsDown(false),
    []
  );

  const lastSlideIsInView = React.useCallback(() => {
    if (!embla) return false;
    const lastSlide = embla.slideNodes().length - 1;
    return embla.slidesInView().indexOf(lastSlide) !== -1;
  }, [embla]);

  const onScroll = React.useCallback(() => {
    if (!embla) return;
    setLoadingMore((isLoadingMore) => {
      if (isLoadingMore) return true;
      const shouldLoadMore = lastSlideIsInView();
      if (shouldLoadMore && scrollListener.current) {
        embla.off("scroll", scrollListener.current);
      }
      return shouldLoadMore;
    });
  }, [embla, setLoadingMore, lastSlideIsInView]);

  const addScrollListener = React.useCallback(() => {
    if (!embla || !hasMoreSlideToLoad) return;
    scrollListener.current = () => onScroll();
    embla.on("scroll", scrollListener.current);
  }, [embla, hasMoreSlideToLoad, onScroll]);

  const reloadEmbla = React.useCallback(() => {
    if (!embla) return;
    const oldEngine = embla.internalEngine();
    embla.reInit();
    const newEngine = embla.internalEngine();
    const propsToCopy = ["scrollBody", "location", "target"] as const;
    propsToCopy.forEach((p) => Object.assign(newEngine[p], oldEngine[p]));
    const { index } = newEngine.scrollTarget.byDistance(0, false);
    newEngine.index.set(index);
    newEngine.animation.start();
    setLoadingMore(false);
  }, [embla]);

  React.useEffect(() => {
    if (
      !embla ||
      totalSlide === embla.slideNodes().length - 1 ||
      !hasMoreSlideToLoad
    ) {
      return;
    }
    const engine = embla.internalEngine();
    const boundsActive = engine.limit.reachedMax(engine.target.get());
    engine.scrollBounds.toggleActive(boundsActive);
  }, [embla, totalSlide, hasMoreSlideToLoad]);

  React.useEffect(() => {
    if (!embla || !hasMoreSlideToLoad || pointerIsDown) return;
    if (totalSlide === embla.slideNodes().length - 1) return;
    reloadEmbla();
    addScrollListener();
  }, [
    embla,
    totalSlide,
    pointerIsDown,
    hasMoreSlideToLoad,
    reloadEmbla,
    addScrollListener,
  ]);

  React.useEffect(() => {
    if (!embla || hasMoreSlideToLoad) return;
    if (totalSlide === embla.slideNodes().length) return;
    if (pointerIsDown && !lastSlideIsInView()) return;
    reloadEmbla();
    embla.off("pointerDown", setPointerDown);
    embla.off("pointerUp", setPointerNotDown);
  }, [
    embla,
    totalSlide,
    hasMoreSlideToLoad,
    pointerIsDown,
    setPointerDown,
    setPointerNotDown,
    reloadEmbla,
    lastSlideIsInView,
  ]);

  React.useEffect(() => {
    if (!embla) return;
    embla.on("pointerDown", setPointerDown);
    embla.on("pointerUp", setPointerNotDown);
    addScrollListener();
  }, [embla, setPointerDown, setPointerNotDown, addScrollListener]);

  return loadingMore;
};
