import { Metadata } from "next";
import HomeView from "@/components/views/home/HomeView";

export const metadata: Metadata = {
  title: "Crear orden",
};

export default function MainPage() {
  return <HomeView />;
}
