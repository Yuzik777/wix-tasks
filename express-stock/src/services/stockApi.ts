import axios from 'axios';
import _ from 'lodash';
import {CompanyDescription, IStockApi} from 'typings/stockApi.types'


class StockApi implements IStockApi{
    private API_KEY: string;

    constructor(apiKey: string){
        this.API_KEY = apiKey;
    }

    async getCompanyDescription(company: string): Promise<CompanyDescription>{
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${this.API_KEY}`;
        
        const response = await axios.get(url, {responseType: 'json'});
        const data = response.data;
        if(data.bestMatches && data.bestMatches.length >= 0){
            const symbol = _.get(data, "bestMatches[0]['1. symbol']");
            const companyName = _.get(data, 'bestMatches[0]["2. name"]');
            if(symbol && companyName)
                return {symbol, companyName};
        }
        throw(new Error('Company not found'));
    }

    async getStockPriceBySymbol(symbol: string): Promise<number>{
        const url: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`;
        
        const response = await axios.get(url, {responseType: 'json'});
        const data = response.data;
        const price = _.get(data, '["Global Quote"]["05. price"]');
        if(price)
            return price;

        throw(new Error('Price not found'));
    }

    async getFullCompanyDescription(company: string): Promise<CompanyDescription>{
        let companyDescription: CompanyDescription;
        if(company && (typeof company === 'string')){
            companyDescription = await this.getCompanyDescription(company);
            companyDescription.price = await this.getStockPriceBySymbol(companyDescription.symbol);
            return companyDescription;
        }
        throw new Error("Wrong company name format");
    }

}

export default StockApi;