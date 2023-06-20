type dataLayerObj = {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  userId?: number;
  channel?: string;
  event?: string;
  ecommerce?: object;
  eventCallback?: () => void;
};

export function setDataLayerObject(
  isEcommerce: boolean,
  attr: object,
  data?: object,
  eventCallback?: () => void
) {
  let datalayer: dataLayerObj = {};
  if (isEcommerce && data) {
    datalayer.ecommerce = data;
  }

  if (attr) {
    datalayer = { ...attr, ...datalayer };
  }

  if (eventCallback && typeof eventCallback === "function") {
    datalayer.eventCallback = eventCallback;
  }

  if (typeof window !== "undefined" && window.dataLayer) {
    const dl = window.dataLayer;
    if (dl) {
      dl.push(datalayer);
    }
  }
}
