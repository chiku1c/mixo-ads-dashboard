"use client";

import { useEffect, useState, useCallback } from "react";
import { getAggregateInsights } from "../services/insights.service";
import { AggregateInsights } from "../types/insights";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function useInsights() {
  const [data, setData] = useState<AggregateInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async (retryCount = 0): Promise<void> => {
    try {
      setError(null);
      const insights = await getAggregateInsights();
      setData(insights);
      setLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch insights";

      // Retry logic for network errors
      if (
        retryCount < MAX_RETRIES &&
        (errorMessage.includes("timeout") ||
          errorMessage.includes("network") ||
          errorMessage.includes("connection"))
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
        );
        return fetchInsights(retryCount + 1);
      }

      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchInsights();
  }, [fetchInsights]);

  return { data, loading, error, refetch };
}

