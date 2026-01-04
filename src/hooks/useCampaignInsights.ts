"use client";

import { useEffect, useState, useCallback } from "react";
import { getCampaignInsights, streamCampaignInsights } from "../services/insights.service";
import { CampaignInsights } from "../types/insights";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function useCampaignInsights(
  campaignId: string | null,
  enableStreaming = false
) {
  const [data, setData] = useState<CampaignInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(
    async (retryCount = 0): Promise<void> => {
      if (!campaignId) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const insights = await getCampaignInsights(campaignId);
        setData(insights);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch campaign insights";

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
    },
    [campaignId]
  );

  useEffect(() => {
    if (!campaignId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    fetchInsights();

    // Set up streaming if enabled
    let eventSource: EventSource | null = null;
    if (enableStreaming) {
      eventSource = streamCampaignInsights(
        campaignId,
        (insights) => {
          setData(insights);
          setLoading(false);
        },
        (err) => {
          console.error("SSE error:", err);
          // Don't set error state for SSE errors, just log them
        }
      );
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [campaignId, enableStreaming, fetchInsights]);

  const refetch = useCallback(() => {
    if (!campaignId) return;
    setLoading(true);
    setError(null);
    fetchInsights();
  }, [campaignId, fetchInsights]);

  return { data, loading, error, refetch };
}

