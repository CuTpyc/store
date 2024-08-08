import { useEffect, useState } from 'react';

export const useDebounce = <V>(value: V, delayMs: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const t = setTimeout(() => {
        setDebouncedValue(value);
      }, delayMs);

      return () => {
        clearTimeout(t);
      };
    },
    [value, delayMs] // re-run if value or delay changes
  );
  return debouncedValue;
};
