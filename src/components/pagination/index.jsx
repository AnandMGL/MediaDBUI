import React from "react";
import ReactPaginate from "react-paginate";
import "./index.scss";

export default function Pagination({ handlePageClick, list, size, count }) {
  return (
    <ReactPaginate
      nextLabel=""
      onPageChange={handlePageClick}
      pageRangeDisplayed={window.innerWidth < 767 ? 2 : 3}
      marginPagesDisplayed={window.innerWidth < 767 ? 1 : 4}
      pageCount={count}
      previousLabel=""
      pageClassName="page-item"
      pageLinkClassName="page-link flex-center"
      previousClassName="page-item"
      previousLinkClassName="page-link flex-center prev"
      nextClassName="page-item"
      nextLinkClassName="page-link flex-center next"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link flex-center"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
}
