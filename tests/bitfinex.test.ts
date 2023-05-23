import { expect } from 'chai';
import { APIHelper } from '../helpers/bitfinexHelpers';

describe('Health Check API Bitfinex', () => {
  const apiHelper = new APIHelper();

  it('Status Platform', async () => {
    const result = await apiHelper.statusPlatform();
    expect(result.body[0]).to.equal(1, 'Platform is not stable!!!');
  });

  it('Get valid symbol for example tBTCUSD', async () => {
    const result = await apiHelper.getSymbol('tBTCUSD');
    expect(result.body).to.have.lengthOf(10, 'The number of fields returned is not according to spec');
    result.body.forEach((field: number) => expect(field).to.be.a('number', 'Field returned should be a number'));
  });

  it('Get invalid symbol BUSD', async () => {
    const result = await apiHelper.getSymbol('BUDASDFSD');
    expect(result.code).to.include('ERR_NON_2XX_3XX_RESPONSE', 'Not proper error code with invalid symbol!!');
  });

  it('Calculate the average execution rate', async () => {
    // Add the second mandatory parameter to the test
    const result = await apiHelper.marketAveragePrice('tBTCUSD', 1000);
    expect(result.body).to.have.lengthOf(2, 'The number of fields returned is not according to spec');
    result.body.forEach((field: number) => expect(field).to.be.a('number', 'Field returned should be a number'));
  });
});
