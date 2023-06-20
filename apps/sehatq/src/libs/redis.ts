import Redis from "ioredis";
import { ENV } from "@sehatq/constants";

const host =
  process.env.NODE_ENV === "production" ? ENV.LOCAL_REDIS_HOST : ENV.REDIS_HOST;
const port = ENV.REDIS_PORT;
const db = ENV.REDIS_DB;

export const redisClient = new Redis({ port, host, db });

export function generateKey({
  entity,
  type,
  placement,
  nameOfData,
  platform,
}: {
  entity: string;
  type: string;
  placement: string;
  nameOfData: string;
  platform: string;
}) {
  return `${entity}_${type}_${placement}_${nameOfData}_${platform}_${ENV.ENVIRONMENT.toLowerCase()}`;
}

export function generateRedirectKey({
  entity,
  nameOfData,
  platform,
}: {
  entity: "article" | "hcp";
  nameOfData: string;
  platform: "web" | "mweb";
}) {
  return `${entity}_redirection_${nameOfData}_${platform}_${ENV.ENVIRONMENT.toLowerCase()}`;
}
