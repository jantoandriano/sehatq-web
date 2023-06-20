import { rest } from "msw";
import { hashStringToNumber } from "@sehatq/utils";
import { faker } from "@faker-js/faker/locale/id_ID";
import { ENV } from "@sehatq/constants";
import { ForumInputResponse } from "../forum-models";
import { MarkForumAsSpamVariables } from "../forum-queries";

export function generateFakeReportForumSpam(
  variables: MarkForumAsSpamVariables & { type: string }
) {
  const seedKey = hashStringToNumber(JSON.stringify(variables));
  faker.seed(seedKey);
  return {
    meta: {
      message: `[${faker.datatype.number()}] Terima kasih atas laporan Anda!`,
    },
  };
}

export const reportForumSpam = rest.post<never, never, ForumInputResponse>(
  `${ENV.API}/content/report-spam`,
  async (req, res, ctx) => {
    const body = await req.json<MarkForumAsSpamVariables>();
    return res(
      ctx.json(generateFakeReportForumSpam({ type: "forum", ...body }))
    );
  }
);
