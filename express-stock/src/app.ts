import express, {Request, Response, NextFunction} from 'express';
import StockCachedApi from './services/stockCachedApi';
import StockApi from './services/stockApi';
import {STOCK_API_ERROR_CODES} from './typings/stockApi.types';
import getStockApiKey from './services/stockApiKeyGenerator';
import path from 'path';

const API_KEY = 'OKC0BT76URCJ1QBU';
const app = express();
const stockApi = new StockCachedApi(new StockApi( () => API_KEY), {maxAge:1000 * 60 * 60});
//const stockApi = new StockApi(API_KEY, {maxAge:1000 * 30});

function getCompaniesList(companies: string): string[]{
    if(!companies) return [];
    return companies.split(',')
        .map( ( company ) => company.trim())
        .filter( (company) => !!company);
}

app.use(express.static(path.join(__dirname, '../src/statics')));

app.get('/api/v1/prices', async (req: Request, res: Response, next: NextFunction) => {
    const companies: string[] = getCompaniesList(req.query.company);
    console.log(companies);
    try{
        const companyDescription = await stockApi.getFullCompaniesDescriptions(companies);
        res.json(companyDescription);
    } catch(err) {
        const status = STOCK_API_ERROR_CODES[err.message]||500;
        res.status(status).send(err.message);
    }
});


export default app;
