const express = require("express")
const config = require("config")
const {fetchInvestmentById} = require("./api")

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

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
