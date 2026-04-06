import React from 'react';
import '../../styles/components/Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrev = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        if (!pages.includes('...')) {
          pages.push('...');
        }
      }

      // Always show last
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          className={`pagination-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      );
    });
  };

  if (totalPages <= 0) return null;

  return (
    <nav className={`pagination ${className}`} aria-label="Pagination Navigation">
      <button
        className="pagination-item pagination-arrow"
        onClick={handlePrev}
        disabled={isFirstPage}
        aria-label="Go to previous page"
      >
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        className="pagination-item pagination-arrow"
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Go to next page"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
