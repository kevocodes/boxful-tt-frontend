"use client";

import { usePageTitleStore } from "@/store/usePageTitleStore";
import { useEffect } from "react";

function ShipmentsView() {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle("Historial de envíos");
  }, [setTitle]);

  return <div>Shipments Page</div>;
}

export default ShipmentsView;
