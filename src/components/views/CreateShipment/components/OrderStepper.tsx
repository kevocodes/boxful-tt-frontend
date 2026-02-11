import React from "react";

interface OrderStepperProps {
  currentStep: number;
}

const OrderStepper = ({ currentStep }: OrderStepperProps) => {
  const steps = [
    {
      title: "Dirección de envio",
    },
    {
      title: "Productos a enviar",
    },
  ];

  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex w-full overflow-hidden">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex-1 relative">
              <div
                className={`flex items-center justify-center py-3 md:py-4 px-1 md:px-2 h-full bg-white relative z-10
                `}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 text-xs md:text-sm font-semibold transition-colors duration-200 shrink-0 ${
                      isActive || isCompleted
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium transition-colors duration-200 text-center leading-tight ${
                      isActive || isCompleted
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {/* Separator Arrow */}
              {!isLast && (
                <div className="absolute top-0 -right-4 h-full w-8 z-20 pointer-events-none hidden md:block">
                  {/* The Arrow Shape */}
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 32 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,0 L32,50 L0,100"
                      fill="white"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  </svg>
                  {/* Mask to hide left border of arrow to blend with current step */}
                  <div className="absolute top-0 left-0 w-px h-full bg-white"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;
