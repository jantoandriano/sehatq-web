import { rest } from "msw";
import { hashStringToNumber } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import {
  SubmitConsultationCheckoutVariables,
  SubmitConsultationResponse,
} from "..";

export function generateFakeSubmitConsultationCheckoutResponse(
  variables: SubmitConsultationCheckoutVariables
) {
  const seedKey = hashStringToNumber(JSON.stringify(variables));
  faker.seed(seedKey);
  const from = new Date();
  from.setHours(from.getHours() + 1);
  const to = new Date();
  to.setHours(from.getHours() + 3);
  const expire = faker.date.between(from, to);
  const expireAt = expire.toISOString();
  expire.setMinutes(expire.getMinutes() + 15);
  const waitingEndAt = expire.toISOString();
  return {
    meta: {
      message: `[${faker.datatype.number()}] Cosultation request registered`,
    },
    data: {
      expireAt,
      waitingEndAt,
      status: "pending",
      id: variables.doctorId ? +variables.doctorId : faker.datatype.number(),
      paymentPageUrl: `https://toko.sehatq.com/checkout-digital?digitalToken=${faker.datatype.uuid()}`,
    },
  };
}

export const submitConsultationCheckout = rest.post<
  never,
  never,
  SubmitConsultationResponse
>(
  `${ENV.API}/telemed-service/consultations/checkout`,
  async (req, res, ctx) => {
    const body = await req.json<SubmitConsultationCheckoutVariables>();
    return res(
      ctx.json(generateFakeSubmitConsultationCheckoutResponse({ ...body }))
    );
  }
);
