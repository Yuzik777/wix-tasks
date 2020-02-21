import express from "express";
import path from "path";
import { getFullCompaniesDescriptions } from "./api/v1/prices";
import { getCompaniesByPrefix } from "./api/v1/search";

const app = express();

app.use(express.static(path.join(__dirname, "../static")));

app.get("/api/v1/prices", getFullCompaniesDescriptions);

app.get("/api/v1/search", getCompaniesByPrefix);

export default app;

/*
const shit = fs.readFileSync(
  path.join(__dirname, "./nasdaq.keyvalues"),
  "utf8"
);
const json = shit.split("\n").map(str => {
  const [name, symbol] = str.split("->");
  return { symbol, companyName: name };
});

fs.writeFileSync(path.join(__dirname, "./nasdaq.json"), JSON.stringify(json));
*/
