import React, { useState } from 'react';
import Pagination from '../../components/common/Pagination';
import Card from '../../components/common/Card';

const DevPaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = 72; // 12 pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`Page changed to: ${page}`);
  };

  return (
    <div style={{ padding: '48px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px', color: '#22262b' }}>
        Pagination Dev Sandbox
      </h1>

      <Card>
        <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Default View (12 Pages)</h2>
        <p style={{ marginBottom: '24px', color: '#4b5563' }}>
          Current Page: {currentPage} / {totalPages}
        </p>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>

      <Card style={{ marginTop: '32px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Small Number of Pages (3 Pages)</h2>
        <Pagination currentPage={1} totalPages={3} onPageChange={(p) => console.log(p)} />
      </Card>

      <Card style={{ marginTop: '32px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Single Page</h2>
        <Pagination currentPage={1} totalPages={1} onPageChange={(p) => console.log(p)} />
      </Card>
    </div>
  );
};

export default DevPaginationPage;
