import { useState } from 'react';

export default function DeliveryDates({ deliveryDates }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort and paginate the dates
  const sortedDates = [...deliveryDates].sort((a, b) => new Date(b) - new Date(a));
  const totalPages = Math.ceil(sortedDates.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedDates.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Delivery Dates :</h2>
      <ul className="list-disc pl-5">
        {currentItems.length > 0 ? (
          currentItems.map((date, idx) => (
            <li key={idx}>{date}</li>
          ))
        ) : (
          <li>No deliveries yet</li>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
