"use client";

import React from "react";
import { InputNumber, Select, Space } from "antd";
import { COUNTRY_CODES } from "../../constants/countries";

interface PhoneValue {
  countryCode: string;
  number: string;
}

interface PhoneInputProps {
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
}

const DEFAULT_VALUE = { countryCode: "+503", number: "" };

const PhoneInput = ({ value = DEFAULT_VALUE, onChange }: PhoneInputProps) => {

  const triggerChange = (changedValue: Partial<PhoneValue>) => {
    const newValue = { ...value, ...changedValue };
    onChange?.(newValue);
  };

  const onCountryChange = (newCountryCode: string) => {
    triggerChange({ countryCode: newCountryCode });
  };

  const onNumberChange = (val: string | number | null) => {
    triggerChange({ number: val?.toString() || "" });
  };

  return (
    <div className="flex items-center w-full rounded-md transition-all overflow-hidden bg-white">
      <Space.Compact block>
        <Select
          showSearch={{
            filterOption: (input, option) =>
              String(option?.searchLabel ?? "")
                .toLowerCase()
                .includes(input.toLowerCase()),
          }}
          className="bg-gray-50! w-25!"
          value={value.countryCode}
          onChange={onCountryChange}
          popupMatchSelectWidth={false}
          optionLabelProp="value"
          classNames={{
            popup: { root: "w-[250px]" },
          }}
          optionRender={(option) => (
            <div className="flex justify-between">
              <span>{option.data.value}</span>
              <span className="text-gray-400 text-xs ml-2 truncate max-w-25">
                {option.data.country}
              </span>
            </div>
          )}
          options={COUNTRY_CODES.map((country) => ({
            value: country.code,
            label: country.code,
            searchLabel: `${country.code} ${country.country}`,
            country: country.country,
            key: country.code,
          }))}
        />

        <InputNumber
          placeholder="0000 0000"
          value={value.number}
          onChange={onNumberChange}
          type="number"
          controls={false}
          className="w-full!"
        />
      </Space.Compact>
    </div>
  );
};

export default PhoneInput;
