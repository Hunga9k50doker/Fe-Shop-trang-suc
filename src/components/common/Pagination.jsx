import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
function Pagination({
  itemsPerPage,
  data,
  children,
  currentItems,
  setCurrentItems,
}) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };
  return (
    <>
      {children}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="container__paginate"
        activeClassName="active__paginate"
        pageClassName="page__paginate"
        nextClassName="next__paginate"
        previousClassName="pre__paginate"
      />
    </>
  );
}
export default Pagination;
