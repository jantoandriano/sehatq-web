import React from "react";
import { Img } from "../img";

const ImageContext = React.createContext<typeof Img>(Img);

export const ImageProvider = ImageContext.Provider;

export function useImage() {
  return React.useContext(ImageContext);
}
