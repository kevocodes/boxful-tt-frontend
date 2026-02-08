"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import StatusModal from "../../../../../components/StatusModal";
import { ResetPasswordFormValues } from "@/src/types/auth";

const { Title } = Typography;

function ResetPasswordPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  useEffect(() => {
    if (!token) {
      // Handle missing token case
      console.log("No token provided");
    } else {
      console.log("Token provided", token);
    }
  }, [token]);

  const onFinish = (values: ResetPasswordFormValues) => {
    console.log("Reset password", values);
    // Mock API call
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  if (!token) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Title level={4} className="text-red-500">
          Token inválido o expirado
        </Title>
        <Link
          href="/login"
          className="text-gray-700! font-bold hover:text-gray-500!"
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
              <Title level={3} className="m-0! font-bold! text-[#11142D]">
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
                <span className="font-semibold text-gray-700 text-[12px]">
                  Digita Contraseña
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
              className="mb-4"
            >
              <Input.Password
                placeholder="Digita contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="h-10"
              />
            </Form.Item>

            {/* Repetir contraseña */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Repita Contraseña
                </span>
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
              <Input.Password
                placeholder="Digita contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="h-10"
              />
            </Form.Item>

            <Form.Item className="mb-0 flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 font-semibold! text-base! px-8 bg-[#1B1F3B] w-fit ml-auto"
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

export default ResetPasswordPage;
