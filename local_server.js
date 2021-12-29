// Setting up a local server to run Bot Locally
express = require('express')
const bodyParser = require('body-parser')
const mainModule = require('./main.js')

const app = express()
app.use(bodyParser.json())
const port = 8080

app.post("/*", (req, res) => {
    const requestDate = new Date()
    console.log(`[${requestDate.toISOString()}] request: ${req.method} ${req.url}`)
    mainModule.entryPoint(req, res)
})

app.listen(port, () => {
    console.log(`Local server running at address http://localhost:${port}`)
})