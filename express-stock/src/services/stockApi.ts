import axios from 'axios';
import _ from 'lodash';
import {CompanyDescription, IStockApi, STOCK_API_ERROR_MESSAGES, CompanyStats} from '../typings/stockApi.types'


class StockApi implements IStockApi {
    getApiKey: () => string;

    constructor(getApiKey: () => string){
        this.getApiKey = getApiKey;
    }

    async getCompanyDescription(company: string): Promise<CompanyDescription>{
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${this.getApiKey()}`;

        const response = await axios.get(url, {responseType: 'json'});
        const data = response.data;
        if(data.bestMatches && data.bestMatches.length >= 0){
            const symbol = _.get(data, "bestMatches[0]['1. symbol']");
            const companyName = _.get(data, 'bestMatches[0]["2. name"]');
            if(symbol && companyName)
                return {symbol, companyName};
        }
        throw(new Error(STOCK_API_ERROR_MESSAGES.companyNotFound));
    }

    async getStockStatsBySymbol(symbol: string): Promise<CompanyStats>{
        const url: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.getApiKey()}`;

        const response = await axios.get(url, {responseType: 'json'});
        const data = response.data;
        const price = _.get(data, '["Global Quote"]["05. price"]');
        const change = _.get(data, '["Global Quote"]["09. change"]');
        const changePercent = _.get(data, '["Global Quote"]["10. change percent"]');

        if(price || change || changePercent)
        {
            return {
                price: parseFloat(price),
                change: parseFloat(change),
                changePercent: parseFloat(changePercent)
            };
        }

        throw(new Error(STOCK_API_ERROR_MESSAGES.priceNotFound));
    }

    async getFullCompanyDescription(company: string): Promise<CompanyDescription>{
        if(company && (typeof company === 'string')){
            const companyDescription = await this.getCompanyDescription(company);
            const companyStats = await this.getStockStatsBySymbol(companyDescription.symbol);
            Object.assign(companyDescription, companyStats);
            return companyDescription;
        }
        throw new Error(STOCK_API_ERROR_MESSAGES.invalidCompanyName);
    }

}

export default StockApi;