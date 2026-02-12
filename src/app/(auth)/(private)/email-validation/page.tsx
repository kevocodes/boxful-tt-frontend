import { Metadata } from "next";
import EmailValidationView from "@/components/views/auth/EmailValidationView";

export const metadata: Metadata = {
  title: "Verificar correo",
};

export default function EmailValidationPage() {
  return <EmailValidationView />;
}
