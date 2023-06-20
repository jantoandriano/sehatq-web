import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const revalidatedUrl = req.url?.replace("/api/revalidate-page", "") || "/";
  await res.revalidate(revalidatedUrl);
  return res.status(200).json({
    message: `${revalidatedUrl} is revalidated`,
  });
}
