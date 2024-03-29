import { expect } from 'chai';
import { MostPopularApiHelper } from '../helpers/newYorkHelpers';

describe('Test Suite - Most Popular API', () => {
  const apiHelper = new MostPopularApiHelper();
  const validDays: number[] = [1, 7, 30];
  const invalidDays = [0, 16, 31, 'asdf'];

  it('Check positive results - /emailed', async () => {
    // Select random days from the validDays array
    const day = validDays[Math.floor(Math.random() * validDays.length)];
    const result = await apiHelper.email_popular_by_days(day);
    expect(result.statusCode).to.be.equals(200, 'Code error when requesting popular emails articles');
    expect(result.body.num_results).to.be.a('number');
    expect(result.body.results).to.be.a('array');
  });

  it('Check negative results - /emailed', async () => {
    const day = invalidDays[Math.floor(Math.random() * invalidDays.length)];
    const result = await apiHelper.email_popular_by_days(day);
    expect(result.message).to.be.equal('Response code 404 (Not Found)');
  });

  it('Check wrong key access - /emailed', async () => {
    const result = await apiHelper.check_wrong_key_request('emailed/1.json');
    expect(result.message).to.be.contains('401');
  });

  it('Check positive results - /viewed', async () => {
    const day = validDays[Math.floor(Math.random() * validDays.length)];
    const result = await apiHelper.viewed_popular_by_days(day);
    expect(result.statusCode).to.be.equals(200, 'Code error when requesting popular viewed articles');
    expect(result.body.num_results).to.be.a('number');
  });

  it('Check negative results - /viewed', async () => {
    const day = invalidDays[Math.floor(Math.random() * invalidDays.length)];
    const result = await apiHelper.viewed_popular_by_days(day);
    expect(result.message).to.be.equal('Response code 404 (Not Found)');
  });

  it('Check wrong key access - /viewed', async () => {
    const result = await apiHelper.check_wrong_key_request('viewed/1.json');
    expect(result.message).to.be.equal('Response code 401 (Unauthorized)');
  });

  it('Check positive results - /shared', async () => {
    const day = validDays[Math.floor(Math.random() * validDays.length)];
    const result = await apiHelper.shared_popular_by(day);
    expect(result.statusCode).to.be.equals(200, 'Code error when requesting popular shared articles');
    expect(result.body.num_results).to.be.a('number');
  });

  it('Check negative results - /shared', async () => {
    const day = invalidDays[Math.floor(Math.random() * invalidDays.length)];
    let result = await apiHelper.shared_popular_by(day);
    expect(result.message).to.be.equal('Response code 404 (Not Found)');
    // Check a simple negative scenario for share_type
    result = await apiHelper.shared_popular_by(7, 'yahoo');
    expect(result.message).to.be.equal('Response code 404 (Not Found)');
  });

  it('Check wrong key access - /shared', async () => {
    const result = await apiHelper.check_wrong_key_request('shared/1.json');
    expect(result.message).to.be.equal('Response code 401 (Unauthorized)');
  });
});
