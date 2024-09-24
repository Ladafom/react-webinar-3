import { useMemo } from "react";
import { range } from "../utils";

export function usePagination (totalPageCount, currentPage) {

  const siblingCount = 1

  const paginationRange = useMemo(() => {

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    const sideItemCount = 3

    if(currentPage === 3) {
      const leftItemCount = sideItemCount + 1;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPageCount]
    }

    if(currentPage === totalPageCount - 2) {
      const rightRange = range(
        currentPage -1,
        totalPageCount
      );
      return [1, '...', ...rightRange];
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, sideItemCount);
      return [...leftRange, '...', totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(
        totalPageCount - sideItemCount + 1,
        totalPageCount
      );
      return [1, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...' , ...middleRange, '...', totalPageCount];
    }
  }, [currentPage]);

  return paginationRange;
};