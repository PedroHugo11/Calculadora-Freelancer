const Profile = require("../model/Profile")

module.exports = {
    index(request, response) {
        return response.render('profile', {profile: Profile.get()})
    },

    update(request, response) {
        // para pegar dados
        const data = request.body

        const weeksPerYear = 52

        //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"])/12
        //total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        // qual será o valor da minha hora ?
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...request.body,
            "value-hour" : valueHour
        }) 

        return response.redirect("/profile")
    }
}