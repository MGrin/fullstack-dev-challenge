const express = require('express');
const savings = require('../controllers/savings');
const router = express.Router();

router.get('/compute', (req, res) => {
  const {
    initialSavings,
    monthlySavings,
    yearInterest,
    years,
    interestPaymentFrequency,
  } = req.query;
  if (!initialSavings || !monthlySavings || !yearInterest) {
    return res.status(400).json(new Error('Missing fields'));
  }

  const parsedParams = {
    initialSavings: Number(initialSavings),
    monthlySavings: Number(monthlySavings),
    yearInterest: Number(yearInterest),
    years: Number(years),
  }
  
  const areNumbers = Object
    .keys(parsedParams)
    .reduce((res, key) => res && !Number.isNaN(parsedParams[key]), true);
  
  if (!areNumbers) {
    return res.status(400).json(new Error('Parameters should be numbers'));
  }

  parsedParams.interestPaymentFrequency = interestPaymentFrequency;

  return savings
    .compute(parsedParams)
    .then(values => res.json(values))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error)
    });
});

module.exports = router;
