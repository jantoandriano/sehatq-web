import { IFields, IState } from "./credit-card-reducer";
import { InstallmentsOptions } from "./credit-card-types";

export function generateCCBody(
  installmentsOptions: InstallmentsOptions[] | undefined,
  stateForm: IState
): { period: number; id: number } | undefined {
  if (installmentsOptions && installmentsOptions.length) {
    return installmentsOptions.find(
      (item) => String(item.id) === stateForm.values.purchase
    );
  }
  return {
    period: 0,
    id: 0,
  };
}

export function generateCardData(params: IFields) {
  const { cardNumber, cardCVV } = params;
  const [cardExpMonth, cardExpYear] = params.cardExp.split("/");
  return {
    card_number: Number(cardNumber),
    card_exp_month: Number(cardExpMonth),
    card_exp_year: Number(`20${cardExpYear}`) /** add prefix 20 to year */,
    card_cvv: Number(cardCVV),
  };
}
