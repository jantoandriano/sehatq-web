import React, { createContext, useContext, useState } from "react";

type PaymentCheckLimitType = {
  imageUrl?: string;
  name: string;
  covered: number;
  remainingLimit: number;
  excess: number;
  excessWithAdminFee: number;
};

interface CheckLimit {
  stateCheckLimit: PaymentCheckLimitType;
  setStateCheckLimit: React.Dispatch<React.SetStateAction<any>>;
}

const CheckLimitContext = createContext<CheckLimit | null>(null);

export const CheckLimitContextProvider = ({ children }: any) => {
  const [stateCheckLimit, setStateCheckLimit] = useState({
    imageUrl: "",
    name: "",
    covered: 0,
    remainingLimit: 0,
    excess: 0,
    excessWithAdminFee: 0,
  });

  return (
    <CheckLimitContext.Provider value={{ stateCheckLimit, setStateCheckLimit }}>
      {children}
    </CheckLimitContext.Provider>
  );
};

export const useContextCheckLimit = () => {
  return useContext(CheckLimitContext);
};
