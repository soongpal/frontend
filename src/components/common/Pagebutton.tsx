//상품 페이지네이션을 위한 버튼
import React from "react";
import useProductStore from "../../stores/productStore";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

interface PaginationProps {
  maxButtons?: number;
}

const PageButton: React.FC<PaginationProps> = ({ maxButtons = 5 }) => {
  const page = useProductStore((state) => state.page);
  const totalPages = useProductStore((state) => state.totalPages);
  const setPage = useProductStore((state) => state.setPage);

  if (totalPages <= 1) return null; // 페이지가 1개면 페이지 버튼 없음

  // 보여줄 버튼 갯수 계산
  const startPage = Math.max(0, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">

      <nav aria-label="Page navigation">
        <ul className="pagination">
          {/* 이전 버튼 */}

          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              <ChevronLeft />
            </button>
          </li>

          {/* 페이지 번호 버튼 */}
          {pages.map((p) => (

            <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(p)}>
                {p + 1}
              </button>
            </li>
          ))}

          {/* 다음 버튼 */}

          <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages - 1}
            >
              <ChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageButton;