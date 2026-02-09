import { Metadata } from "next";
import CreateShipmentView from "@/components/views/CreateShipment/CreateShipmentView";

export const metadata: Metadata = {
  title: "Crear orden",
};

export default function MainPage() {
  return <CreateShipmentView />;
}
