const express = require("express")
const config = require("config")
const {
  fetchInvestmentById,
  fetchCompanies,
  fetchInvestments,
  postHoldingsReport,
} = require("./api")
const {mapInvestmentToHoldings, convertToCSV} = require("./helpers")

const app = express()

app.use(express.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  try {
    const {id} = req.params
    const investment = await fetchInvestmentById(id)
    res.send(investment)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

app.post("/reports/holdings", async (_, res) => {
  try {
    const [companies, investments] = await Promise.all([
      fetchCompanies(),
      fetchInvestments(),
    ])
    const holdings = investments.flatMap((investment) =>
      mapInvestmentToHoldings(investment, companies),
    )
    const csvData = await convertToCSV(holdings)
    await postHoldingsReport(csvData)
    res.sendStatus(204)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
