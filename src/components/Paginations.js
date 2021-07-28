import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Paginations({ videos, setCurrentPage, videosPerPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(videos.length / videosPerPage); i++) {
    pageNumbers.push(i);
  }
  const currentPageHandler = (e) => {
    setCurrentPage(e.target.id);
  };
  return (
    <Pagination aria-label="videos navigation">
      {pageNumbers.map((number) => (
        <PaginationItem key={number}>
          <PaginationLink id={number} onClick={currentPageHandler}>
            {number}
          </PaginationLink>{" "}
        </PaginationItem>
      ))}
    </Pagination>
  );
}
