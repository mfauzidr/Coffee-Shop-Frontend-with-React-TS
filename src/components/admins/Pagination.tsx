import { useEffect, useState } from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pages, currentPage, onPageChange }: PaginationProps) => {
  const [pageArray, setPageArray] = useState<(number | string)[]>([]);

  useEffect(() => {
    const generatePageArray = () => {
      let newPages: (number | string)[];
      if (pages <= 4) {
        newPages = Array.from({ length: pages }, (_, index) => index + 1);
      } else {
        if (currentPage <= 3) {
          newPages = [1, 2, 3, 4, "...", pages];
        } else if (currentPage >= pages - 2) {
          newPages = [1, "...", pages - 3, pages - 2, pages - 1, pages];
        } else {
          newPages = [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            pages,
          ];
        }
      }
      setPageArray(newPages);
    };

    generatePageArray();
  }, [pages, currentPage]);

  if (pages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2">
        {pageArray.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() =>
              pageNumber !== "..." ? onPageChange(pageNumber as number) : null
            }
            className={`flex justify-center items-center ${
              currentPage === pageNumber ? "font-extrabold underline" : ""
            } text-sm`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="flex justify-center items-center hover:font-bold"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
