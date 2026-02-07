"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Typography, Input, Button, Statistic, notification } from "antd";
import type { GetProps } from "antd";

const { Title, Text } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function EmailValidationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [deadline, setDeadline] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate fetching expiration date from API
  const fetchExpirationDate = useCallback(async () => {
    // Mock API call: Expiration in 2 minutes
    await setTimeout(() => {
      const expirationDate = Date.now() + 1000 * 60 * 2;
      setDeadline(expirationDate);
      setCanResend(false);
    }, 100);
  }, []);

  useEffect(() => {
    fetchExpirationDate();
  }, [fetchExpirationDate]);

  const onScanFinish = () => {
    setCanResend(true);
  };

  const handleResend = () => {
    fetchExpirationDate();
    notification.success({
      message: "Código reenviado",
      description: "Se ha enviado un nuevo código de verificación a su correo.",
    });
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setOtp(text);
  };

  const onSharedSubmit: OTPProps["onInput"] = (value) => {
    console.log("onSharedSubmit", value);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      notification.error({
        message: "Código incompleto",
        description: "Por favor ingresa el código de 6 dígitos completo.",
      });
      return;
    }

    setLoading(true);
    // Mock verification API
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        // Mock valid OTP
        notification.success({
          message: "Verificación exitosa",
          description: "Su correo ha sido verificado correctamente.",
        });
        router.push("/");
      } else {
        notification.error({
          message: "Código inválido",
          description:
            "El código ingresado no es correcto. Intente nuevamente.",
        });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full px-4">
      <div className="w-full max-w-md text-center">
        <Title level={3} className="mb-4 font-bold! text-[#11142D]">
          Verificación de correo electrónico
        </Title>

        <Text className="text-gray-500 mb-6 block">
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
          <Input.OTP
            size="large"
            length={6}
            value={otp}
            onChange={onChange}
            onInput={onSharedSubmit}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="primary"
            size="large"
            onClick={handleVerify}
            loading={loading}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]"
          >
            Verificar
          </Button>

          {canResend && (
            <Button size="large" onClick={handleResend} className="w-full">
              Reenviar código
            </Button>
          )}

          <Button
            size="large"
            onClick={() => router.push("/login")}
            className="w-full"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailValidationPage;
