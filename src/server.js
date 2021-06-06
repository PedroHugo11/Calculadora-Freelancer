const express = require("express") // biblioteca criar o serivdor
const server = express()
const routes = require("./routes")

//template engine
server.set('view engine', 'ejs')

server.use(express.static("public"))

server.use(routes)
server.listen(3000, () => console.log("running"))