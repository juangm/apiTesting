import got from 'got';

export class APIHelper {
  private gotBitfinex = got.extend({
    prefixUrl: 'https://api.bitfinex.com/v2/',
    responseType: 'json',
  });

  public async statusPlatform() {
    try {
      return await this.gotBitfinex('platform/status');
    } catch (err) {
      console.log(`Problem when requesting platform status -> ${err}`);
      throw err;
    }
  }

  public async getSymbol(symbol: string) {
    try {
      return await this.gotBitfinex(`ticker/${symbol}`);
    } catch (err) {
      return err;
    }
  }

  public async marketAveragePrice(symbol: string, amount?: number, period?: number, rate_limit?: number) {
    try {
      return await this.gotBitfinex.post(`calc/trade/avg`, {
        json: {
          symbol: `${symbol}`,
          amount: `${amount}`,
          period: `${period}`,
          rate_limit: `${rate_limit}`,
        },
      });
    } catch (err) {
      console.log(err.message);
      debugger;
      return err.message;
    }
  }
}
