import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";
import { ShipmentQuery } from "@/services/shipments.service";

export const useShipmentsFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ShipmentQuery>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    startDate: searchParams.get("startDate")
      ? searchParams.get("startDate")!
      : dayjs().subtract(6, "day").startOf("day").toISOString(),
    endDate: searchParams.get("endDate")
      ? searchParams.get("endDate")!
      : dayjs().endOf("day").toISOString(),
    orderId: searchParams.get("orderId") || undefined,
    customerName: searchParams.get("customerName") || undefined,
    customerLastname: searchParams.get("customerLastname") || undefined,
    customerState: searchParams.get("customerState") || undefined,
    customerCity: searchParams.get("customerCity") || undefined,
  });

  const [activeQuery, setActiveQuery] = useState<ShipmentQuery>(filters);

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

  const handleClearAll = () => {
    const defaultStart = dayjs().subtract(6, "day").startOf("day").toISOString();
    const defaultEnd = dayjs().endOf("day").toISOString();

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

  const setPage = (page: number, pageSize: number) => {
    setFilters((prev) => ({ ...prev, page, limit: pageSize }));
    setActiveQuery((prev) => ({ ...prev, page, limit: pageSize }));
  };

  return {
    filters,
    setFilters,
    activeQuery,
    setActiveQuery,
    handleSearch,
    handleReset,
    handleClearAll,
    setPage,
  };
};
