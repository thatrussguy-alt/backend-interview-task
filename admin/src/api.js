const axios = require("axios")
const config = require("config")

const financialCompaniesServiceAPI = axios.create({
  baseURL: `${config.financialCompaniesServiceUrl}/companies`,
})
const investmentsServiceAPI = axios.create({
  baseURL: `${config.investmentsServiceUrl}/investments`,
})

const fetchCompanies = async () => {
  const {data: companies} = await financialCompaniesServiceAPI.get()
  return companies
}

const fetchInvestmentById = async (id) => {
  const {data: investment} = await investmentsServiceAPI.get(`/${id}`)
  return investment
}

const fetchInvestments = async () => {
  const {data: investments} = await investmentsServiceAPI.get()
  return investments
}

const postHoldingsReport = async (csvData) =>
  investmentsServiceAPI.post("/export", {export: csvData})

module.exports = {
  fetchCompanies,
  fetchInvestmentById,
  fetchInvestments,
  postHoldingsReport,
}
