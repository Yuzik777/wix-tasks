import StockCachedApi from "./stockCachedApi";
import StockApi from "./stockApi";
import getStockApiKey from "./stockApiKeyGenerator";

const API_KEY = "OKC0BT76URCJ1QBU";
export const stockApi = new StockCachedApi(new StockApi(getStockApiKey), {
  maxAge: 1000 * 60 * 60
});
