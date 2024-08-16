import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {withZod} from '@rvf/zod';
import {EnumLike, z} from 'zod';
import {IQueryDto, TQueryFilter} from '~/.server/shared/dto/query.dto';

export const sortValueToField = <O extends object>(value: string) => {
  const [field, order] = value.split('_');
  return {
    [field]: order
  } as O;
};

export const makePagination = (take: number, skip: number): IOffsetPaginationInfoDto => {
  return {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0
  };
};

export const hasNextCalculate = (pagination: IOffsetPaginationInfoDto): boolean => {
  return pagination.skip + pagination.take < pagination.total;
};

export const queryToPagination = async (searchParams: URLSearchParams, limit: number = 15, defaultTake = 5): Promise<IOffsetPaginationInfoDto> => {
  let take = defaultTake;
  let skip = 0;

  const queryValidator = withZod(
    z.object({
      take: z.coerce.number().int().positive().max(limit).optional(),
      skip: z.coerce.number().int().nonnegative().optional(),
    })
  );

  const {data} = await queryValidator.validate(
    searchParams
  );

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  return makePagination(take, skip);
};

export const queryToSearch = async (searchParams: URLSearchParams): Promise<string | undefined> => {
  const queryValidator = withZod(
    z.object({
      q: z.string().optional(),
    })
  );

  const {data} = await queryValidator.validate(
    searchParams
  );

  return data?.q;
};

export const queryToSort = async <T extends EnumLike>(searchParams: URLSearchParams, sortEnum: T, defaultSort: keyof T): Promise<keyof T> => {
  const queryValidator = withZod(
    z.object({
      sort: z.nativeEnum(sortEnum).optional(),
    })
  );

  const {data} = await queryValidator.validate(
    searchParams
  );

  return (data?.sort || defaultSort) as keyof T;
};

export const makeQuery = <T extends TQueryFilter>(search: IQueryDto<T>['q'], sort: IQueryDto<T>['sort'], filters?: T): IQueryDto<T> => {
  return {
    q: search,
    sort,
    filters
  };
};

export const requestToSearchParams = (request: Request): URLSearchParams => {
  return new URL(request.url).searchParams;
};
