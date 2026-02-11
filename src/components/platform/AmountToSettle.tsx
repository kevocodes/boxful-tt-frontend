"use client";

import { WalletOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useBalance } from "@/hooks/useBalance";
import { useBalanceSSE } from "@/hooks/useBalanceSSE";

export const AmountToSettle = () => {
  const { data: session } = useSession();

  useBalanceSSE(session?.accessToken);
  const { data: balance, isLoading } = useBalance();

  return (
    <div className="flex items-center gap-2 bg-[#E1E8E7] px-3 h-8 md:h-10 py-1 rounded">
      <WalletOutlined className="text-lg text-success-dark!" />
      <span className="sm:block hidden text-sm text-success-dark font-medium">
        Monto a liquidar
      </span>
      <span className="text-sm font-bold text-success-dark">
        {isLoading || !balance?.data ? (
          <span
            className={`transition-opacity duration-500 ${isLoading ? "animate-pulse" : ""}`}
          >
            ----
          </span>
        ) : (
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: balance?.data?.currency || "USD",
          }).format(Number(balance?.data?.balance || 0))
        )}
      </span>
    </div>
  );
};
