import StockApi from '../../src/services/stockApi'
import {STOCK_API_ERROR_MESSAGES} from '../../src/typings/stockApi.types'
import nock from 'nock';

const API_KEY = 'DQJF4Q4LS99UCXC1';

describe("Stock API tests", () => {
  const stockApi = new StockApi(API_KEY);
  const company = 'WIX';

  const host = 'https://www.alphavantage.co';
  

  it("should return company name and stock price when sent proper company symbol", async () => {
    
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
    
    expect(result.companyName).toEqual("Wix.com Ltd.");
    expect(result.price).toEqual("145.0600");
  });


  it("should return company name and symbol when company was found", async () => {

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
    
    const result = await stockApi.getCompanyDescription(company);
    expect(result.companyName).toEqual("Wix.com Ltd.");
    expect(result.symbol).toEqual("WIX");
  });

  it("should throw error when company was not found", async () => {

    let path = `/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${API_KEY}`;
    nock(host)
      .get(path)
      .reply(200, {
        "bestMatches": []
      });
    
    try {
      await stockApi.getCompanyDescription(company);
    } catch(err) {
      expect(err.message).toBe(STOCK_API_ERROR_MESSAGES.companyNotFound);
    }
  });

  it("should return company's stock price", async () => {

    let path = `/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${API_KEY}`;
    nock(host)
      .get(path)
      .reply(200, {
        "Global Quote": {
          "05. price": "145.0600"
      }
      });
    
    const result = await stockApi.getStockPriceBySymbol('WIX');
    expect(result).toBe("145.0600");
  });


  it("should throw error when price was not in the response", async () => {

    let path = `/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${API_KEY}`;
    nock(host)
      .get(path)
      .reply(200, {
        "Global Quote": {
          "05. noprice": "145.0600"
      }
      });
    
    try {
      await stockApi.getStockPriceBySymbol(company);
    } catch(err) {
      expect(err.message).toBe(STOCK_API_ERROR_MESSAGES.priceNotFound);
    }
  });

});

