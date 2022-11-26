export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const areObjectsEqual = (obj1: object, obj2: object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
