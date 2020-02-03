import StockCachedApi from '../../src/services/stockCachedApi'
import {IStockApi, CompanyDescription} from '../../src/typings/stockApi.types'
import { mock, mockReset, MockProxy } from 'jest-mock-extended';

const API_KEY = 'DQJF4Q4LS99UCXC1';

describe('Cached stock API tests', () => {

  let stockApi: MockProxy<IStockApi>;
  const wixCompany: CompanyDescription =  {
    symbol: "WIX", 
    companyName: "Wix.com Ltd.",
    price: 100
  };
  const anotherCompany: CompanyDescription =  {
    symbol: "ANOTHER", 
    companyName: "Another.com Ltd.",
    price: 0
  };
    
  let stockCachedApi: IStockApi;
  const company = 'WIX';

  beforeEach(() => {
    stockApi = mock<IStockApi>();
    stockCachedApi = new StockCachedApi(stockApi, {max:0, maxAge:1000 * 30});
  });

  it('should return cached value when asked twice', async () => {
    stockApi.getFullCompanyDescription
      .mockResolvedValueOnce(wixCompany)
      .mockResolvedValueOnce(anotherCompany);

    let result = await stockCachedApi.getFullCompanyDescription(company);
    expect(result).toEqual(wixCompany);

    result = await stockCachedApi.getFullCompanyDescription(company);
    expect(result).toEqual(wixCompany);
  });

  it('should not save data in cache when error is thrown', async () => {
    stockApi.getFullCompanyDescription
      .mockResolvedValueOnce(wixCompany)
      .mockRejectedValueOnce(new Error)
      .mockResolvedValueOnce(anotherCompany);

    let result = await stockCachedApi.getFullCompanyDescription(company);
    expect(result).toEqual(wixCompany);

    await expect(stockCachedApi.getFullCompanyDescription('123')).rejects.toThrowError();

    result = await stockCachedApi.getFullCompanyDescription(company);
    expect(result).toEqual(wixCompany);
  });

  it('should get data from api when not found in cache', async () => {
    await stockCachedApi.getFullCompanyDescription(company);
    
    expect(stockApi.getFullCompanyDescription).toBeCalled();
  });






});



