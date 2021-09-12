const axios = require("axios")
const config = require("config")

const investmentsServiceAPI = axios.create({
  baseURL: `${config.investmentsServiceUrl}/investments`,
})

const fetchInvestmentById = async (id) => {
  const {data: investment} = await investmentsServiceAPI.get(`/${id}`)
  return investment
}

module.exports = {fetchInvestmentById}
