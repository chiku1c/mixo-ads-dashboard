"use client";

interface Props {
  page: number;
  total: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  setPage,
}: Props) {
  const pages = Math.ceil(total / 5);
  const itemsPerPage = 5;

  if (pages <= 1) {
    return <div className="mt-6"></div>;
  }

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{total}</span> campaigns
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: pages }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = page === pageNumber;
            
            // Show first page, last page, current page, and pages around current
            if (
              pageNumber === 1 ||
              pageNumber === pages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === page - 2 ||
              pageNumber === page + 2
            ) {
              return (
                <span key={pageNumber} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pages}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
