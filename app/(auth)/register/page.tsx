"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  DatePicker,
  Modal,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
  CalendarOutlined,
  WarningFilled,
} from "@ant-design/icons";
import PhoneInput from "../../components/PhoneInput";
import { genders } from "@/app/constants/genders";
import { RegisterFormValues } from "@/types/auth";

const { Title, Text } = Typography;

function RegisterPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onFinish = (values: RegisterFormValues) => {
    // Show confirmation modal instead of submitting immediately
    // Get the phone number from values to display in modal
    // Values now has "whatsapp" as an object { countryCode, number }
    const phone = values.whatsapp?.countryCode + " " + values.whatsapp?.number;
    setPhoneNumber(phone);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    // Submit the form or call API here
    console.log("Form submitted with phone confirmed:", phoneNumber);
    console.log("Form values:", form.getFieldsValue());
    setIsModalOpen(false);
    // You would typically call an API here
    // form.submit(); // If you wanted to submit completely, but onFinish is already triggered.
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left lg:w-full">
          <div className="flex items-center mb-2">
            <Link href="/login" className="text-gray-500! hover:text-gray-700! mr-2">
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
              name="sex"
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
                suffixIcon={<CalendarOutlined style={{ color: "#11142D" }} />}
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
      <Modal
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={400}
        centered
        className="text-center"
      >
        <div className="flex flex-col items-center justify-center py-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4 aspect-square">
            <WarningFilled className="text-orange-500! text-[44px]!" />
          </div>

          <Title level={4} className="mb-4 text-center">
            Confirmar número de <span className="font-bold">teléfono</span>
          </Title>
          <Text className="text-center text-gray-600 mb-8 block">
            Está seguro de que desea continuar con el número{" "}
            <span className="font-bold whitespace-nowrap">{phoneNumber}</span>?
          </Text>
          <div className="flex justify-end gap-4 w-full">
            <Button
              type="default"
              onClick={handleModalCancel}
              className="font-semibold!"
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={handleModalOk}
              className="font-semibold!"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default RegisterPage;
