import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FullpageLoader } from "@components/fullpage-loader";
import { DoctorAvailability } from "../features/telemedicine/doctor-availability";

function Index() {
  const router = useRouter();
  const {
    query: { uuid, token, sendbirdToken, sendbirdUserId },
  } = router;
  const [isQueryParamComplete, setQueryParamComplete] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    setQueryParamComplete(
      !!uuid && !!token && !!sendbirdToken && !!sendbirdUserId
    );
    setLoading(false);
  }, [router.isReady, sendbirdToken, sendbirdUserId, token, uuid]);

  if (!isQueryParamComplete) {
    return <div>Query parameters are missing.</div>;
  }

  return isLoading ? <FullpageLoader /> : <DoctorAvailability />;
}

export default Index;
