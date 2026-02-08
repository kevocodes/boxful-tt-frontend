import { Metadata } from "next";
import ForgotPasswordView from "@/components/views/auth/ForgotPasswordView";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
