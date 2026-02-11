// src/hooks/useBalanceSSE.ts
"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { balanceSseClient } from "@/realtime/balanceSseClient";

export function useBalanceSSE(accessToken?: string) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!accessToken) return;

    const unsubscribe = balanceSseClient.subscribe(accessToken, () => {
      qc.invalidateQueries({ queryKey: ["balance"] });
      qc.invalidateQueries({
        queryKey: ["shipments"],
        exact: false,
        type: "active",
      });
    });

    return unsubscribe;
  }, [accessToken, qc]);
}
