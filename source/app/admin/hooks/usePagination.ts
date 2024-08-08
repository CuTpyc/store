import type { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { useSearchParams } from '@remix-run/react';
import { IndexTablePaginationProps } from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';

export const usePagination = (
  pagination: IOffsetPaginationInfoDto
): IndexTablePaginationProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { hasNext, hasPrevious, skip, take, total, count } = pagination;

  const onNext = () => {
    setSearchParams((prev) => {
      prev.set('skip', (skip + take).toString());
      prev.set('take', take.toString());
      return prev;
    });
  };

  const onPrevious = () => {
    setSearchParams((prev) => {
      prev.set('skip', (skip - take).toString());
      prev.set('take', take.toString());
      return prev;
    });
  };

  return {
    hasNext,
    onNext,
    hasPrevious,
    onPrevious,
    label: `${count > 0 ? skip + 1 : 0}-${skip + count} of ${total}`,
  };
};
