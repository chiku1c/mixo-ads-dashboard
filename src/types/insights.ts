export interface CampaignInsights {
  campaign_id: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc?: number;
  cpm?: number;
  conversions?: number;
  conversion_rate?: number;
  revenue?: number;
  roas?: number;
}

export interface AggregateInsights {
  total_spend: number;
  total_impressions: number;
  total_clicks: number;
  average_ctr: number;
  total_campaigns: number;
  active_campaigns: number;
  total_conversions?: number;
  total_revenue?: number;
  average_roas?: number;
}

export interface InsightsResponse {
  insights: CampaignInsights[];
  aggregate?: AggregateInsights;
}

export interface AggregateInsightsResponse {
  aggregate: AggregateInsights;
}

