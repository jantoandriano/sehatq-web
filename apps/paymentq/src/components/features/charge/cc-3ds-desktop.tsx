import React from "react";
import { type ModalIFrameProps } from "./cc-3ds";

export function CC3dsDesktop(props: ModalIFrameProps) {
  const { iframeUrl } = props;
  return (
    <>
      {Boolean(iframeUrl) && (
        <iframe
          style={{
            display: "block",
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "999999",
            border: "opx",
          }}
          src={iframeUrl as string}
        />
      )}
    </>
  );
}
