export const makeTextShorter = (string: string | null) => {
  if (!string) return '';

  if (string.length > 20) {
    return `${string?.slice(0, 20)}...`;
  }
  return string;
}

