import { Table, Input, Space, Button, theme, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Shipment, Package } from "@/types/shipment";
import { ShipmentQuery } from "@/services/shipments.service";
import type { FilterDropdownProps } from "antd/es/table/interface";

interface ShipmentsTableProps {
  data: { items: Shipment[]; meta: { total: number } } | undefined;
  isLoading: boolean;
  activeQuery: ShipmentQuery;
  rowSelection: object;
  setFilters: React.Dispatch<React.SetStateAction<ShipmentQuery>>;
  setActiveQuery: React.Dispatch<React.SetStateAction<ShipmentQuery>>;
  onShowPackages: (packages: Package[]) => void;
  handleSearch: () => void;
  handleReset: (dataIndex: keyof ShipmentQuery) => void;
}

export const ShipmentsTable = ({
  data,
  isLoading,
  activeQuery,
  rowSelection,
  setFilters,
  setActiveQuery,
  onShowPackages,
  handleSearch,
  handleReset,
}: ShipmentsTableProps) => {
  const { token } = theme.useToken();

  const getColumnSearchProps = (
    dataIndex: keyof ShipmentQuery,
    placeholder: string,
  ): NonNullable<TableProps<Shipment>["columns"]>[number] => ({
    filteredValue: activeQuery[dataIndex]
      ? [activeQuery[dataIndex] as string]
      : null,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Buscar ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            setFilters((prev) => ({
              ...prev,
              [dataIndex]: e.target.value,
            }));
          }}
          onPressEnter={() => {
            confirm();
            handleSearch();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              handleSearch();
            }}
            icon={<SearchOutlined />}
            size="small"
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) clearFilters();
              confirm();
              handleReset(dataIndex);
            }}
            size="small"
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? token.colorPrimary : undefined }}
      />
    ),
  });

  const columns: TableProps<Shipment>["columns"] = [
    {
      title: "No. Orden",
      dataIndex: "orderNumber",
      key: "orderNumber",
      ...getColumnSearchProps("orderId", "No. Orden"),
    },
    {
      title: "Nombre",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName", "nombre"),
    },
    {
      title: "Apellido",
      dataIndex: "customerLastname",
      key: "customerLastname",
      ...getColumnSearchProps("customerLastname", "apellido"),
    },
    {
      title: "Departamento",
      dataIndex: "customerState",
      key: "customerState",
      ...getColumnSearchProps("customerState", "departamento"),
    },
    {
      title: "Municipio",
      dataIndex: "customerCity",
      key: "customerCity",
      ...getColumnSearchProps("customerCity", "municipio"),
    },
    {
      title: "Paquetes en orden",
      key: "packages",
      render: (_, record) => (
        <span
          style={{
            backgroundColor: token.colorSuccessBg,
            color: token.colorSuccess,
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            border: `1px solid ${token.colorSuccessBorder}`,
            cursor: "pointer",
          }}
          onClick={() => onShowPackages(record.packages)}
        >
          {record.packages?.length || 0}
        </span>
      ),
      align: "center",
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      rowKey="id"
      dataSource={data?.items || []}
      pagination={{
        current: activeQuery.page,
        pageSize: activeQuery.limit,
        total: data?.meta?.total || 0,
        onChange: (page, pageSize) => {
          setFilters((prev) => ({ ...prev, page, limit: pageSize }));
          setActiveQuery((prev) => ({ ...prev, page, limit: pageSize }));
        },
      }}
      loading={isLoading}
      scroll={{ x: true }}
    />
  );
};
