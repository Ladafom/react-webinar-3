import React, { useState } from 'react';
import './style.css'
import { usePagination } from '../../hooks/use-pagination';
import useSelector from '../../store/use-selector';

function Pagination({onPageChange}) {

    const select = useSelector(state => ({
      currentPage: state.pagination.currentPage,
      totalPage: state.catalog.totalPage,
    }));

    const paginationRange = usePagination(select.totalPage, select.currentPage)

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
              className={ 'Pagination-button' + (pageNumber === select.currentPage ? ' Pagination-button__active' : '')}
            >
              {pageNumber}
            </button>
          );
        })}

      </div>
    );
}

export default React.memo(Pagination);