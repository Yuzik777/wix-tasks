/*
export const =  async (req: Request, res: Response, next: NextFunction) => {
  const companies: string[] = getCompaniesList(req.query.company);
  console.log(companies);
  try{
      const companyDescription = await stockApi.getFullCompaniesDescriptions(companies);
      res.json(companyDescription);
  } catch(err) {
      const status = STOCK_API_ERROR_CODES[err.message]||500;
      res.status(status).send(err.message);
  }
}*/