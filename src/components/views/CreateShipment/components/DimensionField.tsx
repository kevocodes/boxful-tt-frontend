import { Form, Input } from "antd";
import Label from "@/components/common/Label";
import { DimensionsValues } from "@/types/shipment";

interface DimensionFieldProps {
  field: keyof DimensionsValues;
  label: string;
  placeholder: string;
  pos: "left" | "middle" | "right";
  mode: "form" | "list";
  value?: number | string;
  onChange?: (val: string) => void;
}

const DimensionField = ({
  field,
  label,
  placeholder,
  pos,
  mode,
  value,
  onChange,
}: DimensionFieldProps) => {
  const commonInputProps = {
    suffix: <span className="text-gray-400 text-xs">cm</span>,
    type: "number",
    step: "1",
    className: "h-10 text-center w-full z-0 focus:z-10 hover:z-10 relative",
    min: "1",
  };

  const getWrapperStyle = (pos: "left" | "middle" | "right") => {
    let classes = "flex-1 w-full";
    if (pos === "middle" || pos === "right") {
      classes += " @[250px]/dims:-ml-px";
    }
    return classes;
  };

  const getInputStyle = (pos: "left" | "middle" | "right") => {
    let classes = "rounded-lg";

    if (pos === "left") {
      classes += " @[250px]/dims:rounded-r-none!";
    }
    if (pos === "middle") {
      classes += " @[250px]/dims:rounded-none! @[250px]/dims:-ml-px";
    }
    if (pos === "right") {
      classes += " @[250px]/dims:rounded-l-none! @[250px]/dims:-ml-px";
    }
    return classes;
  };

  const wrapperClass = getWrapperStyle(pos);
  const inputClass = `${commonInputProps.className} ${getInputStyle(pos)}`;

  if (mode === "form") {
    return (
      <Form.Item
        name={field}
        label={<Label>{label}</Label>}
        rules={[{ required: true, message: "Campo requerido" }]}
        className={`mb-0! ${wrapperClass}`}
      >
        <Input
          {...commonInputProps}
          className={inputClass}
          placeholder={placeholder}
        />
      </Form.Item>
    );
  }

  return (
    <div className={wrapperClass}>
      <Label className="mb-2">{label}</Label>
      <Input
        {...commonInputProps}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default DimensionField;
