"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Form, Input, Button, Typography, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginFormValues } from "@/types/auth";
import { signIn } from "next-auth/react";
import { useRouter } from 'nextjs-toploader/app';
import { getErrorMessage } from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import Label from "@/components/common/Label";

const { Title, Text } = Typography;

function LoginView() {
  const router = useRouter();
  const { message } = App.useApp();

  const { mutate: login, isPending: loading } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Credenciales inválidas. Por favor intenta de nuevo.");
      }

      return result;
    },
    onSuccess: () => {
      message.success("Inicio de sesión exitoso");
      router.push(ROUTES.HOME);
      router.refresh();
    },
    onError: (error) => {
      message.error(error.message || getErrorMessage(error));
    },
  });

  const onFinish = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center h-full">
      {/* Header */}
      <div className="mb-10 text-center lg:text-left lg:w-full">
        <Title level={3} className="mb-2!  font-bold! text-title!">
          Bienvenido
        </Title>
        <Text className="text-base-medium! text-base">
          Por favor ingresa tus credenciales
        </Text>
      </div>

      {/* Form */}
      <Form
        name="login_form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
        className="w-full"
      >
        <Form.Item
          label={
            <Label>
              Correo Electrónico
            </Label>
          }
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo electrónico",
            },
            { type: "email", message: "Por favor ingresa un correo válido" },
          ]}
        >
          <Input placeholder="Digita tu correo electrónico" />
        </Form.Item>

        <Form.Item
          label={
            <Label>
              Contraseña
            </Label>
          }
          name="password"
          className="mb-2!"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password
            placeholder="Digita tu contraseña"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="flex justify-end mb-10">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-base-dark! font-bold hover:text-base-light!"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Form.Item className="mb-10">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Iniciar Sesión
          </Button>
        </Form.Item>

        {/* Footer */}
        <div className="text-center">
          <Text className="text-base-medium">
            ¿Necesitas una cuenta?{" "}
            <Link
              href={ROUTES.REGISTER}
              className="text-base-dark! font-bold hover:text-base-light!"
            >
              Registrate aqui
            </Link>
          </Text>
        </div>
      </Form>
    </div>
  );
}

export default LoginView;
