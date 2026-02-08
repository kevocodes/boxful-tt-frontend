import { Metadata } from "next";
import RegisterView from "@/components/views/auth/RegisterView";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default function RegisterPage() {
  return <RegisterView />;
}
