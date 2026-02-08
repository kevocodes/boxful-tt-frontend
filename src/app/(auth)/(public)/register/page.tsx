"use client";

import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, Select, DatePicker, App } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import StatusModal from "@/components/StatusModal";
import PhoneInput from "@/components/PhoneInput";
import { genders } from "@/constants/genders";
import { AuthService } from "@/services/auth.service";
import { RegisterFormValues } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/error";
import { registerMapper } from "@/mappers/auth.mapper";
import Link from "next/link";

const { Title, Text } = Typography;

function RegisterPage() {
  const { message } = App.useApp();
  const router = useRouter();

  const { mutateAsync: register, isPending: loading } = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      message.success("Registro exitoso");
      setIsModalOpen(false);
      router.push(ROUTES.LOGIN);
    },
    onError: (error) => {
      const errorMsg = getErrorMessage(error);
      message.error(errorMsg);
    },
  });

  const [form] = Form.useForm<RegisterFormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onFinish = (values: RegisterFormValues) => {
    const phone = values.whatsapp?.countryCode + " " + values.whatsapp?.number;
    setPhoneNumber(phone);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    const values = await form.validateFields();
    await register(registerMapper(values));
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col mt-10 md:mt-0">
        {/* Header */}
        <div className="mb-10 lg:text-left lg:w-full">
          <div className="flex items-center mb-2">
            <Link
              href={ROUTES.LOGIN}
              className="text-gray-500! hover:text-gray-700! mr-2"
            >
              <LeftOutlined style={{ fontSize: "16px" }} />
            </Link>
            <Title level={3} className="m-0! font-bold! text-[#11142D]">
              Cuentanos de ti
            </Title>
          </div>
          <Text className="text-gray-500 text-base">
            Completa la información de registro
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          name="register_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="w-full"
          scrollToFirstError
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {/* Nombre */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Nombre
                </span>
              }
              name="firstName"
              rules={[
                { required: true, message: "Por favor ingresa tu nombre" },
              ]}
            >
              <Input placeholder="Digita tu nombre" />
            </Form.Item>

            {/* Apellido */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Apellido
                </span>
              }
              name="lastName"
              rules={[
                { required: true, message: "Por favor ingresa tu apellido" },
              ]}
            >
              <Input placeholder="Digita tu apellido" />
            </Form.Item>

            {/* Sexo */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Sexo
                </span>
              }
              name="gender"
              rules={[
                { required: true, message: "Por favor selecciona tu sexo" },
              ]}
            >
              <Select placeholder="Seleccionar" options={genders} />
            </Form.Item>

            {/* Fecha de nacimiento */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Fecha de nacimiento
                </span>
              }
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona tu fecha de nacimiento",
                },
              ]}
            >
              <DatePicker
                className="w-full"
                placeholder="Seleccionar"
                format="DD/MM/YYYY"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>

            {/* Correo electrónico */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Correo electrónico
                </span>
              }
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
            >
              <Input placeholder="Digita correo" />
            </Form.Item>

            {/* Número de Whatsapp */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Número de Whatsapp
                </span>
              }
              name="whatsapp"
              className="mb-0"
              initialValue={{ countryCode: "+503", number: "" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || !value.number) {
                      return Promise.reject(
                        new Error("Por favor ingresa tu número"),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PhoneInput />
            </Form.Item>

            {/* Contraseña */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Contraseña
                </span>
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
            >
              <Input.Password
                placeholder="Digita contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {/* Repetir contraseña */}
            <Form.Item
              label={
                <span className="font-semibold text-gray-700 text-[12px]">
                  Repetir contraseña
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
            >
              <Input.Password
                placeholder="Digita contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>

          <Form.Item className="mt-10! mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 font-semibold! text-base!"
            >
              Siguiente
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Confirmation Modal */}
      {/* Status Modal */}
      <StatusModal
        open={isModalOpen}
        onClose={handleModalCancel}
        onConfirm={handleModalOk}
        type="warning"
        title={
          <>
            Confirmar número de <span className="font-bold">teléfono</span>
          </>
        }
        description={
          <>
            Está seguro de que desea continuar con el número{" "}
            <span className="font-bold whitespace-nowrap">{phoneNumber}</span>?
          </>
        }
        confirmText="Aceptar"
        cancelText="Cancelar"
        showCancel={true}
        confirmLoading={loading}
      />
    </>
  );
}

export default RegisterPage;
