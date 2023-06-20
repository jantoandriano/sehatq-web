import React, { createContext, useContext, useState } from "react";

interface SelectedPayment {
  selectedPayment: any;
  setSelectedPayment: React.Dispatch<React.SetStateAction<any>>;
}

const SelectedPaymentContext = createContext<SelectedPayment | null>(null);

export const SelectedPaymentProvider = ({ children }: any) => {
  const [selectedPayment, setSelectedPayment] = useState([
    {
      id: 0,
      name: "",
      adminFee: 0,
      imageUrl: "",
      disable: false,
      disabledReason: "",
      slug: "",
    },
  ]);

  return (
    <SelectedPaymentContext.Provider
      value={{ selectedPayment, setSelectedPayment }}
    >
      {children}
    </SelectedPaymentContext.Provider>
  );
};

export const useContextSelectedPayment = () => {
  return useContext(SelectedPaymentContext);
};
