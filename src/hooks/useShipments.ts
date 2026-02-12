import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShipments, ShipmentQuery } from "@/services/shipments.service";
import { useSession } from "next-auth/react";

export const useShipments = (activeQuery: ShipmentQuery) => {
  const session = useSession();

  const query = useQuery({
    queryKey: ["shipments", activeQuery],
    queryFn: () => getShipments(activeQuery, session.data?.accessToken),
    placeholderData: keepPreviousData,
    enabled: !!session.data?.accessToken,
    gcTime: 0,
    staleTime: 0,
  });

  return {
    ...query,
    isLoading:
      query.isLoading || query.isFetching || session.status === "loading",
  };
};
