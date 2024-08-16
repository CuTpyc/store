export type TQueryFilter = Record<string, string | string[]>;

export interface IQueryDto<F extends TQueryFilter> {
  q?: string;
  sort?: `${string}_${('asc' | 'desc')}`;
  filters?: F;
}
