import { forwardRef, useImperativeHandle, useState } from "react";
import { OrderFormData, Package } from "@/types/order";
import PackageForm from "../PackageForm";
import PackageList from "../PackageList";
import { message } from "antd";

export interface PackagesStepRef {
  submit: () => Promise<OrderFormData | null>;
  save: () => OrderFormData | null;
}

interface PackagesStepProps {
  initialValues?: OrderFormData;
}

const PackagesStep = forwardRef<PackagesStepRef, PackagesStepProps>(
  ({ initialValues }, ref) => {
    const [packages, setPackages] = useState<Package[]>(
      initialValues?.packages || [],
    );

    useImperativeHandle(ref, () => ({
      submit: async () => {
        if (packages.length === 0) {
          message.warning("Debes agregar al menos un paquete");
          return null;
        }
        return { packages };
      },
      save: () => {
        return { packages };
      },
    }));

    const handleAddPackage = (newPackage: Package) => {
      setPackages([...packages, newPackage]);
    };

    const handleUpdatePackage = (updatedPackage: Package) => {
      setPackages(
        packages.map((p) => (p.id === updatedPackage.id ? updatedPackage : p)),
      );
    };

    const handleDeletePackage = (id: string) => {
      setPackages(packages.filter((p) => p.id !== id));
    };

    return (
      <div className="w-full">
        <h3 className="text-base font-bold mb-8 text-title">
          Agrega tus productos
        </h3>

        <PackageForm onAdd={handleAddPackage} />

        <div className="mt-8">
          <PackageList
            packages={packages}
            onUpdate={handleUpdatePackage}
            onDelete={handleDeletePackage}
          />
        </div>
      </div>
    );
  },
);

PackagesStep.displayName = "PackagesStep";

export default PackagesStep;
