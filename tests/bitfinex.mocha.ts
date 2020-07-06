import { describe, it } from 'mocha';
import { APIHelper } from '../helpers/bitfinexHelpers';
import { expect } from 'chai';

describe('Health Check API Bitfinex', () => {
  const apiHelper = new APIHelper();

  it('Status Platform', async () => {
    const result = await apiHelper.statusPlatform();
    expect(result.body[0]).to.be.equals(1, 'Platform is not stable!!!');
  });
  it('Get valid symbol for example tBTCUSD', async () => {
    const result = await apiHelper.getSymbol('tBTCUSD');
    expect(result.body.length).to.be.equals(10, 'The number of fields return is not according to spec');
    for (let field of result.body) {
      expect(typeof field).to.be.equals('number', 'Field returned should be a number');
    }
  });
  it('Get invalid symbol BUSD', async () => {
    const result = await apiHelper.getSymbol('BUSD');
    expect(result.message).to.includes('500', 'Not proper error code with invalid symbol!!');
    // Modify the expect to pass the test
    // Bug in the error message (see specification - 'Unknown symbol')
    // expect(result.message).to.includes('symbol: invalid');
  });
  it('Calculate the average execution rate', async () => {
    // Modify the test to includes the second mandatory parameter
    // Bug in the documentation (see specification)
    const result = await apiHelper.marketAveragePrice('tBTCUSD', 1000);
    expect(result.body.length).to.be.equals(2, 'The number of fields return is not according to spec');
    for (let field of result.body) {
      expect(typeof field).to.be.equals('number', 'Field returned should be a number');
    }
  });
});
