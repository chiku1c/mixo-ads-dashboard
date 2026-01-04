"use client";

import { Campaign } from "../../types/campaign";
import {
  formatCurrency,
  formatNumber,
} from "../../utils/format";

interface Props {
  data: Campaign[];
}

export default function CampaignTable({ data }: Props) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-badge status-active";
      case "paused":
        return "status-badge status-paused";
      case "completed":
      case "ended":
        return "status-badge status-ended";
      default:
        return "status-badge status-ended";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "completed":
        return "Completed";
      case "ended":
        return "Ended";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Impressions
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                CTR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">No campaigns found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((campaign) => {
                const impressions = campaign.impressions || 0;
                const clicks = campaign.clicks || 0;
                const ctr = impressions > 0
                  ? ((clicks / impressions) * 100).toFixed(2)
                  : "0.00";
                
                return (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusClass(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(campaign.spend || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                      {formatNumber(campaign.impressions || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                      {formatNumber(campaign.clicks || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {ctr}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
