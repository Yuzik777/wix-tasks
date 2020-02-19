import { stockApi } from "../../../services/stockApiInstance";
import { Request, Response, NextFunction } from "express";
import { STOCK_API_ERROR_CODES } from "../../../typings/stockApi.types";

function getCompaniesList(companies: string): string[] {
  if (!companies) return [];
  return companies
    .split(",")
    .map(company => company.trim())
    .filter(company => !!company);
}

export const getFullCompaniesDescriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companies: string[] = getCompaniesList(req.query.company);
  console.log(companies);
  try {
    const companyDescription = await stockApi.getFullCompaniesDescriptions(
      companies
    );
    res.json(companyDescription);
  } catch (err) {
    const status = STOCK_API_ERROR_CODES[err.message] || 500;
    res.status(status).send(err.message);
  }
};
