import got from 'got';

export class MostPopularApiHelper {
  // TODO: Not hardcore the key (use env variables for that)
  private gotNyt = got.extend({
    prefixUrl: 'https://api.nytimes.com/svc/mostpopular/v2/',
    responseType: 'json',
    searchParams: 'api-key=aHnyGug14kfjX7zDd3AMbMGD7zpUKdGH',
  });

  private wrongKeyNyt = got.extend({
    prefixUrl: 'https://api.nytimes.com/svc/mostpopular/v2/',
    responseType: 'json',
    searchParams: 'api-key=asdflkj234fsafdsafd',
  });

  // TODO: Create interface for response
  // Set type of days to string to be able to check negative test scenarios
  public async email_popular_by_days(days: number | string): Promise<any> {
    try {
      return await this.gotNyt(`emailed/${days}.json`);
    } catch (err) {
      return err;
    }
  }

  public async viewed_popular_by_days(days: number | string): Promise<any> {
    try {
      return await this.gotNyt(`viewed/${days}.json`);
    } catch (err) {
      return err;
    }
  }

  public async shared_popular_by(days: number | string, type: string = null): Promise<any> {
    try {
      if (type) {
        return await this.gotNyt(`shared/${days}/${type}.json`);
      } else {
        return await this.gotNyt(`shared/${days}.json`);
      }
    } catch (err) {
      return err;
    }
  }

  public async check_wrong_key_request(path: string): Promise<any> {
    try {
      return await this.wrongKeyNyt(path);
    } catch (err) {
      return err;
    }
  }
}
