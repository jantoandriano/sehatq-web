import { useGetProfile } from "./profile-queries";
export function Authenticated() {
  useGetProfile({ redirectToLogin: true });
  return null;
}
