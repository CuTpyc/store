export interface IOffsetPaginationInfoDto {
  skip: number;
  take: number;
  hasNext: boolean;
  hasPrevious: boolean;
  total: number;
  count: number;
}
