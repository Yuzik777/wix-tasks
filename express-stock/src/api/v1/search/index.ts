import { Request, Response, NextFunction } from "express";
import { getCompaniesByPrefix as getCompanies } from "../../../services/companiesTrie";
export const getCompaniesByPrefix = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.query.company;
  res.json(getCompanies(name));
};
