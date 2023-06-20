import React, { ReactElement, useEffect, useRef } from "react";
import { useAtom, Provider } from "jotai";
import { writeOnlyGQTAtom, gptAtom } from "./google-publisher-tag-atoms";
import { Slot, AdItem, Targets, gpt } from "./google-publisher-tag-utils";

export interface GPTProviderProps {
  ads: AdItem[];
  enabled: boolean;
  children: ReactElement;
  globalTargets?: Targets;
  enableLazyLoad?: boolean;
}

export function GPTHandler(props: GPTProviderProps) {
  const {
    ads,
    enabled,
    children,
    globalTargets,
    enableLazyLoad = true,
  } = props;
  const [, setAtomGPT] = useAtom(writeOnlyGQTAtom);
  const createdSlots = useRef<Slot[]>([]);

  useEffect(() => {
    let abort = false;
    async function createSlots() {
      setAtomGPT({ ads, status: "LOADING" });
      const slots = await gpt.createSlots(ads, enableLazyLoad, globalTargets);
      if (!abort) {
        createdSlots.current = slots;
        setAtomGPT({ ads, status: "SUCCESS" });
      }
    }
    if (enabled) {
      createSlots();
      return () => {
        abort = true;
        if (createdSlots.current.length > 0) {
          gpt.removeSlots(createdSlots.current);
        }
        createdSlots.current = [];
      };
    } else {
      setAtomGPT({ ads, status: "IDLE" });
    }
  }, [ads, enabled, setAtomGPT, enableLazyLoad, globalTargets]);
  return children;
}

export function GPTProvider(props: GPTProviderProps) {
  return (
    <Provider
      initialValues={[
        [
          gptAtom,
          {
            ads: props.ads,
            globalTargets: props.globalTargets,
            status: "IDLE",
          },
        ] as const,
      ]}
    >
      <GPTHandler {...props} />
    </Provider>
  );
}
