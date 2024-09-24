import React, { useState } from 'react';
import './style.css'
import { usePagination } from '../../hooks/use-pagination';

function Pagination({onPageChange, totalPage}) {

  if(totalPage){

    const [currentPage, setCurrentPage] = useState(1)

    const paginationRange = usePagination(totalPage, currentPage);

    function handlePageChange (pageNumber) {
      setCurrentPage(pageNumber)
      onPageChange(pageNumber)
    }

    return (
      <div className='Pagination'>
        {paginationRange.map((pageNumber, index) => {

          if(pageNumber === '...')
          {
            return (
              <div className='Pagination-dots' key={index}>
                {pageNumber}
              </div>
            )
          }

          return (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={ 'Pagination-button' + (pageNumber === currentPage ? ' Pagination-button__active' : '')}
            >
              {pageNumber}
            </button>
          );
        })}

      </div>
    );
  }

}

export default React.memo(Pagination);