import {
  VeryBadEmoteIcon,
  BadEmoteIcon,
  FlatEmoteIcon,
  HappyEmoteIcon,
  VeryHappyEmoteIcon,
} from "../../user-interfaces";

export const GOOD_CUSTOMER_SERVICE_REVIEW_TAGS = [
  "Pelayanan cepat",
  "Jawaban membantu",
  "Ramah",
];

export const BAD_CUSTOMER_SERVICE_REVIEW_TAGS = [
  "Pelayanan lambat",
  "Respon kurang cepat",
  "Kurang membantu",
];

export const CUSTOMER_SERVICE_REVIEW_OPTIONS = {
  veryBad: {
    value: 1,
    id: "veryBad",
    name: "Buruk",
    color: "cherry.500",
    bgColor: "lavenderBlush",
    tags: BAD_CUSTOMER_SERVICE_REVIEW_TAGS,
    icon: VeryBadEmoteIcon,
  },
  bad: {
    value: 2,
    id: "bad",
    name: "Tidak Baik",
    color: "squash.500",
    bgColor: "oldLace",
    tags: BAD_CUSTOMER_SERVICE_REVIEW_TAGS,
    icon: BadEmoteIcon,
  },
  good: {
    value: 3,
    id: "good",
    name: "Cukup Baik",
    color: "sunflowerYellow.500",
    bgColor: "butterflyWhite",
    tags: BAD_CUSTOMER_SERVICE_REVIEW_TAGS,
    icon: FlatEmoteIcon,
  },
  satisfied: {
    value: 4,
    id: "satisfied",
    name: "Puas",
    color: "main.500",
    bgColor: "azure.50",
    tags: GOOD_CUSTOMER_SERVICE_REVIEW_TAGS,
    icon: HappyEmoteIcon,
  },
  verySatisfied: {
    value: 5,
    id: "verySatisfied",
    name: "Sangat Puas",
    color: "sea.500",
    bgColor: "azure.50",
    tags: GOOD_CUSTOMER_SERVICE_REVIEW_TAGS,
    icon: VeryHappyEmoteIcon,
  },
} as const;

export type CustomerServiceReviewOptionKey =
  keyof typeof CUSTOMER_SERVICE_REVIEW_OPTIONS;
