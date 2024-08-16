export const reqSortToSort = (sort: `${string}_${('asc' | 'desc')}`): `${string} ${('asc' | 'desc')}` => {
  return sort.split('_').join(' ') as `${string} ${('asc' | 'desc')}`;
};

export const sortArrToReqSort = (sort: string[]): `${string}_${('asc' | 'desc')}` => {
  return sort[0].split(' ').join('_') as `${string}_${('asc' | 'desc')}`;
};
