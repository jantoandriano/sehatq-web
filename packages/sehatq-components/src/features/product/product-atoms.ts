import { atom } from "jotai";
import { MerchantProduct } from "./merchant-product-model";

export const productQuantityAtom = atom(0);
export const merchantProductAtom = atom<MerchantProduct | null>(null);
export const cartActionTypeAtom = atom(null);
export const merchantProductSortByAtom = atom<string | null>(null);
