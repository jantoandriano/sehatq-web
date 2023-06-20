import { saveAs } from "file-saver";
export const saveFile = (fileUrl: string, fileName: string) => {
  saveAs(fileUrl, fileName);
};
