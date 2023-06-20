import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useAssets } from "@sehatq/utils";
import { Img, ImgProps } from "..";

export default {
  title: "UI / Constrained Image",
  component: Img,
} as Meta;

type ImageStory = StoryObj<ImgProps>;

const src = "https://bit.ly/2jYM25F";
const alt = "Woman paying for a purchase";

export const Intrinsic: ImageStory = {
  render: (args) => <Img {...args} />,
  args: {
    src,
    alt,
    width: 600,
    height: 400,
  },
};

export const Responsive: ImageStory = {
  render: (args) => <Img {...args} />,
  args: {
    src,
    alt,
    width: 300,
    height: 200,
    layout: "responsive",
    wrapperProps: { width: "600px" },
  },
};

export const Fixed: ImageStory = {
  render: (args) => <Img {...args} />,
  args: {
    src,
    alt,
    width: 225,
    height: 150,
    layout: "fixed",
  },
};

export const Fill: ImageStory = {
  render: (args) => <Img {...args} />,
  args: {
    src,
    alt,
    layout: "fill",
    objectFit: "cover",
    wrapperProps: {
      boxSize: "150px",
      position: "relative",
      borderRadius: "full",
      overflow: "hidden",
    },
  },
};

function ImageWithAssets() {
  const ASSETS = useAssets(["BG_TES_KESEHATAN"]);
  return (
    <Img
      src={ASSETS.BG_TES_KESEHATAN}
      alt="Profile Placeholder Man"
      width={656}
      height={280}
    />
  );
}

export const WithAssets: ImageStory = {
  render: () => <ImageWithAssets />,
};
