import StockApi, { CompanyDescription } from '../../src/services/stockApi'
import nock from 'nock';

const API_KEY = 'DQJF4Q4LS99UCXC1';

describe("Stock API tests", () => {
  const stockApi = new StockApi(API_KEY);
  const company = 'WIX';
  it("should return company name and stock price when sent proper company name", async () => {

    const host = 'https://www.alphavantage.co';
    let path = `/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${API_KEY}`;

    nock(host)
      .get(path)
      .reply(200, {
        "bestMatches": [
          {
            "1. symbol": "WIX",
            "2. name": "Wix.com Ltd."
          }]
      });

    path = `/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${API_KEY}`;
    nock(host)
      .get(path)
      .reply(200, {
        "Global Quote": {
          "05. price": "145.0600"
      }
      });
    
    
    const result = await stockApi.getFullCompanyDescription(company);
    
    console.log(result);
  })


});

