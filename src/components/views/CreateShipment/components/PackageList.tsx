import React from "react";
import { PackageFormData } from "@/types/shipment";
import { Button, Input } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import Image from "next/image";
import packageSvg from "@/assets/svgs/package.svg";
import { DimensionsInputGroup } from "./DimensionsInputGroup";
import Label from "@/components/common/Label";

interface PackageListProps {
  packages: PackageFormData[];
  onUpdate: (pkg: PackageFormData) => void;
  onDelete: (id: string) => void;
}

const PackageList = ({ packages, onUpdate, onDelete }: PackageListProps) => {
  if (packages.length === 0) return null;

  const handleChange = (
    id: string,
    field: keyof PackageFormData,
    value: string | number,
  ) => {
    const pkg = packages.find((p) => p.id === id);
    if (pkg) {
      onUpdate({ ...pkg, [field]: value });
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-[#73BD28] rounded-[10px] p-6 w-full">
      {packages.map((pkg, index) => (
        <div key={pkg.id || index} className="@container/item w-full">
          <div className="flex flex-col @4xl/item:flex-row @4xl/item:items-end gap-5 w-full">
            {/* Group: Weight + Content */}
            <div className="flex flex-col @md/item:flex-row gap-4 w-full @4xl/item:flex-3 order-2 @4xl/item:order-1 items-start @md/item:items-end">
              <div className="w-full @md/item:w-35 shrink-0">
                <Label className="mb-2">Peso en libras</Label>
                <Input
                  value={pkg.weight}
                  onChange={(e) =>
                    handleChange(pkg.id!, "weight", Number(e.target.value))
                  }
                  suffix={<span className="text-gray-400 text-xs">lb</span>}
                  className="h-10"
                  type="number"
                />
              </div>
              <div className="w-full flex-1">
                <Label className="mb-2">Contenido</Label>
                <Input
                  value={pkg.content}
                  onChange={(e) =>
                    handleChange(pkg.id!, "content", e.target.value)
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Group: Icon + Dimensions */}
            <div className="flex flex-col @md/item:flex-row items-center @md/item:items-end gap-2 w-full @4xl/item:flex-2 order-1 @4xl/item:order-2">
              <div className="flex mb-2 @md/item:mb-1.25 shrink-0">
                <Image src={packageSvg} alt="package" width={30} height={30} />
              </div>

              <DimensionsInputGroup
                mode="list"
                values={{
                  length: pkg.length,
                  height: pkg.height,
                  width: pkg.width,
                }}
                onChange={(field, val) =>
                  handleChange(pkg.id!, field, Number(val))
                }
              />
            </div>

            {/* Delete Button */}
            <div className="order-3 shrink-0 ml-auto @4xl/item:ml-0 flex items-center justify-end">
              <Button
                type="text"
                danger
                icon={<DeleteFilled />}
                onClick={() => onDelete(pkg.id!)}
                className="bg-white hover:bg-error-light! border border-gray-200! w-10 rounded-lg shrink-0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
