/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Box, BoxProps } from "./box";

const VALID_LAYOUT_VALUES = [
  "fill",
  "fixed",
  "intrinsic",
  "responsive",
  undefined,
] as const;
type LayoutValue = typeof VALID_LAYOUT_VALUES[number];

const VALID_LOADING_VALUES = ["lazy", "eager"] as const;
type LoadingValue = typeof VALID_LOADING_VALUES[number];

type PlaceholderValue = "blur" | "empty";

type ImgElementStyle = NonNullable<JSX.IntrinsicElements["img"]["style"]>;

type GeneralImgProps = Omit<
  JSX.IntrinsicElements["img"],
  "src" | "srcSet" | "ref" | "width" | "height" | "loading"
> & {
  src: string;
  errorSrc?: string;
  priority?: boolean;
  loading?: LoadingValue;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  wrapperProps?: BoxProps;
};

export type ImgProps =
  | (GeneralImgProps & {
      width: number;
      height: number;
      layout?: "fixed" | "intrinsic" | "responsive";
    })
  | (GeneralImgProps & {
      layout: "fill";
      objectFit: ImgElementStyle["objectFit"];
      objectPosition?: ImgElementStyle["objectPosition"];
    });

type ImageElementProps = Omit<ImgProps, "src" | "wrapperProps"> & {
  srcString: string;
  layout: LayoutValue;
  imgStyle: ImgElementStyle;
  blurStyle: ImgElementStyle;
  loading?: LoadingValue;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export function Img({
  src,
  priority = false,
  loading,
  className,
  style,
  placeholder = "empty",
  blurDataURL,
  wrapperProps,
  ...all
}: ImgProps) {
  const rest: Partial<ImgProps> = all;
  let layout: NonNullable<LayoutValue> = "intrinsic";
  if ("layout" in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout;

    // Remove property so it's not spread into image:
    delete rest["layout"];
  }

  let widthInt, heightInt;
  if ("width" in rest && "height" in rest) {
    widthInt = rest.width;
    delete rest["width"];
    heightInt = rest.height;
    delete rest["height"];
  }

  let objectFit;
  if ("objectFit" in rest) {
    objectFit = rest.objectFit;
    delete rest["objectFit"];
  }

  let objectPosition;
  if ("objectPosition" in rest) {
    objectPosition = rest.objectPosition;
    delete rest["objectPosition"];
  }

  const wrapperStyle: JSX.IntrinsicElements["span"]["style"] = {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    boxSizing: "border-box",
    display: "block",
    overflow: "hidden",
    width: "initial",
    height: "initial",
    background: "none",
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0,
  };
  const sizerStyle: JSX.IntrinsicElements["span"]["style"] = {
    boxSizing: "border-box",
    display: "block",
    width: "initial",
    height: "initial",
    background: "none",
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0,
  };
  let hasSizer = false;
  let sizerSvgUrl: string | undefined;
  const layoutStyle: ImgElementStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    boxSizing: "border-box",
    padding: 0,
    border: "none",
    margin: "auto",

    display: "block",
    width: 0,
    height: 0,
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    maxHeight: "100%",

    objectFit,
    objectPosition,
  };

  if (process.env.NODE_ENV !== "production") {
    if (!src) {
      throw new Error(
        `Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify(
          { width: widthInt, height: heightInt }
        )}`
      );
    }
    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(
        `Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(
          String
        ).join(",")}.`
      );
    }
    if (
      (typeof widthInt !== "undefined" && isNaN(widthInt)) ||
      (typeof heightInt !== "undefined" && isNaN(heightInt))
    ) {
      throw new Error(
        `Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`
      );
    }
    if (layout === "fill" && (widthInt || heightInt)) {
      console.warn(
        `Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`
      );
    }
    if (![...VALID_LOADING_VALUES, undefined].includes(loading)) {
      throw new Error(
        `Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(
          String
        ).join(",")}.`
      );
    }
    if (priority && loading === "lazy") {
      throw new Error(
        `Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`
      );
    }
    if (placeholder === "blur") {
      if (layout !== "fill" && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(
          `Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`
        );
      }
      if (!blurDataURL) {
        const VALID_BLUR_EXT = ["jpeg", "png", "webp", "avif"]; // should match next-image-loader

        throw new Error(
          `Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(
              ","
            )}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`
        );
      }
    }
    if ("ref" in rest) {
      console.warn(
        `Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoadingComplete" property instead.`
      );
    }

    if (style) {
      const overwrittenStyles = Object.keys(style).filter(
        (key) => key in layoutStyle
      );
      if (overwrittenStyles.length) {
        console.warn(
          `Image with src ${src} is assigned the following styles, which are overwritten by automatically-generated styles: ${overwrittenStyles.join(
            ", "
          )}`
        );
      }
    }
  }

  const imgStyle = Object.assign({}, style, layoutStyle);

  const blurStyle =
    placeholder === "blur"
      ? {
          filter: "blur(20px)",
          backgroundSize: objectFit || "cover",
          backgroundImage: `url("${blurDataURL}")`,
          backgroundPosition: objectPosition || "0% 0%",
        }
      : {};
  if (layout === "fill") {
    // <Image src="i.png" layout="fill" />
    wrapperStyle.display = "block";
    wrapperStyle.position = "absolute";
    wrapperStyle.top = 0;
    wrapperStyle.left = 0;
    wrapperStyle.bottom = 0;
    wrapperStyle.right = 0;
  } else if (
    typeof widthInt !== "undefined" &&
    typeof heightInt !== "undefined"
  ) {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;
    if (layout === "responsive") {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle.display = "block";
      wrapperStyle.position = "relative";
      hasSizer = true;
      sizerStyle.paddingTop = paddingTop;
    } else if (layout === "intrinsic") {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle.display = "inline-block";
      wrapperStyle.position = "relative";
      wrapperStyle.maxWidth = "100%";
      hasSizer = true;
      sizerStyle.maxWidth = "100%";
      sizerSvgUrl = `data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${widthInt}%27%20height=%27${heightInt}%27/%3e`;
    } else if (layout === "fixed") {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle.display = "inline-block";
      wrapperStyle.position = "relative";
      wrapperStyle.width = widthInt;
      wrapperStyle.height = heightInt;
    }
  } else {
    // <Image src="i.png" />
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`
      );
    }
  }

  const srcString: string = src;

  const imgElementArgs = {
    layout,
    className,
    imgStyle,
    blurStyle,
    loading,
    placeholder,
    srcString,
    ...rest,
  };
  return (
    <>
      <Box
        as="span"
        display={layout === "responsive" ? "block" : "inherit"}
        position="relative"
        {...wrapperProps}
      >
        <span style={wrapperStyle}>
          {hasSizer ? (
            <span style={sizerStyle}>
              {sizerSvgUrl ? (
                <img
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                  }}
                  alt=""
                  aria-hidden={true}
                  src={sizerSvgUrl}
                />
              ) : null}
            </span>
          ) : null}
          <ImageElement {...imgElementArgs} />
        </span>
      </Box>
      {priority ? (
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would likely cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        <link
          key={"__nimg-" + srcString}
          rel="preload"
          as="image"
          href={srcString}
        />
      ) : null}
    </>
  );
}

const ImageElement = ({
  layout,
  className,
  imgStyle,
  blurStyle,
  placeholder,
  loading,
  srcString,
  ...rest
}: ImageElementProps) => {
  return (
    <>
      <img
        {...rest}
        src={srcString}
        decoding="async"
        data-nimg={layout}
        className={className}
        style={{ ...imgStyle, ...blurStyle }}
      />
      {placeholder === "blur" && (
        <noscript>
          <img
            {...rest}
            src={srcString}
            decoding="async"
            data-nimg={layout}
            style={imgStyle}
            className={className}
            loading={loading || "lazy"}
          />
        </noscript>
      )}
    </>
  );
};
