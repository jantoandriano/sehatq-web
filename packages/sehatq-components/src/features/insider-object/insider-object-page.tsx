import { pushInsiderObject } from "@sehatq/utils";
import {
  INSIDER_OBJECT_PAGE_TYPES,
  InsiderObjectPageTypesKey,
} from "@sehatq/constants";

export function InsiderObjectPage(props: { type: InsiderObjectPageTypesKey }) {
  const { type } = props;
  pushInsiderObject({
    page: {
      type: INSIDER_OBJECT_PAGE_TYPES[type],
    },
  });

  return null;
}
