import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input, DatePicker, Select, Row, Col } from "antd";
import PhoneInput from "@/components/common/PhoneInput";
import { OrderFormData } from "@/types/order";
import Label from "@/components/common/Label";

export interface SenderRecipientStepRef {
  submit: () => Promise<OrderFormData>;
  save: () => OrderFormData;
}

interface SenderRecipientStepProps {
  initialValues?: OrderFormData;
}

const SenderRecipientStep = forwardRef<
  SenderRecipientStepRef,
  SenderRecipientStepProps
>(({ initialValues }, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    submit: () => {
      return form.validateFields();
    },
    save: () => {
      return form.getFieldsValue();
    },
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      className="w-full"
      requiredMark={false}
      initialValues={
        initialValues || {
          phone: { countryCode: "+503", number: "" },
        }
      }
    >
      <h3 className="text-base font-bold mb-8 text-title">
        Completa los datos
      </h3>

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Form.Item
            label={<Label>Dirección de recolección</Label>}
            name="pickupAddress"
            rules={[{ required: true, message: "La dirección es requerida" }]}
          >
            <Input placeholder="Colonia Las Magnolias, calle militar 1, San Salvador" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item
            label={<Label>Fecha programada</Label>}
            name="scheduledDate"
            rules={[{ required: true, message: "La fecha es requerida" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Seleccionar fecha"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label={<Label>Nombres</Label>}
            name="firstName"
            rules={[{ required: true, message: "El nombre es requerido" }]}
          >
            <Input placeholder="Gabriela Reneé" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label={<Label>Apellidos</Label>}
            name="lastName"
            rules={[{ required: true, message: "El apellido es requerido" }]}
          >
            <Input placeholder="Días López" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item
            label={<Label>Correo electrónico</Label>}
            name="email"
            rules={[
              { required: true, message: "El correo es requerido" },
              { type: "email", message: "Correo inválido" },
            ]}
          >
            <Input placeholder="gabbydiaz@gmail.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Form.Item
            label={<Label>Teléfono</Label>}
            name="phone"
            rules={[{ required: true, message: "El teléfono es requerido" }]}
          >
            <PhoneInput />
          </Form.Item>
        </Col>
        <Col xs={24} lg={16}>
          <Form.Item
            label={<Label>Dirección del destinatario</Label>}
            name="recipientAddress"
            rules={[{ required: true, message: "La dirección es requerida" }]}
          >
            <Input placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label={<Label>Departamento</Label>}
            name="department"
            rules={[
              { required: true, message: "El departamento es requerido" },
            ]}
          >
            <Select
              placeholder="San Salvador"
              options={[{ value: "San Salvador", label: "San Salvador" }]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label={<Label>Municipio</Label>}
            name="municipality"
            rules={[{ required: true, message: "El municipio es requerido" }]}
          >
            <Select
              placeholder="San Salvador"
              options={[{ value: "San Salvador", label: "San Salvador" }]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item
            label={<Label>Punto de referencia</Label>}
            name="referencePoint"
            rules={[
              {
                required: true,
                message: "El punto de referencia es requerido",
              },
            ]}
          >
            <Input placeholder="Cerca de redondel Arbol de la Paz" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label={<Label>Indicaciones</Label>} name="instructions">
            <Input placeholder="Llamar antes de entregar" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

SenderRecipientStep.displayName = "SenderRecipientStep";

export default SenderRecipientStep;
