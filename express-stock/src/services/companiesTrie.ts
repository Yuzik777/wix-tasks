import { Trie } from "../services/trie";
import { data } from "../nasdaq";
//const data = require("../nasdaq.json");
import { CompanyDescription } from "../typings/stockApi.types";

const companies = data as CompanyDescription[];
const trie = new Trie<CompanyDescription>();

companies.forEach(company => {
  trie.addNode(company.symbol.toLowerCase(), company);
  trie.addNode(company.companyName.toLowerCase(), company);
});

export const getCompaniesByPrefix = (prefix: string): CompanyDescription[] => {
  const repetedCompanies = trie.getItemsWithPrefix(prefix.toLowerCase());

  return Array.from(new Set(repetedCompanies));
};
