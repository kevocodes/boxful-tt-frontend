"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import OrderStepper from "./components/OrderStepper";
import SenderRecipientStep, {
  SenderRecipientStepRef,
} from "./components/steps/SenderRecipientStep";
import PackagesStep, { PackagesStepRef } from "./components/steps/PackagesStep";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { CreateShipmentDto, OrderFormData } from "@/types/shipment";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { createShipmentMapper } from "@/mappers/shipment.mapper";
import { useMutation } from "@tanstack/react-query";
import { createShipment as createShipmentService } from "@/services/shipments.service";
import { App } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StatusModal from "@/components/common/StatusModal";
import { ROUTES } from "@/constants/routes";

const RequestOrderView = () => {
  const session = useSession();

  const { setTitle } = usePageTitleStore();
  const { message } = App.useApp();

  useEffect(() => {
    setTitle("Crear orden");
  }, [setTitle]);

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OrderFormData>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const senderRecipientRef = useRef<SenderRecipientStepRef>(null);
  const packagesCourierRef = useRef<PackagesStepRef>(null);

  const { mutateAsync: createShipment, isPending: loading } = useMutation({
    mutationFn: ({ data, token }: { data: CreateShipmentDto; token: string }) =>
      createShipmentService(data, token),
    onSuccess: () => {
      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleGoHome = () => {
    router.push(ROUTES.SHIPMENTS);
  };

  const handleCreateAnother = () => {
    setIsSuccessModalOpen(false);
    setFormData({});
    setCurrentStep(0);
  };

  const next = async () => {
    try {
      if (currentStep === 0) {
        const stepData = await senderRecipientRef.current?.submit();
        if (stepData) {
          setFormData({ ...formData, ...stepData });
          setCurrentStep(currentStep + 1);
        }
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const submitOrder = async () => {
    const token = session.data?.accessToken;
    if (!token) {
      message.error("No tienes permiso para crear una orden");
      return;
    }
    try {
      const step2Data = await packagesCourierRef.current?.submit();
      if (step2Data) {
        const finalData = { ...formData, ...step2Data };
        const mappedData = createShipmentMapper(finalData);
        createShipment({ data: mappedData, token });
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    let stepData = null;
    if (currentStep === 0) {
      stepData = senderRecipientRef.current?.save();
    } else if (currentStep === 1) {
      stepData = packagesCourierRef.current?.save();
    }

    if (stepData) {
      setFormData((prevData) => ({ ...prevData, ...stepData }));
    }
    setCurrentStep(currentStep - 1);
  };

  const steps = useMemo(
    () => [
      {
        content: (
          <SenderRecipientStep
            ref={senderRecipientRef}
            initialValues={formData}
          />
        ),
      },
      {
        content: (
          <PackagesStep ref={packagesCourierRef} initialValues={formData} />
        ),
      },
    ],
    [formData],
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Crea una orden
        </h2>
        <p className="text-gray-500">
          Dale una ventaja competitiva a tu negocio con entregas{" "}
          <span className="font-bold text-gray-700">el mismo día</span> (Área
          Metropolitana) y{" "}
          <span className="font-bold text-gray-700">el día siguiente</span> a
          nivel nacional.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <OrderStepper currentStep={currentStep} />

        <div className="p-6">
          <div>{steps[currentStep].content}</div>

          <div className="mt-8 flex justify-between items-center">
            {/* Left Side: Back Button or Spacer */}
            <div>
              {currentStep > 0 && (
                <Button
                  onClick={() => prev()}
                  icon={<ArrowLeftOutlined />}
                  iconPlacement="start"
                  disabled={loading}
                  loading={loading}
                >
                  Regresar
                </Button>
              )}
            </div>

            {/* Right Side: Next/Submit Buttons */}
            <div>
              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => next()}
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                  disabled={loading}
                  loading={loading}
                >
                  Siguiente
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => submitOrder()}
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                  loading={loading}
                >
                  Enviar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <StatusModal
        maskClosable={false}
        open={isSuccessModalOpen}
        onClose={handleGoHome}
        onConfirm={handleCreateAnother}
        type="success"
        title="Orden enviada"
        description="La orden ha sido creada y programada, puedes verificar el estado de la orden en el listado de envíos."
        confirmText="Crear otra"
        cancelText="Ir a envíos"
        showCancel
      />
    </div>
  );
};

export default RequestOrderView;
