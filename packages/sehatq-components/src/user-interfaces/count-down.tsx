import React, { useEffect, useState, useRef } from "react";
import { Text, TextProps } from "./text";

export type CountDownProps = TextProps & {
  startText?: string;
  startCount: number;
  tickCallback?: (count: number) => void;
};

export function CountDown(props: CountDownProps) {
  const { startCount, tickCallback, startText, ...textProps } = props;
  const [currentCount, setCurrentCount] = useState(+startCount);
  const intevalIdRef = useRef<NodeJS.Timeout | null>(null);
  const refTickCallback = useRef(tickCallback);
  refTickCallback.current = tickCallback;
  useEffect(() => {
    function clear() {
      if (intevalIdRef.current !== null) {
        clearInterval(intevalIdRef.current);
        intevalIdRef.current = null;
      }
    }
    function tick() {
      if (refTickCallback.current) {
        refTickCallback.current(currentCount);
      }
      if (currentCount > 0) {
        setCurrentCount((oldCount) => oldCount - 1);
      } else if (intevalIdRef.current) {
        clear();
      }
    }
    intevalIdRef.current = setInterval(tick, 1000);
    return clear;
  }, [currentCount]);
  const hours = Math.floor(currentCount / 3600);
  const minutes = Math.floor((currentCount % 3600) / 60);
  const times = currentCount % 60;
  return (
    <Text {...textProps} as="span">
      {startText ? `${startText} ` : ""}
      {hours === 0 ? null : `${hours < 10 ? "0" : ""}${hours}:`}
      {minutes < 10 ? "0" : ""}
      {minutes}:{times < 10 ? "0" : ""}
      {times}
    </Text>
  );
}
