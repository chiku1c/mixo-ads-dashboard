import {
  CampaignInsights,
  AggregateInsights,
  AggregateInsightsResponse,
} from "../types/insights";

// Validate environment variable (lazy evaluation to avoid build-time errors)
const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE environment variable is not set. Please configure it in your .env file or Vercel environment variables."
    );
  }
  return baseUrl;
};

// API timeout in milliseconds (10 seconds)
const API_TIMEOUT = 10000;

// Create fetch with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout: The API took too long to respond");
    }
    throw error;
  }
};

// Validate aggregate insights response
const validateAggregateInsightsResponse = (
  data: unknown
): data is AggregateInsightsResponse => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const response = data as Record<string, unknown>;

  if (!response.aggregate || typeof response.aggregate !== "object") {
    return false;
  }

  const aggregate = response.aggregate as Record<string, unknown>;

  return (
    typeof aggregate.total_spend === "number" &&
    typeof aggregate.total_impressions === "number" &&
    typeof aggregate.total_clicks === "number" &&
    typeof aggregate.average_ctr === "number" &&
    typeof aggregate.total_campaigns === "number" &&
    typeof aggregate.active_campaigns === "number"
  );
};

// Validate campaign insights response
const validateCampaignInsights = (
  data: unknown
): data is CampaignInsights => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const insights = data as Record<string, unknown>;

  return (
    typeof insights.campaign_id === "string" &&
    typeof insights.spend === "number" &&
    typeof insights.impressions === "number" &&
    typeof insights.clicks === "number" &&
    typeof insights.ctr === "number"
  );
};

/**
 * Get aggregate metrics across all campaigns
 */
export const getAggregateInsights = async (): Promise<AggregateInsights> => {
  try {
    const BASE_URL = getBaseUrl();
    const response = await fetchWithTimeout(`${BASE_URL}/campaigns/insights`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const statusText = response.statusText || "Unknown error";
      throw new Error(
        `Failed to fetch aggregate insights: ${response.status} ${statusText}`
      );
    }

    const data: unknown = await response.json();

    if (!validateAggregateInsightsResponse(data)) {
      throw new Error(
        "Invalid API response format: Expected aggregate insights object with required fields"
      );
    }

    return data.aggregate;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error(
          "The server took too long to respond. Please check your connection and try again."
        );
      }
      if (error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to the server. Please check your network connection and API configuration."
        );
      }
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching aggregate insights");
  }
};

/**
 * Get metrics for a specific campaign
 */
export const getCampaignInsights = async (
  campaignId: string
): Promise<CampaignInsights> => {
  try {
    const BASE_URL = getBaseUrl();
    const response = await fetchWithTimeout(
      `${BASE_URL}/campaigns/${campaignId}/insights`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const statusText = response.statusText || "Unknown error";
      throw new Error(
        `Failed to fetch campaign insights: ${response.status} ${statusText}`
      );
    }

    const data: unknown = await response.json();

    if (!validateCampaignInsights(data)) {
      throw new Error(
        "Invalid API response format: Expected campaign insights object with required fields"
      );
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error(
          "The server took too long to respond. Please check your connection and try again."
        );
      }
      if (error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to the server. Please check your network connection and API configuration."
        );
      }
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching campaign insights");
  }
};

/**
 * Stream real-time metrics via Server-Sent Events (SSE)
 * Returns an EventSource for streaming data
 */
export const streamCampaignInsights = (
  campaignId: string,
  onMessage: (data: CampaignInsights) => void,
  onError?: (error: Event) => void
): EventSource => {
  const BASE_URL = getBaseUrl();
  const eventSource = new EventSource(
    `${BASE_URL}/campaigns/${campaignId}/insights/stream`
  );

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as unknown;
      if (validateCampaignInsights(data)) {
        onMessage(data);
      }
    } catch (error) {
      console.error("Error parsing SSE message:", error);
    }
  };

  if (onError) {
    eventSource.onerror = onError;
  }

  return eventSource;
};

