import { Metadata } from "next";
import ShipmentsView from "@/components/views/shipments/ShipmentsView";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Historial de envíos",
};

export default function ShipmentsPage() {
  return (
    <Suspense fallback={null}>
      <ShipmentsView />
    </Suspense>
  );
}
