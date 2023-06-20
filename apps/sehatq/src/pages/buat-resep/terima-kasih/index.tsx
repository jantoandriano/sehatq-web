import React, { useEffect, useState } from "react";

import { isMobileDevice } from "@sehatq/utils";
import { PrescriptionCreated } from "@components/pages/prescription";

export default function PrescriptionCreatedPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMobile(isMobileDevice(window?.navigator?.userAgent));
  }, []);
  return <PrescriptionCreated isMobile={isMobile} />;
}
