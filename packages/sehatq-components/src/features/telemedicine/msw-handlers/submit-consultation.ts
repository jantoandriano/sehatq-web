import { rest } from "msw";
import { hashStringToNumber } from "@sehatq/utils";
import { faker } from "@faker-js/faker/locale/id_ID";
import { ENV } from "@sehatq/constants";
import {
  SubmitConsultationVariables,
  SubmitConsultationRatingVariables,
  SubmitConsultationResponse,
  ConsultationRatingResponse,
} from "..";

export function generateFakeSubmitConsultationResponse(
  variables: SubmitConsultationVariables
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
      message: variables.consultationId
        ? `[${faker.datatype.number()}] Cosultation request updated`
        : `[${faker.datatype.number()}] Cosultation request registered`,
    },
    data: {
      expireAt,
      waitingEndAt,
      status: "pending",
      id: variables.consultationId
        ? +variables.consultationId
        : faker.datatype.number(),
      paymentPageUrl:
        variables.status === "initToPending"
          ? ""
          : variables.drug
          ? faker.helpers.arrayElement([
              `https://toko.sehatq.com/checkout-digital?digitalToken=${faker.datatype.uuid()}`,
              "",
            ])
          : `https://toko.sehatq.com/checkout-digital?digitalToken=${faker.datatype.uuid()}`,
    },
  };
}

export const submitConsultation = rest.post<
  never,
  never,
  SubmitConsultationResponse
>(`${ENV.API}/telemed-service/consultations`, async (req, res, ctx) => {
  const body = await req.json<SubmitConsultationVariables>();
  return res(ctx.json(generateFakeSubmitConsultationResponse({ ...body })));
});

export const updateConsultation = rest.post<
  never,
  { consultationId: string },
  SubmitConsultationResponse
>(
  `${ENV.API}/telemed-service/consultations/:consultationId`,
  async (req, res, ctx) => {
    const { consultationId } = req.params;
    const body = await req.json<SubmitConsultationVariables>();
    return res(
      ctx.json(
        generateFakeSubmitConsultationResponse({ ...body, consultationId })
      )
    );
  }
);

export function generateFakeSubmitConsultationRatingResponse(
  variables: SubmitConsultationRatingVariables
) {
  const seedKey = hashStringToNumber(JSON.stringify(variables));
  faker.seed(seedKey);
  const data: [] = [];
  return {
    meta: {
      message: "Feedback diterima",
    },
    data,
  };
}

export const submitConsultationRating = rest.post<
  never,
  { consultationId: string },
  ConsultationRatingResponse
>(
  `${ENV.API}/telemed-service/consultations/:consultationId/rating`,
  async (req, res, ctx) => {
    const { consultationId } = req.params;
    const body = await req.json<SubmitConsultationRatingVariables>();
    return res(
      ctx.json(
        generateFakeSubmitConsultationRatingResponse({
          ...body,
          consultationId,
        })
      )
    );
  }
);
