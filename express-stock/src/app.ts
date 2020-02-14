import express from 'express';
import path from 'path';
import {getFullCompaniesDescriptions} from './api/v1/prices'

const app = express();

app.use(express.static(path.join(__dirname, '../static')));

app.get('/api/v1/prices', getFullCompaniesDescriptions);

export default app;
