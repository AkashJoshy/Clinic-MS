import cronJobs from "./register.ts";


export const startCronJobs = (): void => {
    cronJobs.map(job => job.start())
    console.log(`[CRON] ${cronJobs.length} job(s) started`)
}


export const stopCronJobs = (): void => {
    cronJobs.map(job => job.stop())
    console.log(`[CRON] All jobs stopped`)
}