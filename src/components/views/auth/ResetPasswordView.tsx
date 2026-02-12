"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app';
import { Form, Input, Button, Typography, Spin, notification } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import StatusModal from "@/components/common/StatusModal";
import { ResetPasswordFormValues } from "@/types/auth";
import { validateResetPasswordToken, resetPassword as resetPasswordService   } from "@/services/auth.service";
import { ApiResponse } from "@/types/api";
import { ROUTES } from "@/constants/routes";
import Label from "@/components/common/Label";

const { Title, Text } = Typography;

function ResetPasswordView() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const { isLoading: isValidatingToken, isError: isTokenInvalid } = useQuery({
    queryKey: ["validate-reset-token", token],
    queryFn: () => validateResetPasswordToken(token),
    enabled: !!token,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordService,
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      notification.error({
        message: "Error",
        description:
          (error.response?.data?.message as string) ||
          "Ocurrió un error al restablecer la contraseña. Por favor, inténtelo de nuevo.",
      });
    },
  });

  const onFinish = (values: ResetPasswordFormValues) => {
    resetPassword({
      token,
      password: values.password,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push(ROUTES.LOGIN);
  };

  if (isValidatingToken) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Spin size="large" />
        <Text className="mt-4 text-base-medium!">Validando token...</Text>
      </div>
    );
  }

  if (!token || isTokenInvalid) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Title level={4} className="text-error-dark!">
          Token inválido o expirado
        </Title>
        <Link
          href={ROUTES.LOGIN}
          className="text-base-dark! font-bold hover:text-base-light!"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Title level={3} className="m-0! font-bold! text-title!">
                Nueva Contraseña
              </Title>
            </div>
          </div>

          {/* Form */}
          <Form
            form={form}
            name="reset_password_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            {/* Contraseña */}
            <Form.Item
              label={
                <Label>
                  Digita Contraseña
                </Label>
              }
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                  message:
                    "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial",
                },
              ]}
              className="mb-4"
            >
              <Input placeholder="Digita contraseña" />
            </Form.Item>

            {/* Repetir contraseña */}
            <Form.Item
              label={
                <Label>
                  Repita Contraseña
                </Label>
              }
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Por favor repite tu contraseña" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Las contraseñas no coinciden"),
                    );
                  },
                }),
              ]}
              className="mb-10"
            >
              <Input placeholder="Digita contraseña" />
            </Form.Item>

            <Form.Item className="mt-10!">
              <Button
                type="primary"
                htmlType="submit"
                loading={isResetting}
                disabled={isResetting}
                className="w-full"
              >
                Cambiar contraseña
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        open={isModalOpen}
        onClose={handleModalClose}
        type="success"
        title="Contraseña restablecida"
        description="Su contraseña ha sido restablecida exitosamente."
        confirmText="Aceptar"
      />
    </>
  );
}

export default ResetPasswordView;
