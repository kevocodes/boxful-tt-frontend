"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { Typography, Input, Button, Statistic, App } from "antd";
import type { GetProps } from "antd";
import { ROUTES } from "@/constants/routes";
import { signOut, useSession } from "next-auth/react";
import {
  sendVerificationEmail,
  validateVerificationEmail,
} from "@/services/auth.service";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function EmailValidationView() {
  const hasSent = useRef(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const { notification } = App.useApp();
  const [otp, setOtp] = useState("");
  const [deadline, setDeadline] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (session?.user.isVerified) {
      router.push(ROUTES.HOME);
    }
  }, [session, router]);

  const startCountdown = (dateString: string) => {
    const expirationDate = new Date(dateString).getTime();
    setDeadline(expirationDate);
    setCanResend(false);
  };

  const sendVerificationEmailMutation = useMutation({
    mutationFn: (token: string) => sendVerificationEmail(token),
    onSuccess: (data) => {
      if (data.data) {
        startCountdown(data.data);
      }
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      if (error.response?.status === 409) {
        // Parse date from message if it's a string: "OTP already sent and expires at: 2026-02-08T04:35:21.767Z"
        const message = error.response.data.message;
        if (typeof message === "string") {
          const dateMatch = message.match(
            /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/,
          );
          if (dateMatch && dateMatch[1]) {
            startCountdown(dateMatch[1]);
          }
        }
      } else {
        const message = error.response?.data?.message;
        notification.error({
          title: "Error",
          description:
            (typeof message === "string" ? message : message?.[0]) ||
            "Error al enviar el correo de verificación.",
        });
      }
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: ({ otp, token }: { otp: string; token: string }) =>
      validateVerificationEmail(otp, token),
    onSuccess: async () => {
      notification.success({
        title: "Verificación exitosa",
        description: "Su correo ha sido verificado correctamente.",
      });
      await update({ isVerified: true });
      router.push(ROUTES.HOME);
    },
    onError: () => {
      notification.error({
        title: "Código inválido",
        description:
          "El código ingresado no es correcto o ha expirado. Intente nuevamente.",
      });
    },
  });

  useEffect(() => {
    if (session?.accessToken && !hasSent.current) {
      hasSent.current = true;
      sendVerificationEmailMutation.mutate(session.accessToken);
    }
  }, [session?.accessToken, sendVerificationEmailMutation]);

  const onScanFinish = () => {
    setCanResend(true);
  };

  const handleResend = async () => {
    if (session?.accessToken) {
      await sendVerificationEmailMutation.mutateAsync(session.accessToken);
      notification.success({
        title: "Código reenviado",
        description:
          "Se ha enviado un nuevo código de verificación a su correo.",
      });
    }
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setOtp(text);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      notification.error({
        title: "Código incompleto",
        description: "Por favor ingresa el código de 6 dígitos completo.",
      });
      return;
    }

    if (session?.accessToken) {
      verifyEmailMutation.mutate({ otp, token: session.accessToken });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full px-4">
      <div className="w-full max-w-md text-center">
        <Title level={3} className="mb-4 font-bold! text-title!">
          Verificación de correo electrónico
        </Title>

        <Text className="text-base-medium! mb-6 block">
          Por favor ingresa el código de verificación enviado a tu cuenta de
          correo electrónico. Podrás recibir un nuevo correo en{" "}
          <span className="inline-block align-middle">
            {deadline > 0 && (
              <Statistic.Timer
                type="countdown"
                value={deadline}
                onFinish={onScanFinish}
                format="mm:ss"
                styles={{ content: { fontSize: "14px", color: "#6b7280" } }}
              />
            )}
          </span>
        </Text>

        <div className="mb-8 flex justify-center">
          <Input.OTP size="large" length={6} value={otp} onChange={onChange} />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="primary"
            size="large"
            onClick={handleVerify}
            loading={verifyEmailMutation.isPending}
            disabled={verifyEmailMutation.isPending || otp.length !== 6}
            className="w-full"
          >
            Verificar
          </Button>

          {canResend && (
            <Button
              size="large"
              onClick={handleResend}
              className="w-full"
              loading={sendVerificationEmailMutation.isPending}
              disabled={sendVerificationEmailMutation.isPending}
            >
              Reenviar código
            </Button>
           )} 

          <Button
            size="large"
            onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}
            className="w-full"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailValidationView;
