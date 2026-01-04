export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: "active" | "paused" | "completed" | string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
  // Calculated/derived fields
  spend?: number;
  impressions?: number;
  clicks?: number;
}

// API Response types
export interface ApiCampaignResponse {
  id: string;
  name: string;
  brand_id: string;
  status: "active" | "paused" | "completed";
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface ApiResponse {
  campaigns: ApiCampaignResponse[];
  total: number;
}
