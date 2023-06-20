import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useAssets } from "@sehatq/utils";
import { Image, ImageProps } from "..";

export default {
  title: "UI / Image",
  component: Image,
} as Meta;

type ImageStory = StoryObj<ImageProps>;

export const Basic: ImageStory = {
  // eslint-disable-next-line jsx-a11y/alt-text
  render: (args) => <Image {...args} />,
  args: {
    src: "https://bit.ly/2jYM25F",
    alt: "Woman paying for a purchase",
    width: "200px",
  },
};

function ImageWithAssets() {
  const ASSETS = useAssets(["BG_TES_KESEHATAN"]);
  return (
    <Image
      src={ASSETS.BG_TES_KESEHATAN}
      alt="Profile Placeholder Man"
      width="200px"
    />
  );
}

export const WithAssets: ImageStory = {
  render: () => <ImageWithAssets />,
};
