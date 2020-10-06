import got from 'got';

export class ArgyleApiHelper {
  // TODO: Not hardcore the key (use env variables for that)
  private gotArgyle = got.extend({
    prefixUrl: 'https://api-sandbox.argyle.io/v1',
    responseType: 'json',
    username: process.env.ARGYLE_USERNAME,
    password: process.env.ARGYLE_SECRET,
  });

  private wrongCredArgyle = got.extend({
    prefixUrl: 'https://api-sandbox.argyle.io/v1',
    responseType: 'json',
    username: process.env.ARGYLE_USERNAME,
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
