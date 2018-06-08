import { urlify } from './utils';
import { COMPUTE_SAVINGS } from './endpoints';

export const getSavings = params => new Promise((resolve, reject) => fetch(`${COMPUTE_SAVINGS}?${urlify(params)}`)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return reject(res.statusText);
  })
  .then(resolve)
  .catch(err => reject(err.message))
);