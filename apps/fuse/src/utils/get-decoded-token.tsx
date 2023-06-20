import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export type DecodedToken = {
  channel: string;
};

export function getDecodedToken() {
  const token = Cookies.get("token") as string;
  return jwt_decode<DecodedToken>(token);
}
