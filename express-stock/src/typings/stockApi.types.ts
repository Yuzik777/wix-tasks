export type CompanyDescription = {
  symbol: string,
  companyName: string,
  price?: number
};

export interface IStockApi {
  getFullCompanyDescription(company: string): Promise<CompanyDescription>;
};
