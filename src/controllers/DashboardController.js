const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    index(request, response) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //total de horas por dia de cada job em progress
        let jobTotalHours = 0 
    
        const updatedJob = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <=0 ? "done" : "progress"

            statusCount[status] += 1;
            
            jobTotalHours = status == "progress" ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours
            
        
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        
        return response.render('index', {jobs: updatedJob, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}

