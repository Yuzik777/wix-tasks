import { CompanyDescription, IStockApi } from "typings/stockApi.types";
import LRUCache from "lru-cache";

class StockCachedApi {
  private stockApi: IStockApi;
  private cache: LRUCache<string, CompanyDescription>;

  constructor(
    stockApi: IStockApi,
    options: LRUCache.Options<string, CompanyDescription> = {}
  ) {
    this.stockApi = stockApi;
    this.cache = new LRUCache(options);
  }

  async getFullCompanyDescription(
    company: string
  ): Promise<CompanyDescription> {
    let description = this.cache.get(company);
    if (!description) {
      description = await this.stockApi.getFullCompanyDescription(company);
      this.cache.set(company, description);
    }
    return description;
  }

  async getFullCompaniesDescriptions(
    companies: string[]
  ): Promise<(CompanyDescription | string)[]> {
    return Promise.all(
      companies.map(company =>
        this.getFullCompanyDescription(company)
          .then(value => {
            return value;
          })
          .catch(err => {
            return company + " " + err.message;
          })
      )
    );
  }
}

export default StockCachedApi;

// import {CompanyDescription, IStockApi} from 'typings/stockApi.types';
// import StockApi from './stockApi';
// import lru from 'lru-cache';
// import LRUCache from 'lru-cache';

// class StockCachedApi implements IStockApi{
//   private stockApi: StockApi;
//   private cache: LRUCache<string, CompanyDescription>;

//   constructor(apiKey: string, options?:LRUCache.Options<string, CompanyDescription>){
//     this.stockApi = new StockApi(apiKey);
//     this.cache = new lru(options || {});
//   }

//   async getFullCompanyDescription(company: string): Promise<CompanyDescription> {
//     let description = this.cache.get(company);
//     if(!description) {
//       description = await this.stockApi.getFullCompanyDescription(company);
//       this.cache.set(company, description);
//     }
//     return description;
//   }

// }

// export default StockCachedApi;
