import { forwardRef, useImperativeHandle } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Switch,
  InputNumber,
} from "antd";
import PhoneInput from "@/components/common/PhoneInput";
import { OrderFormData } from "@/types/shipment";
import Label from "@/components/common/Label";
import { statesAndCities } from "@/constants/statesAndCities";
import dayjs from "dayjs";

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
  const department = Form.useWatch("department", form);

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
            rules={[
              { required: true, message: "La fecha es requerida" },
              {
                validator: (_, value) => {
                  if (value && value < dayjs()) {
                    return Promise.reject(
                      "La fecha no puede ser menor a la fecha actual",
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
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
              options={statesAndCities.states.map((state) => ({
                value: state.name,
                label: state.name,
              }))}
              onChange={() => {
                form.setFieldValue("municipality", undefined);
              }}
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
              options={
                department
                  ? statesAndCities.states
                      .find((s) => s.name === department)
                      ?.cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                      })) || []
                  : []
              }
              disabled={!department}
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
      <div className="bg-[#FFF8F6] p-4 rounded-lg mt-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h4 className="text-title font-bold text-base m-0">
            Pago contra entrega (PCE)
          </h4>
          <Form.Item name="isCod" valuePropName="checked" noStyle>
            <Switch />
          </Form.Item>
        </div>
        <div className="flex sm:flex-row flex-col items-start sm:items-center justify-start gap-2">
          <p className="text-base-medium m-0 text-sm">
            Tu cliente paga el <strong>monto que indiques</strong> al momento de
            la entrega
          </p>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.isCod !== currentValues.isCod
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("isCod") ? (
                <Form.Item
                  className="m-0! w-full! sm:w-auto!"
                  name="codExpectedAmount"
                  rules={[
                    {
                      required: true,
                      message: "El monto es requerido",
                    },
                  ]}
                >
                  <InputNumber
                    className="w-full!"
                    prefix="$"
                    placeholder="00.00"
                    min={0}
                    precision={2}
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </div>
      </div>
    </Form>
  );
});

SenderRecipientStep.displayName = "SenderRecipientStep";

export default SenderRecipientStep;
