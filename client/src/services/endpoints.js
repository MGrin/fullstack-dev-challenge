const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export const COMPUTE_SAVINGS = `${host}/savings/compute`;
