import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { CreateShipmentDto, Shipment } from "@/types/shipment";

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
