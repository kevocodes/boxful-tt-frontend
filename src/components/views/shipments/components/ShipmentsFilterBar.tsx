import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { ShipmentQuery } from "@/services/shipments.service";
import { Shipment } from "@/types/shipment";

const { RangePicker } = DatePicker;

interface ShipmentsFilterBarProps {
  filters: ShipmentQuery;
  setFilters: React.Dispatch<React.SetStateAction<ShipmentQuery>>;
  handleSearch: () => void;
  selectedRows: Shipment[];
  handleDownload: () => void;
  handleClearAll: () => void;
}

export const ShipmentsFilterBar = ({
  filters,
  setFilters,
  handleSearch,
  selectedRows,
  handleDownload,
  handleClearAll,
}: ShipmentsFilterBarProps) => {
  const hasActiveFilters = () => {
    const {
      orderId,
      customerName,
      customerLastname,
      customerState,
      customerCity,
      startDate,
      endDate,
    } = filters;

    const hasTextFilters = !!(
      orderId ||
      customerName ||
      customerLastname ||
      customerState ||
      customerCity
    );

    const defaultStart = dayjs().subtract(6, "day").startOf("day");
    const defaultEnd = dayjs().endOf("day");

    const isDefaultDate =
      startDate &&
      endDate &&
      dayjs(startDate).isSame(defaultStart, "day") &&
      dayjs(endDate).isSame(defaultEnd, "day");

    return hasTextFilters || !isDefaultDate;
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-7">
      <RangePicker
        allowClear={false}
        value={[
          filters.startDate ? dayjs(filters.startDate).startOf("day") : null,
          filters.endDate ? dayjs(filters.endDate).endOf("day") : null,
        ]}
        onChange={(dates) => {
          if (dates && dates[0] && dates[1]) {
            setFilters((prev) => ({
              ...prev,
              startDate: dates[0]!.startOf("day").toISOString(),
              endDate: dates[1]!.endOf("day").toISOString(),
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
            value: [dayjs().subtract(6, "d"), dayjs().startOf("day")],
          },
          {
            label: "Últimos 15 días",
            value: [dayjs().subtract(14, "d"), dayjs().startOf("day")],
          },
          {
            label: "Últimos 30 días",
            value: [dayjs().subtract(29, "d"), dayjs().startOf("day")],
          },
          {
            label: "Últimos 90 días",
            value: [dayjs().subtract(89, "d"), dayjs().startOf("day")],
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
        Descargar envíos {selectedRows.length > 0 && `(${selectedRows.length})`}
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
  );
};
