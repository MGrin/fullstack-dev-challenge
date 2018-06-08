import { urlify, exist } from './utils';

it('checks for value existance inside a variable', () => {
  expect(exist(null)).toBe(false);
  expect(exist(0)).toBe(true);
  let a;
  expect(exist(a)).toBe(false);
  a = [];
  expect(exist(a)).toBe(true);
});

it('transforms an object into url parameters', () => {
  const params = {
    z: 0,
    a: 1,
    b: 2,
    c: 'test',
    d: undefined,
  };
  const urlParams = urlify(params);
  expect(urlParams).toBe(`z=0&a=1&b=2&c=test&`);
});
