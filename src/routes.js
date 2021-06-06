const express = require("express");
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Pedro Hugo",
    avatar: "https://avatars.githubusercontent.com/u/47755506?v=4",
    "monthly-budget": 4000,
    "day-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year" :4
}

routes.get('/', (request, response) => response.render(views + 'index'))
routes.get('/job', (request, response) => response.render(views + 'job'))
routes.get('/job/edit', (request, response) => response.render(views + 'job-edit'))
routes.get('/profile', (request, response) => response.render(views + 'profile', {profile:profile}))

module.exports = routes;