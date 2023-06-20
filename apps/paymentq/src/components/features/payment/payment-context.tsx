import { createContext } from "react";

export type ctxObjProps = {
  isLoading: boolean;
};

export const ctxObj: ctxObjProps = {
  isLoading: false,
};
const PaymentContext = createContext(ctxObj);

export default PaymentContext;
