"use client";

import { usePageTitleStore } from "@/store/usePageTitleStore";
import { useEffect, useState } from "react";
import { App } from "antd";
import dayjs from "dayjs";
import { Package } from "@/types/shipment";
import { useShipmentsFilter } from "../../../hooks/useShipmentsFilter";
import { useShipments } from "../../../hooks/useShipments";
import { useShipmentsSelection } from "../../../hooks/useShipmentsSelection";
import { ShipmentsFilterBar } from "./components/ShipmentsFilterBar";
import { ShipmentsTable } from "./components/ShipmentsTable";
import { PackageDetailsModal } from "./components/PackageDetailsModal";

function ShipmentsView() {
  const { message } = App.useApp();
  const { setTitle } = usePageTitleStore();

  const {
    filters,
    setFilters,
    activeQuery,
    setActiveQuery,
    handleSearch,
    handleReset,
    handleClearAll,
  } = useShipmentsFilter();

  const { data, isLoading } = useShipments(activeQuery);

  const { selectedRows, rowSelection } = useShipmentsSelection(
    data?.data.items,
  );

  // Modal State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [currentPackages, setCurrentPackages] = useState<Package[]>([]);

  useEffect(() => {
    setTitle("Historial de envíos");
  }, [setTitle]);

  const showPackagesModal = (packages: Package[]) => {
    setCurrentPackages(packages);
    setIsPackageModalOpen(true);
  };

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
        row.orderNumber,
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

  return (
    <div>
      <ShipmentsFilterBar
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        selectedRows={selectedRows}
        handleDownload={handleDownload}
        handleClearAll={handleClearAll}
      />

      <ShipmentsTable
        data={data?.data}
        isLoading={isLoading}
        activeQuery={activeQuery}
        rowSelection={rowSelection}
        setFilters={setFilters}
        setActiveQuery={setActiveQuery}
        onShowPackages={showPackagesModal}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />

      <PackageDetailsModal
        open={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        packages={currentPackages}
      />
    </div>
  );
}

export default ShipmentsView;
