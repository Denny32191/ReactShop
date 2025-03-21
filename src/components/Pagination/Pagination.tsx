import React from "react";
import { Pagination } from 'antd'
import "./PagintationControl.css"; // Импортируем стили

interface PaginationControlProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  return (
    <div style={{ marginTop: 24, textAlign: "center", display: "flex", justifyContent: "center" }}>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{ display: "flex", flexWrap: "nowrap", gap: 8 }}
        className="custom-pagination" 
      />
    </div>
  );
};

export default PaginationControl;