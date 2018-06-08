const utils = require('./utils');

const compute = ({
  initialSavings = 0,
  monthlySavings = 0,
  yearInterest = 0,
  years = 50,
  interestPaymentFrequency = 'Annually',
}) => new Promise((resolve, reject) => {
  if (initialSavings < 0 || monthlySavings < 0 || years < 0) {
    return reject(new Error('Initial savings or Montly savings or years should not be negative'));
  }
  const data = [];
  const { interestCoeff, shouldPayInterest, error } = utils.getSavingsComputationParameters({ interestPaymentFrequency, yearInterest });

  if (error) return reject(error);

  let lastAmount = initialSavings;
  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      let amount = lastAmount + monthlySavings;
      if (shouldPayInterest(month)) amount *= interestCoeff;

      data.push({
        year,
        month,
        amount,
      });

      lastAmount = amount;
    }
  }

  return resolve(data);
});

module.exports = {
  compute,
};
