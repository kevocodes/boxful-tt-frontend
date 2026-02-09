"use client";

import StatusModal from "@/components/common/StatusModal";
import Link from "next/link";
import { useState } from "react";
import { Form, Input, Button, Typography, App } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/error";
import { ROUTES } from "@/constants/routes";

const { Title, Text } = Typography;

function ForgotPasswordView() {
  const { message } = App.useApp();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: sendForgotPassword, isPending: loading } = useMutation({
    mutationFn: (email: string) => AuthService.sendForgotPassword(email),
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      message.error(errorMsg);
    },
  });

  const onFinish = async (values: { email: string }) => {
    await sendForgotPassword(values.email);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
    router.push(ROUTES.LOGIN);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Link
                href={ROUTES.LOGIN}
                className="text-gray-500! hover:text-gray-700! mr-4 flex items-center"
              >
                <LeftOutlined style={{ fontSize: "20px" }} />
              </Link>
              <Title level={3} className="m-0! font-bold! text-[#11142D]">
                Recuperacion de contraseña
              </Title>
            </div>
          </div>

          {/* Form */}
          <Form
            form={form}
            name="forgot_password_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            <Text className="block mb-2 font-semibold text-gray-700 text-[12px]">
              Digita tu correo electrónico
            </Text>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo electrónico",
                },
                {
                  type: "email",
                  message: "Por favor ingresa un correo válido",
                },
              ]}
              className="mb-8"
            >
              <Input placeholder="ejemplo@correo.com" className="h-10" />
            </Form.Item>

            <Form.Item className="mb-0 flex justify-end">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="h-10 font-semibold! text-base! px-8 bg-[#1B1F3B]"
              >
                Verificar
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
        title="Correo enviado"
        description="Si el correo está registrado en la plataforma recibirá un correo electrónico con las instrucciones para el restablecimiento de la contraseña."
        confirmText="Aceptar"
      />
    </>
  );
}

export default ForgotPasswordView;
