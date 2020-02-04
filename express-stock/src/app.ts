import express, {Request, Response, NextFunction} from 'express';
import StockCachedApi from './services/stockCachedApi'
import StockApi from './services/stockApi'
import {STOCK_API_ERROR_CODES} from './typings/stockApi.types'

const API_KEY = 'DQJF4Q4LS99UCXC1';
const app = express();
const stockApi = new StockCachedApi(new StockApi(API_KEY), {maxAge:1000 * 30});
//const stockApi = new StockApi(API_KEY, {maxAge:1000 * 30});

app.get('/api/v1/prices', async (req: Request, res: Response, next: NextFunction) => {
    const company: string = req.query.company;
    try{
        const companyDescription = await stockApi.getFullCompanyDescription(company);
        res.json(companyDescription);
    } catch(err) {
        const status = STOCK_API_ERROR_CODES[err.message]||500;
        res.status(status).send(err.message);
    }
});

export default app;
