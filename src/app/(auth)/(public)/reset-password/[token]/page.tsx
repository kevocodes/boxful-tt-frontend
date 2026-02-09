import { Metadata } from "next";
import ResetPasswordView from "@/components/views/auth/ResetPasswordView";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
