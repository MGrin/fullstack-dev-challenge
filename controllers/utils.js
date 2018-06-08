const getSavingsComputationParameters = ({ interestPaymentFrequency, yearInterest }) => {
  let interestCoeff = 1;
  let shouldPayInterest;
  let error;

  switch (interestPaymentFrequency) {
    case 'Monthly': {
      interestCoeff += yearInterest / 12;
      shouldPayInterest = () => true;
      break;
    }
    case 'Quarterly': {
      interestCoeff += yearInterest / 4;
      shouldPayInterest = month => month % 12 === 2 || month % 12 === 5 || month % 12 === 8 || month % 12 === 11;
      break;
    }
    case 'Annually': {
      interestCoeff += yearInterest;
      shouldPayInterest = month => month % 12 === 11;
      break;
    }

    default: error = new Error('Unknown interestPaymentFrequency ' + interestPaymentFrequency);
  }

  return { interestCoeff, shouldPayInterest, error };
};

module.exports = {
  getSavingsComputationParameters,
};
