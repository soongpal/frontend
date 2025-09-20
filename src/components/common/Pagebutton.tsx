//상품 페이지네이션을 위한 버튼
import React from "react";
import useProductStore from "../../stores/productStore"

import { ChevronLeft,ChevronRight  } from "react-bootstrap-icons";

interface PaginationProps {
  maxButtons?: number;
}

const PageButton: React.FC<PaginationProps> = ({ maxButtons = 5 }) => {
  const { page, totalPages, setPage } = useProductStore((state) => ({
    page: state.page,
    totalPages: state.totalPages,
    setPage: state.setPage,
  }));

  if (totalPages <= 1) return null; // 페이지가 1개면 페이지 버튼 없음

  // 보여줄 버튼 갯수 계산
  const startPage = Math.max(0, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      {/* 이전 버튼 */}
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
       <ChevronLeft/>
      </button>

      {/* 페이지 번호 버튼 */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 border rounded ${
            p === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {p + 1} 
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        <ChevronRight/>
      </button>
    </div>
  );
};

export default PageButton;
