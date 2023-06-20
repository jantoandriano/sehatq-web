import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MerchantProductCardProps, MerchantProductCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Product / Merchant Product Card",
  component: MerchantProductCard,
} as Meta;

type MerchantProductCardStory = StoryObj<MerchantProductCardProps>;

export const Desktop: MerchantProductCardStory = {
  render: (args) => (
    <Box width="360px">
      <MerchantProductCard {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    name: "Kalbe",
    isOfficialStore: true,
    isSelected: true,
    imageAlt: "Kalbe Logo",
    imageUrl:
      "https://static.sehatq.com/cdn-cgi/image/onerror=redirect/tokoq/products/vgucinrx4oudumgka3qs7omtkad5",
    discountDisplay: "-10%",
    city: "Jakarta Selatan",
    distance: 2,
    originalPriceDisplay: "Rp 320.000",
    sellingPriceDisplay: "Rp 240.000",
    merchantNavigation: {
      name: "MERCHANT_DETAIL",
      query: { slug: "something123" },
    },
    onShowShippingInfo: console.log,
  },
};

export const Mobile: MerchantProductCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
