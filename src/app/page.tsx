"use client";

import { useState, useEffect } from "react";
import useCampaigns from "../hooks/useCampaigns";
import DashboardHeader from "./components/DashboardHeader";
import MetricsCards from "./components/MetricsCards";
import CampaignTable from "./components/CampaignTable";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

export default function Page() {
  const { data, loading, error, refetch } = useCampaigns();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = data?.filter(
    (c) => !status || c.status === status
  ) || [];

  const pageData = filteredData.slice(
    (page - 1) * 5,
    page * 5
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => refetch()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        <MetricsCards data={filteredData} />
        <Filters status={status} setStatus={setStatus} />
        <CampaignTable data={pageData} />
        <Pagination
          page={page}
          total={filteredData.length}
          setPage={setPage}
        />
      </div>
    </main>
  );
}
