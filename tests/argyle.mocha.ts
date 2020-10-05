import { describe, it } from 'mocha';
import { ArgyleApiHelper } from '../helpers/argyleHelpers';
import { expect } from 'chai';

describe('Health Check API Argyle', () => {
  const apiHelper = new ArgyleApiHelper();

  it('Simple TC for users endpoint', async () => {
    const result = await apiHelper.get_users();
    expect(result.body.count).to.be.equals(1, 'Number of user in the platform is 0 or more than 1');
    expect(result.body.results[0].data_providers_connected.length).to.be.equals(
      3,
      'Number providers connected is different than 3',
    );
  });
});
