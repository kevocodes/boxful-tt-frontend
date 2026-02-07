"use client";

import StatusModal from "../../../components/StatusModal";
import Link from "next/link";
import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (values: { email: string }) => {
    // Here you would typically call your API to request the password reset
    console.log("Forgot password requested for:", values.email);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally redirect to login or clear form
    // form.resetFields();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Link
                href="/login"
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

export default ForgotPasswordPage;
