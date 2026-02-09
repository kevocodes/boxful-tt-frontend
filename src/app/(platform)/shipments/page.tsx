import { Metadata } from "next";
import ShipmentsView from "@/components/views/shipments/ShipmentsView";

export const metadata: Metadata = {
  title: "Historial de envíos",
};

export default function ShipmentsPage() {
  return <ShipmentsView />;
}
