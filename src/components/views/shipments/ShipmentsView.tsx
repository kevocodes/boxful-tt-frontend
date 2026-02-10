"use client";

import { usePageTitleStore } from "@/store/usePageTitleStore";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  DatePicker,
  Input,
  Space,
  theme,
  TableProps,
  App,
  Checkbox,
  Dropdown,
  Modal,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShipments, ShipmentQuery } from "@/services/shipments.service";
import { Shipment, Package } from "@/types/shipment";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useSession } from "next-auth/react";
const { RangePicker } = DatePicker;

function ShipmentsView() {
  const { message } = App.useApp();
  const session = useSession();
  const { setTitle } = usePageTitleStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { token } = theme.useToken();

  const [filters, setFilters] = useState<ShipmentQuery>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    startDate: searchParams.get("startDate")
      ? searchParams.get("startDate")!
      : dayjs().subtract(6, "day").toISOString(),
    endDate: searchParams.get("endDate")
      ? searchParams.get("endDate")!
      : dayjs().toISOString(),
    orderId: searchParams.get("orderId") || undefined,
    customerName: searchParams.get("customerName") || undefined,
    customerLastname: searchParams.get("customerLastname") || undefined,
    customerState: searchParams.get("customerState") || undefined,
    customerCity: searchParams.get("customerCity") || undefined,
  });

  // State for active query (triggers fetch and URL update)
  const [activeQuery, setActiveQuery] = useState<ShipmentQuery>(filters);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Shipment[]>([]);

  // Modal State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [currentPackages, setCurrentPackages] = useState<Package[]>([]);

  useEffect(() => {
    setTitle("Historial de envíos");
  }, [setTitle]);

  // Sync activeQuery to URL (only when "Buscar" is clicked or pagination changes)
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeQuery.page) params.set("page", activeQuery.page.toString());
    if (activeQuery.limit) params.set("limit", activeQuery.limit.toString());
    if (activeQuery.startDate) params.set("startDate", activeQuery.startDate);
    if (activeQuery.endDate) params.set("endDate", activeQuery.endDate);
    if (activeQuery.orderId) params.set("orderId", activeQuery.orderId);
    if (activeQuery.customerName)
      params.set("customerName", activeQuery.customerName);
    if (activeQuery.customerLastname)
      params.set("customerLastname", activeQuery.customerLastname);
    if (activeQuery.customerState)
      params.set("customerState", activeQuery.customerState);
    if (activeQuery.customerCity)
      params.set("customerCity", activeQuery.customerCity);

    router.replace(`${pathname}?${params.toString()}`);
  }, [activeQuery, pathname, router]);

  // Fetch Data using activeQuery
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["shipments", activeQuery],
    queryFn: () => getShipments(activeQuery, session.data?.accessToken),
    placeholderData: keepPreviousData,
    enabled: !!session.data?.accessToken,
    gcTime: 0,
    staleTime: 0,
  });

  const handleSearch = () => {
    setActiveQuery({ ...filters, page: 1 });
  };

  const handleReset = (dataIndex: keyof ShipmentQuery) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[dataIndex];
      return newFilters;
    });
    setActiveQuery((prev) => {
      const newQuery = { ...prev, page: 1 };
      delete newQuery[dataIndex];
      return newQuery;
    });
  };

  const hasActiveFilters = () => {
    const {
      orderId,
      customerName,
      customerLastname,
      customerState,
      customerCity,
      startDate,
      endDate,
    } = activeQuery;
    const hasTextFilters = !!(
      orderId ||
      customerName ||
      customerLastname ||
      customerState ||
      customerCity
    );

    const defaultStart = dayjs().subtract(6, "day");
    const defaultEnd = dayjs();

    const isDefaultDate =
      startDate &&
      endDate &&
      dayjs(startDate).isSame(defaultStart, "day") &&
      dayjs(endDate).isSame(defaultEnd, "day");

    return hasTextFilters || !isDefaultDate;
  };

  const handleClearAll = () => {
    const defaultStart = dayjs().subtract(7, "day").toISOString();
    const defaultEnd = dayjs().toISOString();

    const resetState = {
      page: 1,
      limit: filters.limit || 10,
      startDate: defaultStart,
      endDate: defaultEnd,
      orderId: undefined,
      customerName: undefined,
      customerLastname: undefined,
      customerState: undefined,
      customerCity: undefined,
    };

    setFilters(resetState);
    setActiveQuery(resetState);
  };

  const showPackagesModal = (packages: Package[]) => {
    setCurrentPackages(packages);
    setIsPackageModalOpen(true);
  };

  // Table Columns Helper
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
          onClick={() => showPackagesModal(record.packages)}
        >
          {record.packages?.length || 0}
        </span>
      ),
      align: "center",
    },
  ];

  const handleDownload = () => {
    if (selectedRows.length === 0) {
      message.warning("Selecciona al menos una orden para descargar.");
      return;
    }

    const csvContent = [
      [
        "No. Orden",
        "Nombre",
        "Apellido",
        "Departamento",
        "Municipio",
        "Paquetes",
      ],
      ...selectedRows.map((row) => [
        row.id,
        row.customerName,
        row.customerLastname,
        row.customerState,
        row.customerCity,
        row.packages?.length || 0,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `envios_export_${dayjs().format("YYYY-MM-DD")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedRows: Shipment[],
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows((prev) => {
      const currentIds = new Set(newSelectedRowKeys);
      const prevRetained = prev.filter(
        (item) =>
          currentIds.has(item.id) &&
          !newSelectedRows.find((n) => n.id === item.id),
      );
      return [...prevRetained, ...newSelectedRows];
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    columnTitle: (
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={
            (data?.data.items?.length || 0) > 0 &&
            (data?.data.items || []).every((item) =>
              selectedRowKeys.includes(item.id),
            )
          }
          indeterminate={
            (data?.data.items || []).some((item) =>
              selectedRowKeys.includes(item.id),
            ) &&
            !(data?.data.items || []).every((item) =>
              selectedRowKeys.includes(item.id),
            )
          }
          onChange={(e) => {
            const checked = e.target.checked;
            const currentIds = data?.data.items.map((item) => item.id) || [];
            if (checked) {
              const newKeys = Array.from(
                new Set([...selectedRowKeys, ...currentIds]),
              );
              setSelectedRowKeys(newKeys);
              setSelectedRows((prev) => {
                const existingIds = new Set(prev.map((r) => r.id));
                const newRows =
                  data?.data.items.filter(
                    (item) => !existingIds.has(item.id),
                  ) || [];
                return [...prev, ...newRows];
              });
            } else {
              setSelectedRowKeys(
                selectedRowKeys.filter(
                  (key) => !currentIds.includes(key as string),
                ),
              );
              setSelectedRows((prev) =>
                prev.filter((row) => !currentIds.includes(row.id)),
              );
            }
          }}
        />
        {selectedRowKeys.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: "100%",
              marginLeft: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Dropdown
              menu={{
                items: [
                  {
                    key: "clear",
                    label: "Quitar todas las selecciones",
                    onClick: () => {
                      setSelectedRowKeys([]);
                      setSelectedRows([]);
                    },
                  },
                ],
              }}
              trigger={["click", "hover"]}
            >
              <DownOutlined
                style={{ cursor: "pointer", fontSize: "10px", color: "#666" }}
              />
            </Dropdown>
          </div>
        )}
      </div>
    ),
  };

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <RangePicker
          allowClear={false}
          value={[
            filters.startDate ? dayjs(filters.startDate) : null,
            filters.endDate ? dayjs(filters.endDate) : null,
          ]}
          onChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              setFilters((prev) => ({
                ...prev,
                startDate: dates[0]!.toISOString(),
                endDate: dates[1]!.toISOString(),
              }));
            } else {
              setFilters((prev) => {
                const newF = { ...prev };
                delete newF.startDate;
                delete newF.endDate;
                return newF;
              });
            }
          }}
          presets={[
            {
              label: "Últimos 7 días",
              value: [dayjs().subtract(6, "d"), dayjs()],
            },
            {
              label: "Últimos 15 días",
              value: [dayjs().subtract(14, "d"), dayjs()],
            },
            {
              label: "Últimos 30 días",
              value: [dayjs().subtract(29, "d"), dayjs()],
            },
            {
              label: "Últimos 90 días",
              value: [dayjs().subtract(89, "d"), dayjs()],
            },
          ]}
          className="w-full md:w-auto"
          classNames={{
            popup: { root: "shipments-range-picker-dropdown" },
          }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          className="w-full md:w-auto"
        >
          Buscar
        </Button>
        <Button onClick={handleDownload} className="w-full md:w-auto">
          Descargar envíos{" "}
          {selectedRows.length > 0 && `(${selectedRows.length})`}
        </Button>
        {hasActiveFilters() && (
          <Button
            type="dashed"
            onClick={handleClearAll}
            className="w-full md:w-auto"
          >
            Borrar filtros
          </Button>
        )}
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="id"
        dataSource={data?.data.items || []}
        pagination={{
          current: activeQuery.page,
          pageSize: activeQuery.limit,
          total: (data?.data.meta?.total as number) || 0,
          onChange: (page, pageSize) => {
            setFilters((prev) => ({ ...prev, page, limit: pageSize }));
            setActiveQuery((prev) => ({ ...prev, page, limit: pageSize }));
          },
        }}
        loading={isLoading || isFetching || session.status === "loading"}
        scroll={{ x: true }}
      />

      <Modal
        title="Detalles de Paquetes"
        open={isPackageModalOpen}
        onCancel={() => setIsPackageModalOpen(false)}
        centered
        footer={[
          <Button key="close" onClick={() => setIsPackageModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
        width={800}
      >
        <Table
          columns={packageColumns}
          dataSource={currentPackages}
          rowKey="id"
          pagination={false}
          scroll={{ x: true, y: 400 }}
          style={{ marginTop: 20 }}
        />
      </Modal>
    </div>
  );
}

export default ShipmentsView;
