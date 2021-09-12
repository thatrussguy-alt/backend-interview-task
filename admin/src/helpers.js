const {promisify} = require("util")
const stringify = require("csv-stringify")

const promisifiedStringify = promisify(stringify)

const convertToCSV = async (data) =>
  promisifiedStringify(data, {header: true})

const lookupCompanyNameByID = (companies, companyId) => {
  const company = companies.find(({id}) => id === companyId)
  if (!company) throw new Error(`Cannot find company with ID: ${companyId}`)
  return company.name
}

const mapInvestmentToHoldings = (
  {date, firstName, holdings, investmentTotal, lastName, userId},
  companies,
) =>
  holdings.map(({id: holdingId, investmentPercentage}) => ({
    User: userId,
    "First Name": firstName,
    "Last Name": lastName,
    Date: date,
    Holding: lookupCompanyNameByID(companies, holdingId),
    Value: investmentPercentage * investmentTotal,
  }))

module.exports = {convertToCSV, mapInvestmentToHoldings}
