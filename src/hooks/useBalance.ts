import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/services/shipments.service";
import { useSession } from "next-auth/react";

export function useBalance() {
  const session = useSession();

  const query = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(session.data?.accessToken),
    enabled: !!session.data?.accessToken,
  });

  return {
    ...query,
    isLoading:
      query.isLoading || query.isFetching || session.status === "loading",
  };
}
