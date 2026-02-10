import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { CreateShipmentDto, Shipment } from "@/types/shipment";
import { Meta } from "@/types/metadata";

const baseRoute = "/shipments";

export async function createShipment(
  data: CreateShipmentDto,
  token: string,
): Promise<ApiResponse<Shipment>> {
  const response = await api.post<ApiResponse<Shipment>>(`${baseRoute}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export interface ShipmentQuery {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  orderId?: string;
  customerName?: string;
  customerLastname?: string;
  customerState?: string;
  customerCity?: string;
}

export async function getShipments(
  query: ShipmentQuery,
  token?: string,
): Promise<ApiResponse<{ items: Shipment[]; meta: Meta }>> {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.startDate) params.append("startDate", query.startDate);
  if (query.endDate) params.append("endDate", query.endDate);
  if (query.orderId) params.append("orderId", query.orderId);
  if (query.customerName) params.append("customerName", query.customerName);
  if (query.customerLastname)
    params.append("customerLastname", query.customerLastname);
  if (query.customerState) params.append("customerState", query.customerState);
  if (query.customerCity) params.append("customerCity", query.customerCity);

  const response = await api.get<
    ApiResponse<{ items: Shipment[]; meta: Meta }>
  >(`${baseRoute}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
