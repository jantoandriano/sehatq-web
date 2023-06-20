export { AssetsProvider, useAssets } from "./assets";
export { type AwaitedReturn } from "./awaited-return";
export { cleanQuery } from "./clean-query";
export { type ConstToUnion } from "./const-to-union";
export {
  formatDate,
  calculateFullAge,
  intervalDays,
  parseToDate,
  convertDateToEnglish,
  getIdDay,
  convertDayNameIdToEn,
  differentInSeconds,
} from "./date-fns";
export { type DistributiveOmit } from "./distributive-omit";
export {
  createBrowserFetch,
  createNodeFetch,
  type Fetch,
  type FetchError,
} from "./fetch";
export { generatePriceDisplay } from "./generate-price-display";
export { isMobileDevice } from "./is-mobile-device";
export {
  NavigationProvider,
  useNavigation,
  type NavigateProps,
  type NavigationValue,
} from "./navigation";
export { nullify } from "./nullify";
export { createRealURL } from "./create-real-url";
export { parseRealURL } from "./parse-real-url";
export { queryToString } from "./query-to-string";
export { getLocationFromBrowser, getLocationFromNode } from "./get-location";
export { toSlug } from "./to-slug";
export { toPascalCase } from "./to-pascal-case";
export { logout } from "./logout";
export { useHasMounted } from "./use-has-mounted";
export { type Rename } from "./rename";
export { getRatingMessage } from "./get-rating-message";
export { getErrorMessage } from "./get-error-message";
export { getErrorStatus } from "./get-error-status";
export { insertHTMLContent } from "./inser-html-content";
export { priceFormat } from "./price-format";
export { saveFile } from "./save-file";
export { slugToName } from "./slug-to-title";
export { pushInsiderObject, NOT_AVAILABLE } from "./insider-object";
export { validatePrefixString } from "./validate-prefix-string";
export { encodeHtml } from "./encode-html";
export { isConsultationBusy } from "./is-consultation-busy";
export {
  mappingSpecialityName,
  mappingSpeciality,
} from "./mapping-speciality-name";
export { isAbsoluteUrl } from "./is-absolute-url";
export { urlSearchParamsToQuery } from "./url-search-params-to-query";
export { hashStringToNumber } from "./hash-string-to-number";
export { translateDay } from "./translate-day";
export { toBase64 } from "./file";
export { getClientIdFromBrowser, getClientIdFromNode } from "./get-client-id";
