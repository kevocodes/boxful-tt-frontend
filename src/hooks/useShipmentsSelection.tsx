import { useState } from "react";
import type { Key } from "react";
import { Checkbox, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Shipment } from "@/types/shipment";
import { TableRowSelection } from "antd/es/table/interface";

export const useShipmentsSelection = (dataItems: Shipment[] = []) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Shipment[]>([]);

  const onSelectChange = (
    newSelectedRowKeys: Key[],
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

  const rowSelection: TableRowSelection<Shipment> = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    columnTitle: (
      <div className="relative inline-flex items-center">
        <Checkbox
          checked={
            dataItems.length > 0 &&
            dataItems.every((item) => selectedRowKeys.includes(item.id))
          }
          indeterminate={
            dataItems.some((item) => selectedRowKeys.includes(item.id)) &&
            !dataItems.every((item) => selectedRowKeys.includes(item.id))
          }
          onChange={(e) => {
            const checked = e.target.checked;
            const currentIds = dataItems.map((item) => item.id);
            if (checked) {
              const newKeys = Array.from(
                new Set([...selectedRowKeys, ...currentIds]),
              );
              setSelectedRowKeys(newKeys);
              setSelectedRows((prev) => {
                const existingIds = new Set(prev.map((r) => r.id));
                const newRows = dataItems.filter(
                  (item) => !existingIds.has(item.id),
                );
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
          <div className="absolute left-full ml-1.5 flex items-center">
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
              <DownOutlined className="cursor-pointer text-[10px] text-[#666]" />
            </Dropdown>
          </div>
        )}
      </div>
    ),
  };

  return {
    selectedRowKeys,
    selectedRows,
    rowSelection,
    setSelectedRowKeys,
    setSelectedRows,
  };
};
