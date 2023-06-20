import { rest } from "msw";
import { hashStringToNumber } from "@sehatq/utils";
import { faker } from "@faker-js/faker/locale/id_ID";
import { ENV } from "@sehatq/constants";
import { ForumInputResponse } from "../forum-models";
import { SubmitForumVariables } from "../forum-queries";

export function generateFakeSubmitForumResponse(
  variables: SubmitForumVariables
) {
  const seedKey = hashStringToNumber(JSON.stringify(variables));
  faker.seed(seedKey);
  return {
    meta: {
      message: `[${faker.datatype.number()}] Pertanyaan berhasil disimpan`,
    },
  };
}

export const submitForum = rest.post<never, never, ForumInputResponse>(
  `${ENV.API}/content/forums`,
  async (req, res, ctx) => {
    const body = await req.json<SubmitForumVariables>();
    return res(ctx.json(generateFakeSubmitForumResponse({ ...body })));
  }
);
