import { DimensionsValues } from "@/types/order";
import React from "react";
import DimensionField from "./DimensionField";


interface DimensionsInputGroupProps {
  mode: "form" | "list";
  values?: DimensionsValues;
  onChange?: (field: keyof DimensionsValues, value: string) => void;
}

export const DimensionsInputGroup: React.FC<DimensionsInputGroupProps> = ({
  mode,
  values,
  onChange,
}) => {
  return (
    <div className="@container/dims w-full min-w-0">
      <div className="flex flex-col @[250px]/dims:flex-row w-full gap-3 @[250px]/dims:gap-0 relative">
        <DimensionField
          field="length"
          label="Largo"
          placeholder="15"
          pos="left"
          mode={mode}
          value={values?.length}
          onChange={(val) => onChange?.("length", val)}
        />
        <DimensionField
          field="height"
          label="Alto"
          placeholder="15"
          pos="middle"
          mode={mode}
          value={values?.height}
          onChange={(val) => onChange?.("height", val)}
        />
        <DimensionField
          field="width"
          label="Ancho"
          placeholder="15"
          pos="right"
          mode={mode}
          value={values?.width}
          onChange={(val) => onChange?.("width", val)}
        />
      </div>
    </div>
  );
};
