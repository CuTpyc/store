export const containsInsensitive = (search: string): { contains: string, mode: 'insensitive' } => {
  return {contains: search, mode: 'insensitive' as const};
};
