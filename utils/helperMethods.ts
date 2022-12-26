export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const areObjectsEqual = (obj1: object, obj2: object): boolean =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const compatObject = (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

export const printAsJson = (obj: object): void =>
  console.log(JSON.stringify(obj, null, 2));
