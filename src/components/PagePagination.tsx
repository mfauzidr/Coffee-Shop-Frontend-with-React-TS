import FeatherIcon from 'feather-icons-react';
import { useEffect, useState } from 'react'

const PagePagination = ({ pages, currentPage, onPageChange }) => {
  const [pageArray, setPageArray] = useState([])

  useEffect(() => {
    const newPageArray = () => {
      let newPages
      if (pages <= 4) {
        newPages = Array.from({ length: pages }, (_, index) => index + 1)
      } else {
        if (currentPage <= 3) {
          newPages = [1, 2, 3, 4, '...', pages]
        } else if (currentPage >= pages - 2) {
          newPages = [1, '...', pages - 3, pages - 2, pages - 1, pages]
        } else {
          newPages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pages]
        }
      }
      setPageArray(newPages)
    }

    newPageArray()
  }, [pages, currentPage])


  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex gap-5">
        {pageArray.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => (pageNumber !== '...' ? onPageChange(pageNumber) : null)}
            className={`flex justify-center items-center ${ currentPage === pageNumber ? 'text-white bg-amber-500' : 'text-black bg-gray-100'} rounded-full w-10 h-10`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="flex justify-center items-center bg-amber-500 rounded-full w-10 h-10"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          <FeatherIcon icon="arrow-right" />
        </button>
      </div>
    </div>
  )
}

export default PagePagination
