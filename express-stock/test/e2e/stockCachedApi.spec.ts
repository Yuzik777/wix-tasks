import StockCachedApi from '../../src/services/stockCachedApi'
import StockApi from '../../src/services/stockApi'
import nock from 'nock';

const API_KEY = 'DQJF4Q4LS99UCXC1';

describe('Cached stock API tests', () => {

  const stockApi = new StockApi(API_KEY);
  const stockCachedApi = new StockCachedApi(stockApi, {maxAge:1000 * 30});
  const company = 'WIX';

  it(' ')


});



