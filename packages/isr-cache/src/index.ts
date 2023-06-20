import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { ENV } from "@sehatq/constants";

function createS3Key(key: string) {
  return `/${ENV.ENVIRONMENT.toLowerCase()}${key}`;
}

export default class ISRCache {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: ENV.AWS_S3_CACHE_REGION,
      credentials: {
        accessKeyId: ENV.AWS_S3_CACHE_ACCESS_KEY,
        secretAccessKey: ENV.AWS_S3_CACHE_SECRET_KEY,
      },
    });
  }

  public async get(key: string) {
    try {
      const result = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: ENV.AWS_S3_CACHE_BUCKET,
          Key: createS3Key(key),
        })
      );
      const data = await result.Body?.transformToString();
      const lastModified = result.LastModified?.getTime();

      return data
        ? {
            value: JSON.parse(data),
            lastModified,
          }
        : null;
    } catch {
      return null;
    }
  }

  public async set(key: string, data: unknown) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: ENV.AWS_S3_CACHE_BUCKET,
        Key: createS3Key(key),
        Body: JSON.stringify(data),
      })
    );
  }
}
