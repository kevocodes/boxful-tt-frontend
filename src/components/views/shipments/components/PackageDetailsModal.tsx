import { Modal, Table, Button } from "antd";
import type { TableProps } from "antd";
import { Package } from "@/types/shipment";

interface PackageDetailsModalProps {
  open: boolean;
  onClose: () => void;
  packages: Package[];
}

const packageColumns: TableProps<Package>["columns"] = [
  {
    title: "Contenido",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Largo (cm)",
    dataIndex: "length",
    key: "length",
  },
  {
    title: "Ancho (cm)",
    dataIndex: "width",
    key: "width",
  },
  {
    title: "Alto (cm)",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Peso (lb)",
    dataIndex: "weight",
    key: "weight",
  },
];

export const PackageDetailsModal = ({
  open,
  onClose,
  packages,
}: PackageDetailsModalProps) => {
  return (
    <Modal
      title="Detalles de Paquetes"
      open={open}
      onCancel={onClose}
      centered
      footer={[
        <Button key="close" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      width={800}
    >
      <Table
        columns={packageColumns}
        dataSource={packages}
        rowKey="id"
        pagination={false}
        scroll={{ x: true, y: 400 }}
        style={{ marginTop: 20 }}
      />
    </Modal>
  );
};
