"use client";

import { useEffect, useState, useCallback } from "react";
import { getCampaigns } from "../services/campaign.service";
import { Campaign } from "../types/campaign";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function useCampaigns() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async (retryCount = 0): Promise<void> => {
    try {
      setError(null);
      const campaigns = await getCampaigns();
      setData(campaigns);
      setLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch campaigns";

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
        return fetchCampaigns(retryCount + 1);
      }

      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCampaigns();
  }, [fetchCampaigns]);

  return { data, loading, error, refetch };
}
