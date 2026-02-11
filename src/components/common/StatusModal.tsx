import { Modal, Button, Typography } from "antd";
import { WarningFilled, CheckCircleFilled } from "@ant-design/icons";
import React from "react";

const { Title, Text } = Typography;

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type: "success" | "warning";
  title: React.ReactNode;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  confirmLoading?: boolean;
  maskClosable?: boolean;
}

const StatusModal = ({
  open,
  onClose,
  onConfirm,
  type,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCancel = false,
  confirmLoading = false,
  maskClosable = true,
}: StatusModalProps) => {
  const isSuccess = type === "success";

  return (
    <Modal
      maskClosable={maskClosable}
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      className="text-center"
      closable={false}
    >
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div
          className={`${
            isSuccess ? "bg-success-light!" : "bg-warning-light!"
          } p-4 rounded-full mb-4 aspect-square flex items-center justify-center`}
        >
          {isSuccess ? (
            <CheckCircleFilled className="text-success-dark! text-[44px]!" />
          ) : (
            <WarningFilled className="text-warning-dark! text-[44px]!" />
          )}
        </div>

        <Title level={4} className="mb-4 text-center text-base-dark!">
          {title}
        </Title>
        <Text className="text-center text-base-medium! mb-8 block">
          {description}
        </Text>
        <div
          className={`flex gap-4 w-full ${
            showCancel ? "justify-end" : "justify-center"
          }`}
        >
          {showCancel && (
            <Button
              type="default"
              onClick={onClose}
              className="flex-1"
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="primary"
            onClick={onConfirm || onClose}
            loading={confirmLoading}
            disabled={confirmLoading}
            className={`${
              showCancel ? "flex-1" : "w-full"
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StatusModal;
