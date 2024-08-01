export const splitFirstName = (firstName: string): [string, string] => {
  const split = firstName.split(' ');

  if (split.length === 1) {
    return [split[0], ''];
  }

  return [split[0], split[1]];
};

export const joinFirstName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
