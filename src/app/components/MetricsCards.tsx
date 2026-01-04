"use client";

import { Campaign } from "../../types/campaign";
import {
  formatCurrency,
  formatNumber,
} from "../../utils/format";

interface Props {
  data: Campaign[];
}

export default function MetricsCards({ data }: Props) {
  const totalSpend = data.reduce((sum, c) => sum + (c.spend || 0), 0);
  const totalClicks = data.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const totalImpressions = data.reduce(
    (sum, c) => sum + (c.impressions || 0),
    0
  );
  const avgCTR = totalImpressions > 0 
    ? ((totalClicks / totalImpressions) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card
        title="Total Spend"
        value={formatCurrency(totalSpend)}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="from-blue-500 to-blue-600"
      />
      <Card
        title="Total Clicks"
        value={formatNumber(totalClicks)}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        }
        gradient="from-purple-500 to-purple-600"
      />
      <Card
        title="Impressions"
        value={formatNumber(totalImpressions)}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        }
        gradient="from-green-500 to-green-600"
      />
      <Card
        title="Average CTR"
        value={`${avgCTR}%`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
        gradient="from-orange-500 to-orange-600"
      />
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="card group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}
