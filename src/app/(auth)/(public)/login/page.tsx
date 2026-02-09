import { Metadata } from "next";
import LoginView from "@/components/views/auth/LoginView";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return <LoginView />;
}
