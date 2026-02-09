"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import OrderStepper from "./components/OrderStepper";
import SenderRecipientStep, {
  SenderRecipientStepRef,
} from "./components/steps/SenderRecipientStep";
import PackagesStep, { PackagesStepRef } from "./components/steps/PackagesStep";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { OrderFormData } from "@/types/order";
import { usePageTitleStore } from "@/store/usePageTitleStore";

const RequestOrderView = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle("Crear orden");
  }, [setTitle]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OrderFormData>({});

  const senderRecipientRef = useRef<SenderRecipientStepRef>(null);
  const packagesCourierRef = useRef<PackagesStepRef>(null);

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
    try {
      const step2Data = await packagesCourierRef.current?.submit();
      if (step2Data) {
        const finalData = { ...formData, ...step2Data };
        console.log("Processing Order", finalData);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Crea una orden</h2>
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
                >
                  Enviar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestOrderView;
