import React from 'react';
import './style.css'
import { usePagination } from '../../hooks/use-pagination';

function Pagination({onPageChange, currentPage, totalPage}) {

    const paginationRange = usePagination(totalPage, currentPage)

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
              onClick={() => onPageChange(pageNumber)}
              className={ 'Pagination-button' + (pageNumber === currentPage ? ' Pagination-button__active' : '')}
            >
              {pageNumber}
            </button>
          );
        })}

      </div>
    );
}

export default React.memo(Pagination);