import {
  S3Client,
  ListObjectsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ENV } from "@sehatq/constants";
import type { NextApiRequest, NextApiResponse } from "next";

const s3Client = new S3Client({
  region: ENV.AWS_S3_CACHE_REGION,
  credentials: {
    accessKeyId: ENV.AWS_S3_CACHE_ACCESS_KEY,
    secretAccessKey: ENV.AWS_S3_CACHE_SECRET_KEY,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await s3Client.send(
    new ListObjectsCommand({
      Bucket: ENV.AWS_S3_CACHE_BUCKET,
      Prefix: `/${ENV.ENVIRONMENT.toLowerCase()}`,
    })
  );
  const s3Objects = result.Contents ?? [];
  await Promise.all(
    s3Objects.map((s3Object) =>
      s3Client.send(
        new DeleteObjectCommand({
          Bucket: ENV.AWS_S3_CACHE_BUCKET,
          Key: s3Object.Key,
        })
      )
    )
  );
  return res.status(200).json({
    message: `ISR Cache is cleared`,
  });
}
