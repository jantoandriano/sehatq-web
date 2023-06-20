import { pushInsiderObject, NOT_AVAILABLE } from "@sehatq/utils";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGetProfile } from "../profile/profile-queries";

export function InsiderObjectUser() {
  const { data: user } = useGetProfile();

  useEffect(() => {
    if (user) {
      pushInsiderObject({
        user: {
          birthday: user.birthDate || NOT_AVAILABLE,
          email: user.email,
          email_optin: true,
          gdpr_optin: true,
          gender: user.gender || NOT_AVAILABLE,
          phone_number: user.phone || NOT_AVAILABLE,
          transaction_count: NOT_AVAILABLE,
          uuid: user.id,
          username: user.name,
          whatsapp_optin: true,
          custom: {
            login_method: Cookies.get("loginMedia") || NOT_AVAILABLE,
          },
        },
      });
    }
  }, [user]);

  return null;
}
