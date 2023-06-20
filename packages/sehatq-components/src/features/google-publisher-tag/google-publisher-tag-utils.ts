export type FluidItem = ["fluid"];
export type SizeItem = [number, number];

export type Size = FluidItem | SizeItem | SizeItem[];

export type Target = [string, string | string[]];

export type AdItem =
  | {
      unitPath: string;
      size: Size;
      divId: string;
      targets?: Targets;
    }
  | {
      unitPath: string;
      outOfPageId: "BOTTOM_ANCHOR" | "INTERSTITIAL" | "REWARDED" | "TOP_ANCHOR";
      targets?: Targets;
    };

export type Targets = Target[];

const googleTag = () => {
  const global = window as any;

  global.googletag = global.googletag || {};
  global.googletag.cmd = global.googletag.cmd || [];

  return global.googletag;
};

export type Slot = Record<string, () => void>;

export const gpt = {
  createSlots: (
    ads: AdItem[],
    enableLazyload: boolean,
    globalTargets: Targets = []
  ) => {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    return new Promise<Slot[]>((resolve) => {
      googleTag().cmd.push(() => {
        googleTag().pubads().collapseEmptyDivs();
        const outOfPageSlots: Slot[] = [];
        const slots: Slot[] = [];
        ads.forEach((ad) => {
          if ("outOfPageId" in ad) {
            const { unitPath, outOfPageId, targets = [] } = ad;
            const outOfPageSlot = googleTag().defineOutOfPageSlot(
              unitPath,
              googleTag().enums.OutOfPageFormat[outOfPageId]
            );
            if (outOfPageSlot) {
              outOfPageSlot.addService(googleTag().pubads());
              targets.forEach(([key, value]) => {
                outOfPageSlot.setTargeting(key, value);
              });
              outOfPageSlots.push(outOfPageSlot);
            }
          } else {
            const { unitPath, size, divId, targets = [] } = ad;
            const slot = googleTag().defineSlot(unitPath, size, divId);
            if (slot) {
              slot.addService(googleTag().pubads());
              targets.forEach(([key, value]) => {
                slot.setTargeting(key, value);
              });
              slots.push(slot);
            }
          }
        });

        globalTargets.forEach(([key, value]) => {
          googleTag().pubads().setTargeting(key, value);
        });

        if (enableLazyload) {
          googleTag().pubads().enableLazyLoad({
            fetchMarginPercent: 500,
            renderMarginPercent: 200,
            mobileScaling: 2.0,
          });
        } else {
          googleTag().pubads().enableSingleRequest();
        }
        if (!googleTag().pubadsReady) {
          googleTag().enableServices();
        }
        if (enableLazyload) {
          outOfPageSlots.forEach((outOfPageSlot) => {
            googleTag().display(outOfPageSlot);
          });
        }
        resolve([...slots, ...outOfPageSlots]);
      });
    });
  },
  showSlot: (divId: string) => {
    googleTag().cmd.push(() => {
      googleTag().display(divId);
    });
  },
  removeSlots: (slots?: Slot[]) => {
    googleTag().cmd.push(() => {
      googleTag().destroySlots(slots);
    });
  },
};

export function getWidth(size: Size | null) {
  return !size || typeof size[0] === "string"
    ? null
    : typeof size[0] === "number"
    ? size[0]
    : Math.max(
        ...size.map((unit) => (typeof unit === "object" ? unit[0] : -1))
      );
}

export function getHeight(size: Size | null) {
  return !size || typeof size[0] === "string"
    ? null
    : typeof size[0] === "number"
    ? size[1]
    : Math.min(
        ...size.map((unit) => (typeof unit === "object" ? unit[1] : -1))
      );
}
