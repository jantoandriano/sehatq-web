import { useEffect, useCallback } from "react";
import {
  useRegisterFCMToken,
  useToast,
  useGetProfile,
  ProfileCache,
} from "@sehatq/components";
import { getFCMToken } from "@libs/firebase-cloud-messaging";

function selectProfileId(cache: ProfileCache) {
  return cache.id;
}

export function FirebaseCloudMessaging() {
  const { mutate: registerFCMToken } = useRegisterFCMToken();
  const { data: profileId } = useGetProfile({ select: selectProfileId });
  const toast = useToast();

  const updateFCMToken = useCallback(async () => {
    const result = await getFCMToken();
    if (result?.data) {
      const { getMessaging, onMessage } = await import("firebase/messaging");
      registerFCMToken(
        { registrationToken: result.data },
        {
          onSuccess: () => {
            const messaging = getMessaging();
            onMessage(messaging, (payload) => {
              if (payload.data?.body) {
                toast({
                  id: payload.messageId,
                  title: payload.data.title,
                  message: payload.data.body,
                  status: "success",
                });
              }
            });
          },
        }
      );
    }
  }, [registerFCMToken, toast]);

  useEffect(() => {
    if (profileId) {
      updateFCMToken();
    }
  }, [updateFCMToken, profileId]);

  return null;
}
