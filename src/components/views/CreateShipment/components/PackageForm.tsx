import React from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Package } from "@/types/shipment";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import packageSvg from "@/assets/svgs/package.svg";
import { DimensionsInputGroup } from "./DimensionsInputGroup";
import Label from "@/components/common/Label";

interface PackageFormProps {
  onAdd: (pkg: Package) => void;
}

interface PackageFormValues {
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
}

const PackageForm: React.FC<PackageFormProps> = ({ onAdd }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: PackageFormValues) => {
    const newPackage: Package = {
      id: uuidv4(),
      length: Number(values.length),
      height: Number(values.height),
      width: Number(values.width),
      weight: Number(values.weight),
      content: values.content,
    };
    onAdd(newPackage);
    form.resetFields();
  };

  return (
    <div className="bg-muted-light p-6 rounded-[10px] mb-8 w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
        className="@container/form w-full"
      >
        <div className="flex flex-col @4xl/form:flex-row @4xl/form:items-start gap-5">
          {/* Group 1: Icon + Dimensions */}
          <div className="flex flex-col @md/form:flex-row items-center @md/form:items-start gap-2 w-full @4xl/form:flex-2">
            <div className="flex mb-2 @md/form:mb-0 @md/form:mt-7 shrink-0">
              <Image src={packageSvg} alt="package" width={30} height={30} />
            </div>

            {/* Dimensions Group Component */}
            <DimensionsInputGroup mode="form" />
          </div>

          {/* Group 2: Weight + Content */}
          <div className="flex flex-col @md/form:flex-row gap-4 w-full @4xl/form:flex-3 items-start @md/form:items-start">
            <div className="w-full @md/form:w-35 shrink-0">
              <Form.Item
                name="weight"
                label={<Label>Peso en libras</Label>}
                rules={[{ required: true, message: "Campo requerido" }]}
                className="mb-0!"
              >
                <Input
                  suffix={<span className="text-gray-400 text-xs">lb</span>}
                  className="h-10"
                  type="number"
                  placeholder="15"
                  step="1"
                  min="1"
                />
              </Form.Item>
            </div>

            <div className="w-full flex-1">
              <Form.Item
                name="content"
                label={<Label>Contenido</Label>}
                rules={[{ required: true, message: "Campo requerido" }]}
                className="mb-0!"
              >
                <Input
                  placeholder="Descripción del contenido"
                  className="h-10"
                />
              </Form.Item>
            </div>
          </div>

          {/* Button */}
          <div className="w-full @4xl/form:w-auto flex justify-end @4xl/form:mt-7">
            <Button
              htmlType="submit"
              icon={<PlusOutlined />}
              iconPlacement="end"
              className="w-full @md/form:w-auto"
            >
              Agregar
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PackageForm;
