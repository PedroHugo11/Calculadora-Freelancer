const express = require("express") // biblioteca criar o serivdor
const server = express()
const routes = require("./routes")
const path = require("path")

//template engine
server.set('view engine', 'ejs')

//mudar a localização da pasta view
server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public"))

//usar o request.body liberando pois é obrigatório essa linha de código
server.use(express.urlencoded({extend:true}))

server.use(routes)
server.listen(3000, () => console.log("running"))