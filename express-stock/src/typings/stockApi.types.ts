export type CompanyDescription = {
  symbol: string,
  companyName: string,
  price?: number,
  change?: number,
  changePercent?: number
};

export type CompanyStats = {
  price: number,
  change: number,
  changePercent: number
}

export interface IStockApi {
  getFullCompanyDescription(company: string): Promise<CompanyDescription>;
};


export const STOCK_API_ERROR_MESSAGES = {
  companyNotFound: 'Company not found',
  priceNotFound: 'Price not found',
  invalidCompanyName: 'Wrong company name format'
}

export const STOCK_API_ERROR_CODES = {
  [STOCK_API_ERROR_MESSAGES.companyNotFound]: 404,
  [STOCK_API_ERROR_MESSAGES.priceNotFound]: 404,
  [STOCK_API_ERROR_MESSAGES.invalidCompanyName]: 422
}


