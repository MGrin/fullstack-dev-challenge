export const exist = v => v !== null && v !== undefined;

export const urlify = obj => Object
  .keys(obj)
  .reduce((res, key) => exist(obj[key]) ? `${res}${key}=${encodeURI(obj[key])}&` : res, '');