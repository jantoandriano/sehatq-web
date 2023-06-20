import { ENV } from "@sehatq/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data;
  const purgedUrl = req.url?.replace("/api/purge-cloudflare-cdn", "");
  if (purgedUrl) {
    const absoulteUrl = `${ENV.SEHATQ_DOMAIN.replace(
      "https://",
      ""
    )}${purgedUrl}`;
    data = { prefixes: [absoulteUrl] };
  } else {
    data = { purge_everything: true };
  }
  const response = await fetch(`${ENV.CLOUDFLARE_BASE_URL}/purge_cache`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${ENV.CLOUDFLARE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return res.status(response.status).json(await response.json());
}
