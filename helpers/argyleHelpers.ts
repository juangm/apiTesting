import got from 'got';

export class ArgyleApiHelper {
  // TODO: Not hardcore the key (use env variables for that)
  private gotArgyle = got.extend({
    prefixUrl: 'https://api-sandbox.argyle.io/v1',
    responseType: 'json',
    username: 'e3223f1fd5a74b6b986c41d71a6e7351',
    password: '95d1a7b370cf32a4d17466bbbd4d32855498be335f4304a6d4b3c577947ba1f5',
  });

  private wrongCredArgyle = got.extend({
    prefixUrl: 'https://api-sandbox.argyle.io/v1',
    responseType: 'json',
    username: 'e3223f1fd5a74b6b986c41d71a6e7351',
    password: 'dfsdfasdfadfadfadf5',
  });

  // TODO: Create interface for response
  public async get_users(): Promise<any> {
    try {
      return await this.gotArgyle('users');
    } catch (err) {
      return err;
    }
  }

  public async wrong_auth(): Promise<any> {
    try {
      return await this.wrongCredArgyle('users');
    } catch (err) {
      return err;
    }
  }
}
