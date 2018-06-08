const assert = require('assert');
const savings = require('../../controllers/savings');

describe('savings.compute', () => {
  it('should return error if initialSavings is negative', (done) => {
    savings
      .compute({ initialSavings: -1 })
      .catch((err) => {
        assert(err);
        done();
      });
  });

  it('should return error if monthlySavings is negative', (done) => {
    savings
      .compute({ monthlySavings: -1 })
      .catch((err) => {
        assert(err);
        done();
      });
  });

  it('should return error if years is negative', (done) => {
    savings
      .compute({ years: -1 })
      .catch((err) => {
        assert(err);
        done();
      });
  });

  it('should retrn error if interestPaymentFrequency value is unknown', (done) => {
    savings
      .compute({ interestPaymentFrequency: 'trololo' })
      .catch((err) => {
        assert(err);
        done();
      });
  });

  it('should return an array if every parameter is ok', (done) => {
    savings
      .compute({})
      .then((data) => {
        assert(data);
        done();
      });
  })
});
